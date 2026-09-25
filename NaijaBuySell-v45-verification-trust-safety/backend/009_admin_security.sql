-- V44 admin security foundation
-- Keep admin role membership private and server-enforced.
alter table if exists admin_roles enable row level security;
-- Recommended production policy: only a server-side security function should
-- expose whether auth.uid() is an administrator. Do not allow ordinary users
-- to insert/update admin_roles.
--
-- Financial actions (release/refund) should be exposed only through trusted
-- server endpoints/functions with role + permission checks and audit logging.
--
-- Recommended audit table:
create table if not exists admin_audit_log (
 id uuid primary key default gen_random_uuid(),
 actor_id uuid references auth.users(id) on delete set null,
 action text not null,
 entity_type text,
 entity_id uuid,
 old_status text,
 new_status text,
 amount numeric(14,2),
 provider_reference text,
 note text,
 created_at timestamptz not null default now()
);
create index if not exists admin_audit_actor_created_idx on admin_audit_log(actor_id,created_at desc);
create index if not exists admin_audit_entity_idx on admin_audit_log(entity_type,entity_id);
alter table admin_audit_log enable row level security;
-- Add restrictive policies for authorized admin roles in the production migration.
