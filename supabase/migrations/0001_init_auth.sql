-- ─────────────────────────────────────────────────────────────
-- The Velocity — initial auth & profile schema
-- ─────────────────────────────────────────────────────────────
-- Run against your Supabase Postgres database (SQL editor or CLI).
-- The app talks to these tables server-side using the service role key.

create extension if not exists "pgcrypto";

-- Enums ────────────────────────────────────────────────────────
do $$ begin
  create type user_role as enum ('user', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type otp_purpose as enum ('email_verification', 'member_activation', 'password_reset');
exception when duplicate_object then null; end $$;

-- updated_at helper ────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Users ────────────────────────────────────────────────────────
create table if not exists users (
  id                       uuid primary key default gen_random_uuid(),
  email                    text not null unique,
  password_hash            text,
  role                     user_role not null default 'user',
  is_email_verified        boolean not null default false,
  is_registration_complete boolean not null default false,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create index if not exists users_email_idx on users (lower(email));

drop trigger if exists users_set_updated_at on users;
create trigger users_set_updated_at
  before update on users
  for each row execute function set_updated_at();

-- Profiles (1:1 with users) ────────────────────────────────────
create table if not exists profiles (
  user_id              uuid primary key references users (id) on delete cascade,
  first_name           text not null,
  last_name            text not null,
  phone_number         text not null,
  whatsapp_number      text not null,
  linkedin_url         text not null,
  "current_role"       text not null,
  country_of_residence text not null,
  industry             text not null,
  dob                  date not null,
  referred_by          text,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

drop trigger if exists profiles_set_updated_at on profiles;
create trigger profiles_set_updated_at
  before update on profiles
  for each row execute function set_updated_at();

-- One-time passcodes ───────────────────────────────────────────
create table if not exists otp_codes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references users (id) on delete cascade,
  code_hash   text not null,
  purpose     otp_purpose not null,
  expires_at  timestamptz not null,
  consumed_at timestamptz,
  attempts    int not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists otp_codes_user_purpose_idx
  on otp_codes (user_id, purpose);
