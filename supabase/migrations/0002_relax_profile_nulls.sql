-- ─────────────────────────────────────────────────────────────
-- Relax NOT NULL on profile columns so partially-complete member
-- records (imported from CSV) can be stored. The app still requires
-- all fields at profile-completion time via zod validation.
-- ─────────────────────────────────────────────────────────────
alter table profiles
  alter column first_name drop not null,
  alter column last_name drop not null,
  alter column phone_number drop not null,
  alter column whatsapp_number drop not null,
  alter column linkedin_url drop not null,
  alter column "current_role" drop not null,
  alter column country_of_residence drop not null,
  alter column industry drop not null,
  alter column dob drop not null;
