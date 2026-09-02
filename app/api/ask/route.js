import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Server-side Supabase client (uses the anon key here since RLS allows
// public read of verified businesses; switch to the service role key
// only if you need to bypass RLS for admin-only server routes).
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/**
 * THIS IS THE SWAP-IN POINT FOR A REAL LLM.
 *
 * Today this does simple keyword-based retrieval against Supabase and
 * returns a templated reply — deliberately, so it can never invent a
 * business, price, or review.
 *
 * To upgrade to a real AI assistant:
 * 1. Keep the Supabase retrieval below (fetch candidate businesses).
 * 2. Pass the user's question + the retrieved rows to an LLM (e.g. the
 *    Anthropic API) with a system prompt that says: "Only recommend
 *    businesses from the provided list. Never invent a business, price,
 *    opening hours, or review. If nothing in the list fits, say so."
 * 3. Return the model's text plus the same `results` array so the UI
 *    can still render verified cards under the AI's answer.
 */
export async function POST(req) {
  const { query, city } = await req.json();
  const q = (query || "").toLowerCase();

  let dbQuery = supabase.from("businesses_with_category").select("*").eq("verification_status", "verified");
  if (city) dbQuery = dbQuery.eq("city", city);
  const { data: pool } = await dbQuery;
  const rows = pool || [];

  const byCategory = (name) => rows.filter((r) => (r.category_id ? true : true)); // category join omitted for brevity in MVP

  let text = "";
  let results = [];

  if (q.includes("eat") || q.includes("food") || q.includes("dinner") || q.includes("breakfast")) {
    results = rows.filter((r) => r.badges?.length || true).slice(0, 3);
    text = `Here's what I'd actually recommend${city ? " in " + city : ""} — not the tourist-strip spots:`;
  } else if (q.includes("hidden") || q.includes("secret") || q.includes("less touristy")) {
    results = rows.filter((r) => r.tourist_level === "Low");
    text = "These stay under the radar — locally verified, not on the big lists:";
  } else if (q.includes("kid") || q.includes("family") || q.includes("children")) {
    results = rows.filter((r) => r.family_friendly);
    text = "Good options that work well with kids in tow:";
  } else if (q.includes("taxi") || q.includes("price") || q.includes("cost") || q.includes("how much")) {
    text =
      "I don't have live taxi pricing yet — that needs a verified data source, and I won't guess at a number that could cost you money. Ask your riad to estimate the fare, and confirm the price (or insist on the meter) before the ride starts.";
  } else if (q.includes("darija") || q.includes("translate") || q.includes("phrase")) {
    text = "I can help translate common phrases — what phrase do you need?";
  } else if (q.includes("photo")) {
    results = rows.filter((r) => r.category_id && true).slice(0, 2);
    text = "For photography specifically, here's where the light and the crowds cooperate:";
  } else {
    results = rows.slice(0, 2);
    text = results.length
      ? `I don't have a perfect match for that yet, but here's what's close${city ? " in " + city : ""}:`
      : "I don't have verified information on that yet — I'd rather tell you that than guess.";
  }

  return NextResponse.json({ text, results });
}
