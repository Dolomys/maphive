-- Create the users table that matches our Prisma schema
create table if not exists public.users (
  id uuid not null references auth.users on delete cascade,
  email text not null unique,
  name text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  email_verified timestamp with time zone,
  
  primary key (id)
);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;

-- Create policies
create policy "Users can view their own data."
  on public.users for select
  using ( auth.uid() = id );

create policy "Users can update their own data."
  on public.users for update
  using ( auth.uid() = id );

create policy "Users can insert their own data."
  on public.users for insert
  with check ( auth.uid() = id );

-- Create a trigger to automatically update the updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_users_updated
  before update on public.users
  for each row
  execute procedure public.handle_updated_at();

-- Create a function to handle new user signups
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.users (id, email, name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name'
  );
  return new;
end;
$$;

-- Create a trigger that automatically creates a user profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user(); 