create table if not exists notifications (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 type text not null,
 title text not null,
 body text not null,
 data jsonb default '{}'::jsonb,
 read_at timestamptz,
 created_at timestamptz not null default now()
);
create index if not exists notifications_user_created_idx on notifications(user_id,created_at desc);
alter table notifications enable row level security;
create policy if not exists "users read own notifications" on notifications for select using(auth.uid()=user_id);
create policy if not exists "users update own notifications" on notifications for update using(auth.uid()=user_id) with check(auth.uid()=user_id);
-- Inserts should be performed by trusted backend functions/server logic.
