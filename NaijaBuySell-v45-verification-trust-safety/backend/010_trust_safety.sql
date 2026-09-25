-- V45 Trust & Safety foundation
alter table if exists reports add column if not exists status text not null default 'open';
alter table if exists reports add column if not exists reviewed_at timestamptz;
alter table if exists reports add column if not exists reviewed_by uuid references auth.users(id) on delete set null;
alter table if exists reports add column if not exists resolution_note text;
create index if not exists reports_status_created_idx on reports(status,created_at desc);
-- Keep report details private. Reporter access and admin review should be
-- enforced with RLS policies matching the production role model.
-- Seller verification must remain evidence-based; do not expose identity
-- documents publicly or label a seller verified without an actual review.
