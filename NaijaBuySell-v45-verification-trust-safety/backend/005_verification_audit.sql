-- V39: verification audit foundation
alter table if exists seller_profiles
  add column if not exists verification_note text,
  add column if not exists verification_reviewed_at timestamptz,
  add column if not exists verification_reviewed_by uuid references auth.users(id);

alter table if exists listings
  add column if not exists property_verification_status text default 'not_reviewed',
  add column if not exists property_verification_note text,
  add column if not exists property_reviewed_at timestamptz,
  add column if not exists property_reviewed_by uuid references auth.users(id);

create table if not exists verification_audit (
 id uuid primary key default gen_random_uuid(),
 seller_id uuid references auth.users(id),
 listing_id uuid references listings(id),
 actor_id uuid not null references auth.users(id),
 entity_type text not null check(entity_type in ('seller','property')),
 old_status text,
 new_status text not null,
 note text,
 created_at timestamptz not null default now()
);
alter table verification_audit enable row level security;
create policy if not exists "admins manage verification audit" on verification_audit
 for all using (is_admin()) with check (is_admin());
