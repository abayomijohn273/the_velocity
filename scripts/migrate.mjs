import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const { Client } = pg;

const connectionString = process.env.SUPABASE_DB_URL;
if (!connectionString) {
  console.error(
    'Missing SUPABASE_DB_URL. Add your Supabase Postgres connection string to .env\n' +
      'Find it in Supabase → Project Settings → Database → Connection string (URI).'
  );
  process.exit(1);
}

const migrationsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'supabase', 'migrations');

const run = async () => {
  const files = (await readdir(migrationsDir)).filter((file) => file.endsWith('.sql')).sort();

  if (files.length === 0) {
    console.log('No migration files found.');
    return;
  }

  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();

  try {
    for (const file of files) {
      const sql = await readFile(join(migrationsDir, file), 'utf8');
      process.stdout.write(`Applying ${file}... `);
      await client.query(sql);
      console.log('done');
    }
    console.log('\nAll migrations applied successfully.');
  } finally {
    await client.end();
  }
};

run().catch((error) => {
  console.error('\nMigration failed:', error.message);
  process.exit(1);
});
