-- Create requests table
create table if not exists public.requests (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  request_code text not null,
  status text not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Set up Row Level Security (RLS)
alter table public.requests enable row level security;

-- Create policies
create policy "Enable read access for all users" on public.requests
  for select using (true);

create policy "Enable insert access for all users" on public.requests
  for insert with check (true);

create policy "Enable update for users based on user_id" on public.requests
  for update using (auth.uid()::text = user_id);

create policy "Enable delete for users based on user_id" on public.requests
  for delete using (auth.uid()::text = user_id);
