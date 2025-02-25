-- Create enum for activity categories
create type public.activity_category as enum (
  'hike',
  'restaurant',
  'cafe',
  'bar',
  'shop',
  'park',
  'other'
);

-- Create maps table
create table if not exists public.maps (
  id uuid not null primary key default gen_random_uuid(),
  title text not null,
  description text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  user_id uuid not null references auth.users(id) on delete cascade,
  is_public boolean not null default false,
  default_lat double precision not null default 43.2965,
  default_lng double precision not null default 5.3698,
  default_zoom integer not null default 13
);

-- Create activities table
create table if not exists public.activities (
  id uuid not null primary key default gen_random_uuid(),
  map_id uuid not null references public.maps(id) on delete cascade,
  title text not null,
  subtitle text,
  address text,
  contact text,
  description text,
  image_url text,
  lat double precision not null,
  lng double precision not null,
  category activity_category not null default 'other',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  created_by uuid not null references auth.users(id) on delete cascade
);

-- Enable Row Level Security (RLS)
alter table public.maps enable row level security;
alter table public.activities enable row level security;

-- Create policies for maps
create policy "Users can view their own maps"
  on public.maps for select
  using (auth.uid() = user_id);

create policy "Users can view public maps"
  on public.maps for select
  using (is_public = true);

create policy "Users can create maps"
  on public.maps for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own maps"
  on public.maps for update
  using (auth.uid() = user_id);

create policy "Users can delete their own maps"
  on public.maps for delete
  using (auth.uid() = user_id);

-- Create policies for activities
create policy "Users can view activities of accessible maps"
  on public.activities for select
  using (
    exists (
      select 1 from public.maps
      where maps.id = activities.map_id
      and (maps.is_public or maps.user_id = auth.uid())
    )
  );

create policy "Users can create activities on their maps"
  on public.activities for insert
  with check (
    exists (
      select 1 from public.maps
      where maps.id = activities.map_id
      and maps.user_id = auth.uid()
    )
  );

create policy "Users can update their own activities"
  on public.activities for update
  using (created_by = auth.uid());

create policy "Users can delete their own activities"
  on public.activities for delete
  using (created_by = auth.uid());

-- Create updated_at triggers
create trigger on_maps_updated
  before update on public.maps
  for each row
  execute procedure public.handle_updated_at();

create trigger on_activities_updated
  before update on public.activities
  for each row
  execute procedure public.handle_updated_at(); 