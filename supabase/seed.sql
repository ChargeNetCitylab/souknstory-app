-- ============================================================
-- SOUKNSTORY — demo seed data
-- Run AFTER schema.sql. Safe to re-run (uses is_demo = true so
-- it's easy to identify and delete before going live).
-- All records here are clearly fictional/demo placeholders —
-- replace with real, verified businesses before launch.
-- ============================================================

insert into public.businesses
  (name, city, category_id, description, why_recommend, price_range, tourist_level, family_friendly, badges, verification_status, is_demo)
values
  ('Café Clock', 'Fes', (select id from business_categories where name='Cafés'),
   'A gathering spot for storytellers and musicians in the old medina.',
   'Go for the camel burger, stay for the live oud nights.', '$$', 'Medium', true,
   array['Locally Verified','Local Favorite'], 'verified', true),

  ('Atelier Naji — Zellige Workshop', 'Fes', (select id from business_categories where name='Artisans'),
   'Third-generation zellige cutters who still hand-chip every tile.',
   'Visitors can watch the process up close, no tour groups.', '$$$', 'Low', false,
   array['Curated','Hidden Gem'], 'verified', true),

  ('Nomad', 'Marrakech', (select id from business_categories where name='Food'),
   'Rooftop terrace above the spice souk with a modern Moroccan menu.',
   'Ask for a table facing the Koutoubia at sunset.', '$$$', 'Medium-High', true,
   array['Locally Verified'], 'verified', true),

  ('Souk Sebbaghine (Dyers'' Souk)', 'Marrakech', (select id from business_categories where name='Shopping'),
   'The quieter dyers'' alley just past the tanneries.',
   'Vivid wool skeins drying overhead, few tourists find it.', '$', 'Low', true,
   array['Hidden Gem'], 'verified', true),

  ('Plage Taghazout Surf Sessions', 'Agadir', (select id from business_categories where name='Adventure'),
   'A family-run surf outfit north of Agadir.',
   'Patient instructors and boards for all ages.', '$$', 'Medium', true,
   array['Great for Families','Locally Verified'], 'verified', true),

  ('Ostrea II Oyster Shack', 'Essaouira', (select id from business_categories where name='Food'),
   'Plastic stools at the fishing port, oysters shucked to order.',
   'This is where Essaouira actually eats seafood.', '$', 'Low', true,
   array['Local Favorite','Hidden Gem'], 'verified', true),

  ('Chefchaouen Blue Alleys Photo Walk', 'Chefchaouen', (select id from business_categories where name='Photography'),
   'A guided early-morning walk through the blue medina.',
   'Come at 7am before the crowds — the light is unbeatable.', '$', 'High', true,
   array['Curated'], 'verified', true),

  ('Dar Anika Hammam', 'Tangier', (select id from business_categories where name='Wellness'),
   'A neighborhood hammam, not a spa-hotel version.',
   'Where local women go on Sundays — ask for the black soap scrub.', '$$', 'Low', false,
   array['Locally Verified','Hidden Gem'], 'verified', true);

insert into public.experiences (title, city, duration, price, currency, provider, languages, includes, is_demo)
values
  ('Hands-on Zellige Workshop with Youssef', 'Fes', '3 hours', 65, 'USD', 'Atelier Naji',
   array['English','French','Darija'], array['Materials','Tea break','Take-home tile'], true),
  ('Home-Kitchen Moroccan Cooking Class', 'Rabat', '4 hours', 55, 'USD', 'Amina''s Table',
   array['English','French'], array['Market visit','All ingredients','Full meal'], true),
  ('Sunrise Surf Lesson, Taghazout', 'Agadir', '2 hours', 40, 'USD', 'Karim Surf Co.',
   array['English','French','Darija'], array['Board & wetsuit','Instructor','Photos'], true),
  ('Dyers'' Souk Photography Walk', 'Marrakech', '2.5 hours', 35, 'USD', 'Hidden Morocco Guides',
   array['English'], array['Local guide','Route map'], true);

insert into public.stories (title, person_name, person_role, city, excerpt, related_business_id, is_demo, published)
values
  ('Meet the artisan keeping traditional zellige alive', 'Youssef Naji', 'Third-generation tile cutter', 'Fes',
   'Youssef learned to split tiles with a mizwaq axe at age nine, in the same courtyard workshop his grandfather built.',
   (select id from businesses where name = 'Atelier Naji — Zellige Workshop'), true, true),
  ('The chef bringing her grandmother''s recipes back to the table', 'Amina Bensouda', 'Chef & recipe archivist', 'Rabat',
   'Amina spent three years interviewing women in her family before opening a six-table restaurant.',
   null, true, true),
  ('A surfer''s guide to growing up on the Atlantic', 'Karim Idrissi', 'Surf instructor', 'Agadir',
   'Karim taught himself to surf on a broken board found on the beach.',
   (select id from businesses where name = 'Plage Taghazout Surf Sessions'), true, true);
