import { createClient } from "@supabase/supabase-js";

// These come from your Supabase project settings (Project Settings > API).
// Set them as environment variables — see .env.local.example.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // This warns loudly in the browser console instead of failing silently,
  // since a missing env var is the #1 cause of "nothing loads" bugs.
  console.warn(
    "Supabase env vars are missing. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local (see .env.local.example)."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
