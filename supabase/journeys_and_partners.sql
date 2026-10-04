-- Souk N Story: journey requests and partner applications.
-- Run this once in Supabase: SQL Editor → New query → paste → Run.
-- Visitors can submit forms but cannot read anything back; you read the
-- submissions in the Supabase Table Editor.

create table if not exists public.journey_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  journey text,
  departure_city text,
  travel_month text,
  nights text,
  adults int,
  children int,
  occasion text,
  cabin text,
  tier text,
  budget text,
  full_name text not null,
  email text,
  phone text,
  contact_pref text,
  notes text,
  status text not null default 'new'
);

create table if not exists public.partner_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  business_name text not null,
  business_type text not null,
  region text,
  years_operating int,
  website text,
  capacity text,
  contact_name text not null,
  whatsapp text,
  email text,
  languages text[] default '{}',
  license_number text,
  price_note text,
  story text,
  photos_link text,
  consent boolean not null default false,
  status text not null default 'new'
);

alter table public.journey_requests enable row level security;
alter table public.partner_applications enable row level security;

-- Anyone may submit; nobody can read via the public API.
drop policy if exists "anyone can submit journey requests" on public.journey_requests;
create policy "anyone can submit journey requests" on public.journey_requests
  for insert to anon, authenticated
  with check (status = 'new' and char_length(full_name) between 1 and 200);

drop policy if exists "anyone can submit partner applications" on public.partner_applications;
create policy "anyone can submit partner applications" on public.partner_applications
  for insert to anon, authenticated
  with check (status = 'new' and consent = true and char_length(business_name) between 1 and 200);
