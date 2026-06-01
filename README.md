# The Velocity

Marketing site for **The Velocity** — an exclusive global community where rising stars collaborate and move together to achieve big things.

Built with [Next.js 15](https://nextjs.org) (App Router), React 19, TypeScript, and [Tailwind CSS v4](https://tailwindcss.com).

## Getting Started

Install dependencies, configure environment variables, and run the dev server:

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Database setup

The app uses **Supabase Postgres** as its database (custom auth, not Supabase Auth).
Apply the schema once — either run `supabase/migrations/0001_init_auth.sql` in the Supabase
SQL editor, or use the bundled runner:

```bash
# Requires SUPABASE_DB_URL in .env (Settings → Database → Connection string)
npm run db:migrate
```

This creates the `users`, `profiles`, and `otp_codes` tables plus the
`user_role` (`user` | `admin`, default `user`) and `otp_purpose` enums.

> **Key note:** `SUPABASE_SERVICE_ROLE_KEY` must be the **secret** key
> (`sb_secret_…` / `service_role`), not the publishable/anon key — the server
> uses it to bypass RLS.

### Available Scripts

| Script                 | Description                        |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Start the dev server (Turbopack).  |
| `npm run build`        | Production build.                  |
| `npm run start`        | Serve the production build.        |
| `npm run lint`         | Run ESLint.                        |
| `npm run format`       | Format the codebase with Prettier. |
| `npm run format:check` | Check formatting without writing.  |

## Project Structure

```
src/
├── app/                # App Router routes — thin pages that render a module
│   ├── layout.tsx
│   ├── page.tsx        # → modules/home
│   └── join-us/
├── modules/            # Feature code
│   ├── home/
│   │   ├── index.tsx
│   │   └── components/ # Page sections (aboutSection, pricingSection, ...)
│   └── joinUs/
│   ├── auth/           # signup, login, verifyOtp, completeSignup, existingMember, forgot/reset
│   ├── profile/        # completeProfile
│   └── dashboard/      # placeholder dashboard + welcomeModal
├── components/         # Shared, cross-feature components
│   ├── ui/             # Primitives: input, inputPassword, inputPhone, select, otpInput, formButton, button
│   └── layouts/        # header, footer
├── hooks/              # React Query hooks (auth, profile)
├── lib/                # Server + shared logic
│   ├── api/            # response/handler helpers, client, rate limiting
│   ├── auth/           # jwt, password, otp, cookies, session
│   ├── db/             # Supabase data-access (users, profiles, otpCodes)
│   ├── email/          # nodemailer transporter + templates
│   ├── validation/     # zod schemas
│   ├── constants/      # roles, industries, countries, routes
│   └── config/         # env
├── types/              # shared TypeScript types
├── middleware.ts       # CORS, rate limiting, security headers, route guards
└── styles/             # globals.css, theme.css (design tokens), font.ts
```

Layering flow: **route page → module `index.tsx` → section `components/<name>/index.tsx` → split sub-components**.

## Authentication

Token-based auth (custom JWT) with a **7-day httpOnly cookie**; expired sessions are
logged out automatically (middleware redirects pages, `apiFetch` redirects on `401`).

Flows:

- **New signup:** sign up (email + password) → 6-digit OTP email → success → login → if
  `isRegistrationComplete` is false → complete profile → dashboard (welcome modal).
- **Existing member:** _Activate your account_ → enter email → OTP → set password → login.
- **Forgot password:** enter email → OTP → reset password → login.

Stack: **react-hook-form** + **zod** (forms/validation), **@tanstack/react-query**
(queries/mutations), **react-hot-toast** (feedback), **@headlessui/react** (modals + Listbox
selects), **@phosphor-icons/react** (icons), **nodemailer** + Google SMTP (OTP / welcome /
admin-notification emails).

### Environment variables

See [`.env.example`](.env.example). Required: Supabase (`NEXT_PUBLIC_SUPABASE_URL`,
`SUPABASE_SERVICE_ROLE_KEY`), `JWT_SECRET`, Google SMTP (`SMTP_*`, `EMAIL_FROM_*`), and
`ADMIN_EMAIL`.

## Conventions

This project enforces consistent conventions via Cursor rules in [`.cursor/rules/`](.cursor/rules/). Read them before contributing:

- **`project-conventions.mdc`** — architecture, folder structure, `camelCase` file naming, `@/` imports, tooling.
- **`component-design.mdc`** — functional components, DRY/composition, TypeScript typing, accessibility, anti-patterns to avoid.
- **`styling-responsive.mdc`** — Tailwind design tokens, section/layout patterns, mobile-first responsiveness.
- **`data-and-forms.mdc`** — API routes, data access, auth, React Query hooks, and form patterns.

Highlights:

- **Naming:** folders and non-component files use `camelCase`; exported components are `PascalCase`; section entry files are `index.tsx`.
- **Components:** small, composable, accessible, fully typed. Reuse shared primitives (e.g. `@/components/ui/button`); render lists from data arrays.
- **Styling:** Tailwind utilities with semantic theme tokens (`primary`, `secondary`), mobile-first across `sm`/`md`/`lg`/`xl` breakpoints.
- **Quality:** Prettier (single quotes, 2-space indent, 100 print width) and ESLint run automatically on commit via Husky + lint-staged.

## Design Tokens

Defined in `src/styles/theme.css`:

| Token       | Value     |
| ----------- | --------- |
| `primary`   | `#012c18` |
| `secondary` | `#7b9404` |
| `black`     | `#1d1e22` |
| `white`     | `#ffffff` |

Fonts: **Inter** (default sans) and **Silka**, loaded via `next/font` and exposed as CSS variables.

## Deployment

Deploy on [Vercel](https://vercel.com/new). See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.
