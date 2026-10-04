-- Souk N Story: weekly departure calendar for The First Story.
-- Run once in Supabase: SQL Editor → New query → paste → Run.
-- Then manage seats in Table Editor → departures (edit seats_booked or status),
-- and paste each date's WeTravel link into booking_url.

create table if not exists public.departures (
  id uuid primary key default gen_random_uuid(),
  product text not null default 'first-story',
  start_date date not null,
  capacity int not null default 12,
  seats_booked int not null default 0,
  price_usd int not null,
  status text not null default 'open' check (status in ('open', 'guaranteed', 'full', 'cancelled')),
  founding boolean not null default false,
  note text,
  booking_url text, -- WeTravel booking page for this date; Reserve goes there when set
  unique (product, start_date)
);

alter table public.departures add column if not exists booking_url text;

alter table public.departures enable row level security;

-- The website may read the calendar; only you (in Supabase) can change it.
drop policy if exists "departures are public" on public.departures;
create policy "departures are public" on public.departures for select using (true);

-- Trip requests can name the departure they are for.
alter table public.journey_requests add column if not exists departure_date date;

-- Seed: Saturdays from 20 March 2027 to 18 December 2027, no July or August.
-- Base $3,290; +$300 in Mar–May and Oct–Nov; first two departures are
-- founding departures at $300 off.
insert into public.departures (start_date, price_usd, founding)
select d::date,
       3290
       + case when extract(month from d) in (3, 4, 5, 10, 11) then 300 else 0 end
       - case when row_number() over (order by d) <= 2 then 300 else 0 end,
       row_number() over (order by d) <= 2
from generate_series('2027-03-20'::date, '2027-12-18'::date, interval '7 days') as d
where extract(month from d) not in (7, 8)
on conflict (product, start_date) do nothing;
