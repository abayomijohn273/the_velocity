import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const { Client } = pg;
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// ── CSV parser (handles quoted fields + embedded commas) ─────────
const parseCsv = (text) => {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else field += c;
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
};

// ── Value helpers ────────────────────────────────────────────────
const clean = (s) =>
  (s ?? '')
    .replace(/^[\s,]+/, '')
    .replace(/[\s,]+$/, '')
    .trim();
const orNull = (s) => clean(s) || null;
const titleCase = (s) =>
  clean(s)
    .toLowerCase()
    .replace(/\b\p{L}/gu, (ch) => ch.toUpperCase()) || null;

const parseDob = (s) => {
  const m = clean(s).match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!m) return null;
  const [, y, mo, d] = m;
  if (+mo < 1 || +mo > 12 || +d < 1 || +d > 31) return null;
  return `${y}-${mo.padStart(2, '0')}-${d.padStart(2, '0')}`;
};

// ── current_role normalization (clear matches → app slug) ─────────
const roleMap = {
  'founder, ceo or entrepreneur': 'founder_ceo_entrepreneur',
  founder: 'founder_ceo_entrepreneur',
  'intrapreneur- leading in a company': 'intrapreneur',
  'intrapreneur - leading in a company': 'intrapreneur',
  'working professional': 'working_professional',
  'i run a non-profit': 'non_profit',
  'i am freelancer': 'freelancer',
  'i am a freelancer': 'freelancer',
  'civil servants': 'civil_servant',
  'civil servant': 'civil_servant',
  other: 'others',
  others: 'others',
};

// ── industry normalization (clear matches → app slug) ─────────────
const industryMap = {
  tech: 'technology_software',
  'information technology (it) & software': 'technology_software',
  'cloud computing & saas': 'technology_software',
  cybersecurity: 'technology_software',
  'data analytics & data science': 'technology_software',
  'artificial intelligence & machine learning': 'technology_software',
  'digital identity & privacy tech': 'technology_software',
  fintech: 'finance_banking',
  'fintech (financial technology)': 'finance_banking',
  'financial services (banking, insurance, investments)': 'finance_banking',
  'venture capital & private equity': 'finance_banking',
  'insurtech (insurance technology)': 'finance_banking',
  'regtech (regulatory technology)': 'finance_banking',
  'professional services (consulting, legal, accounting)': 'legal_professional_services',
  legaltech: 'legal_professional_services',
  'executive search & leadership consulting': 'legal_professional_services',
  'corporate governance & compliance': 'legal_professional_services',
  creative: 'arts_design_creative',
  'arts & culture': 'arts_design_creative',
  edtech: 'education_training',
  'education & training': 'education_training',
  'e-learning & edtech': 'education_training',
  'digital marketing & advertising': 'marketing_advertising',
  'real estate': 'real_estate_construction',
  'proptech (property technology)': 'real_estate_construction',
  'construction & infrastructure': 'real_estate_construction',
  'media & entertainment': 'media_entertainment',
  'broadcasting (tv, radio)': 'media_entertainment',
  'publishing (books, magazines, digital media)': 'media_entertainment',
  'esports & gaming': 'media_entertainment',
  health: 'healthcare_pharma',
  healthtech: 'healthcare_pharma',
  'healthcare & medical services': 'healthcare_pharma',
  'pharmaceuticals & biotechnology': 'healthcare_pharma',
  'transportation & logistics': 'transportation_logistics',
  'mobility & smart transportation': 'transportation_logistics',
  'retail & e-commerce': 'retail_ecommerce',
  'wholesale & distribution': 'retail_ecommerce',
  'non-profit & ngos': 'non_profit_social_impact',
  'cleantech & renewable energy': 'energy_utilities',
  'oil & gas extraction': 'energy_utilities',
  'oil &gas': 'energy_utilities',
  'utilities (water, electricity, gas supply)': 'energy_utilities',
  'food & beverage processing': 'manufacturing_industrial',
  'secondary sector (manufacturing & production)': 'manufacturing_industrial',
  'textile & apparel manufacturing': 'manufacturing_industrial',
  'chemical manufacturing': 'manufacturing_industrial',
  'energy equipment manufacturing': 'manufacturing_industrial',
  'footwear industry': 'manufacturing_industrial',
  'agriculture & farming': 'agriculture_agribusiness',
  agritech: 'agriculture_agribusiness',
  'fishing & aquaculture': 'agriculture_agribusiness',
  'primary sector (extraction & agriculture)': 'agriculture_agribusiness',
  'public administration & government': 'government_public_sector',
  'defense & security services': 'government_public_sector',
  'travel & tourism': 'hospitality_tourism',
};

const mapValue = (table, raw) => {
  const v = clean(raw);
  if (!v) return null;
  return table[v.toLowerCase()] ?? v; // unknown → keep raw
};

const run = async () => {
  const connectionString = process.env.SUPABASE_DB_URL;
  if (!connectionString) {
    console.error('Missing SUPABASE_DB_URL in .env');
    process.exit(1);
  }

  // Country name → ISO code map (reverse of the locale labels the app uses).
  const labels = JSON.parse(
    await readFile(join(root, 'node_modules/react-phone-number-input/locale/en.json'), 'utf8')
  );
  const countryByName = new Map(
    Object.entries(labels)
      .filter(([code, name]) => /^[A-Z]{2}$/.test(code) && typeof name === 'string')
      .map(([code, name]) => [name.toLowerCase(), code])
  );
  const mapCountry = (raw) => {
    const v = clean(raw);
    if (!v) return null;
    return countryByName.get(v.toLowerCase()) ?? v; // unknown → keep raw
  };

  const text = await readFile(join(root, 'supabase/migrations/users.csv'), 'utf8');
  const rows = parseCsv(text)
    .slice(1)
    .filter((r) => r.some((c) => c.trim() !== ''));

  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();

  let inserted = 0;
  let skippedExisting = 0;
  let skippedNoEmail = 0;
  let failed = 0;

  try {
    for (const r of rows) {
      const email = clean(r[2]).toLowerCase();
      if (!email) {
        skippedNoEmail++;
        continue;
      }
      try {
        const userRes = await client.query(
          `insert into users (email, password_hash, role, is_email_verified, is_registration_complete)
           values ($1, null, 'user', false, false)
           on conflict (email) do nothing
           returning id`,
          [email]
        );
        if (userRes.rows.length === 0) {
          skippedExisting++;
          continue;
        }
        const userId = userRes.rows[0].id;
        await client.query(
          `insert into profiles (user_id, first_name, last_name, phone_number, whatsapp_number,
             linkedin_url, "current_role", country_of_residence, industry, dob, referred_by)
           values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
          [
            userId,
            titleCase(r[0]),
            titleCase(r[1]),
            orNull(r[3]),
            orNull(r[4]),
            orNull(r[5]),
            mapValue(roleMap, r[6]),
            mapCountry(r[7]),
            mapValue(industryMap, r[8]),
            parseDob(r[9]),
            null, // Referrer Name omitted
          ]
        );
        inserted++;
      } catch (error) {
        failed++;
        console.error(`Row failed (${email}): ${error.message}`);
      }
    }
  } finally {
    await client.end();
  }

  console.log('\n── Import summary ──────────────────────────');
  console.log('Inserted:        ', inserted);
  console.log('Skipped (exists):', skippedExisting);
  console.log('Skipped (no email):', skippedNoEmail);
  console.log('Failed:          ', failed);
};

run().catch((error) => {
  console.error('Import failed:', error.message);
  process.exit(1);
});
