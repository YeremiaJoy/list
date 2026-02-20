-- ============================================================
-- Supabase SQL Schema — Shared Guest List
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

create table if not exists public.guest_list (
  id           uuid                     primary key default gen_random_uuid(),
  created_at   timestamp with time zone not null    default now(),
  task_name    text                     not null,
  is_completed boolean                  not null    default false,
  author_name  text                     not null
);

-- Optional: enable Row Level Security (open read/write for all anon users)
alter table public.guest_list enable row level security;

create policy "Allow public read"
  on public.guest_list for select
  using (true);

create policy "Allow public insert"
  on public.guest_list for insert
  with check (true);

create policy "Allow public update"
  on public.guest_list for update
  using (true);

create policy "Allow public delete"
  on public.guest_list for delete
  using (true);

-- Enable realtime (optional — for live multi-guest sync)
-- alter publication supabase_realtime add table public.guest_list;
