-- ============================================================
-- SOUKNSTORY — Supabase / Postgres schema
-- Run this in Supabase SQL Editor (Project > SQL Editor > New query)
-- ============================================================

create extension if not exists "uuid-ossp";

-- ---------- USERS & PREFERENCES ----------
-- Supabase auth.users is the source of truth for login.
-- This table extends it with app-specific profile data.
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'traveler', -- 'traveler' | 'business_owner' | 'admin'
  created_at timestamptz default now()
);

create table public.user_preferences (
  user_id uuid primary key references public.users(id) on delete cascade,
  traveler_types text[] default '{}',
  avoid_list text[] default '{}',
  travel_style text,
  interests text[] default '{}',
  target_cities text[] default '{}',
  updated_at timestamptz default now()
);

-- ---------- LOCATIONS ----------
create table public.locations (
  id uuid primary key default uuid_generate_v4(),
  city text not null,
  address text,
  lat numeric,
  lng numeric,
  created_at timestamptz default now()
);

-- ---------- BUSINESSES ----------
create table public.business_categories (
  id serial primary key,
  name text unique not null
);

insert into public.business_categories (name) values
  ('Food'),('Cafés'),('Artisans'),('Culture'),('Architecture'),('Nature'),
  ('Beaches'),('Nightlife'),('Family'),('Wellness'),('Shopping'),
  ('Photography'),('Adventure'),('Local experiences');

create table public.businesses (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  city text not null,
  category_id int references public.business_categories(id),
  location_id uuid references public.locations(id),
  description text,
  why_recommend text,
  price_range text, -- '$' | '$$' | '$$$' | '$$$$'
  tourist_level text, -- 'Low' | 'Medium' | 'Medium-High' | 'High'
  family_friendly boolean default false,
  languages text[] default '{}',
  hours text,
  contact text,
  whatsapp text,
  booking_url text,
  photos text[] default '{}',
  badges text[] default '{}', -- 'Curated','Locally Verified','Hidden Gem','Great for Families','Local Favorite'
  verification_status text not null default 'pending', -- 'pending' | 'verified' | 'rejected'
  is_demo boolean default false, -- flags seed/demo content so it's never confused with real data
  submitted_by uuid references public.users(id),
  created_at timestamptz default now()
);

-- Links a business owner account to a business they've claimed.
-- Ownership is not active until an admin verifies it.
create table public.business_users (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id) on delete cascade,
  user_id uuid references public.users(id) on delete cascade,
  status text not null default 'pending_verification', -- 'pending_verification' | 'verified' | 'rejected'
  created_at timestamptz default now(),
  unique(business_id, user_id)
);

-- ---------- EXPERIENCES ----------
create table public.experience_categories (
  id serial primary key,
  name text unique not null
);

create table public.experiences (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id),
  title text not null,
  city text not null,
  duration text,
  price numeric,
  currency text default 'USD',
  provider text,
  languages text[] default '{}',
  includes text[] default '{}',
  photos text[] default '{}',
  is_demo boolean default false,
  created_at timestamptz default now()
);

-- ---------- STORIES ----------
create table public.story_authors (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  bio text
);

create table public.stories (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  person_name text,
  person_role text,
  city text,
  excerpt text,
  body text,
  related_business_id uuid references public.businesses(id),
  related_experience_id uuid references public.experiences(id),
  author_id uuid references public.story_authors(id),
  photos text[] default '{}',
  video_url text,
  is_demo boolean default false,
  published boolean default false,
  created_at timestamptz default now()
);

-- ---------- TRIPS / ITINERARIES ----------
create table public.trips (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  title text default 'My Morocco',
  start_date date,
  end_date date,
  created_at timestamptz default now()
);

create table public.itinerary_days (
  id uuid primary key default uuid_generate_v4(),
  trip_id uuid references public.trips(id) on delete cascade,
  day_number int not null,
  city text
);

create table public.itinerary_items (
  id uuid primary key default uuid_generate_v4(),
  itinerary_day_id uuid references public.itinerary_days(id) on delete cascade,
  business_id uuid references public.businesses(id),
  experience_id uuid references public.experiences(id),
  time_of_day text, -- 'Morning' | 'Afternoon' | 'Evening'
  sort_order int default 0,
  notes text
);

-- ---------- BOOKINGS ----------
create table public.bookings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id),
  experience_id uuid references public.experiences(id),
  status text default 'requested', -- 'requested' | 'confirmed' | 'cancelled'
  party_size int default 1,
  requested_date date,
  created_at timestamptz default now()
);

-- ---------- REVIEWS / FAVORITES ----------
create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id),
  business_id uuid references public.businesses(id),
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

create table public.favorites (
  user_id uuid references public.users(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, business_id)
);

-- ---------- AI CONVERSATIONS (Ask Souk) ----------
create table public.ai_conversations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id),
  created_at timestamptz default now()
);

create table public.ai_messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid references public.ai_conversations(id) on delete cascade,
  role text not null, -- 'user' | 'assistant'
  content text not null,
  cited_business_ids uuid[] default '{}',
  created_at timestamptz default now()
);

-- ---------- VERIFICATION LOG ----------
create table public.verification_records (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id),
  reviewed_by uuid references public.users(id),
  decision text, -- 'approved' | 'rejected'
  notes text,
  created_at timestamptz default now()
);

-- ---------- GENERIC CONTENT (admin-managed banners, etc.) ----------
create table public.content (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value jsonb,
  updated_at timestamptz default now()
);

-- ============================================================
-- CONVENIENCE VIEW: businesses with human-readable category name
-- (the app queries this instead of joining client-side)
-- ============================================================
create view public.businesses_with_category as
  select b.*, c.name as category_name
  from public.businesses b
  left join public.business_categories c on c.id = b.category_id;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.users enable row level security;
alter table public.user_preferences enable row level security;
alter table public.trips enable row level security;
alter table public.itinerary_days enable row level security;
alter table public.itinerary_items enable row level security;
alter table public.bookings enable row level security;
alter table public.favorites enable row level security;
alter table public.reviews enable row level security;
alter table public.businesses enable row level security;
alter table public.business_users enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.ai_messages enable row level security;

-- Users can read/edit their own profile & preferences
create policy "own profile" on public.users for select using (auth.uid() = id);
create policy "own profile update" on public.users for update using (auth.uid() = id);
create policy "own prefs" on public.user_preferences for all using (auth.uid() = user_id);

-- Trips/itineraries: owner only
create policy "own trips" on public.trips for all using (auth.uid() = user_id);
create policy "own itinerary days" on public.itinerary_days for all
  using (exists (select 1 from public.trips t where t.id = trip_id and t.user_id = auth.uid()));
create policy "own itinerary items" on public.itinerary_items for all
  using (exists (
    select 1 from public.itinerary_days d join public.trips t on t.id = d.trip_id
    where d.id = itinerary_day_id and t.user_id = auth.uid()
  ));

create policy "own bookings" on public.bookings for all using (auth.uid() = user_id);
create policy "own favorites" on public.favorites for all using (auth.uid() = user_id);
create policy "own reviews write" on public.reviews for insert with check (auth.uid() = user_id);
create policy "reviews readable" on public.reviews for select using (true);

-- Businesses: verified ones are publicly readable; owners can read/edit their own (any status)
create policy "verified businesses public" on public.businesses for select
  using (verification_status = 'verified' or submitted_by = auth.uid());
create policy "owners can insert business" on public.businesses for insert
  with check (submitted_by = auth.uid());
create policy "owners can update own pending business" on public.businesses for update
  using (submitted_by = auth.uid());

create policy "own claims" on public.business_users for all using (user_id = auth.uid());

create policy "own ai conversations" on public.ai_conversations for all using (auth.uid() = user_id);
create policy "own ai messages" on public.ai_messages for all
  using (exists (select 1 from public.ai_conversations c where c.id = conversation_id and c.user_id = auth.uid()));

-- NOTE: stories, experiences, locations, categories are left publicly readable
-- (no RLS enabled) since they're editorial/catalog content managed by admins
-- via the service-role key, not end users.
