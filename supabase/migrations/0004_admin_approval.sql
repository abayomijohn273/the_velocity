-- ─────────────────────────────────────────────────────────────
-- Admin approval workflow (pending/approved/rejected) + monetized
-- (verified) flag gating visibility of other members' contact info.
-- ─────────────────────────────────────────────────────────────
do $$ begin
  create type account_status as enum ('pending', 'approved', 'rejected');
exception when duplicate_object then null; end $$;

alter table users
  add column if not exists account_status account_status not null default 'pending',
  add column if not exists is_monetized boolean not null default false;

-- One-time grandfathering: everyone who signed up before this migration
-- shipped is approved automatically. Cutoff is a hardcoded literal timestamp
-- (not now()/current_timestamp, and not "where account_status = 'pending'"
-- alone) so this statement stays safe if migrate.mjs is ever re-run later —
-- a live now() would keep moving the goalposts forward on every re-run and
-- silently re-approve real pending signups made between runs.
update users set account_status = 'approved'
where created_at < '2026-07-21T15:06:10Z' and account_status = 'pending';

create index if not exists users_account_status_idx on users (account_status);

-- NOTE: promoting a specific account to role = 'admin' is a manual, one-off
-- step done directly in the Supabase dashboard (Table Editor or SQL Editor)
-- after this migration runs — intentionally not hardcoded into a migration
-- file, since a migration file is committed to source control.

-- Admin-facing user listing (mirrors member_directory's precedent from
-- 0003), includes every user regardless of profile/registration completeness.
create or replace view admin_user_directory as
select
  u.id,
  u.email,
  u.role,
  u.account_status,
  u.is_monetized,
  u.is_email_verified,
  u.is_registration_complete,
  u.created_at,
  p.first_name,
  p.last_name
from users u
left join profiles p on p.user_id = u.id;

notify pgrst, 'reload schema';
