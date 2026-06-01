-- ─────────────────────────────────────────────────────────────
-- Add avatar to profiles + a member directory view for the dashboard.
-- ─────────────────────────────────────────────────────────────
alter table profiles add column if not exists avatar text;

create or replace view member_directory as
select
  u.id as user_id,
  u.email,
  p.first_name,
  p.last_name,
  p.avatar,
  p."current_role",
  p.industry,
  p.country_of_residence,
  p.linkedin_url,
  p.created_at
from users u
join profiles p on p.user_id = u.id;

-- Refresh PostgREST's schema cache so the new column/view are queryable.
notify pgrst, 'reload schema';
