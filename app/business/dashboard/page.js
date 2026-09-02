"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/lib/useUser";
import { ScreenHeader, Chip, TextField, SelectField, PrimaryButton, GhostButton, Badge, EmptyState } from "@/components/ui";

const CITIES = ["Rabat","Casablanca","Marrakech","Fes","Tangier","Chefchaouen","Agadir","Essaouira"];
const CATEGORIES = ["Food","Cafés","Artisans","Culture","Architecture","Nature","Beaches","Nightlife","Family","Wellness","Shopping","Photography","Adventure","Local experiences"];

export default function BusinessDashboardPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const [tab, setTab] = useState("claim");

  // Ensure a public.users row exists with role=business_owner
  useEffect(() => {
    if (!user) return;
    supabase.from("users").upsert({
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || "",
      role: "business_owner",
    }).then(() => {});
  }, [user]);

  useEffect(() => {
    if (!userLoading && !user) router.push("/business/login");
  }, [user, userLoading]);

  const [claimSearch, setClaimSearch] = useState("");
  const [claimResults, setClaimResults] = useState([]);
  const [myClaims, setMyClaims] = useState([]);
  const [mySubmissions, setMySubmissions] = useState([]);

  useEffect(() => {
    if (claimSearch.length < 2) { setClaimResults([]); return; }
    supabase
      .from("businesses_with_category")
      .select("*")
      .ilike("name", `%${claimSearch}%`)
      .then(({ data }) => setClaimResults(data || []));
  }, [claimSearch]);

  const loadMine = async () => {
    if (!user) return;
    const { data: claims } = await supabase
      .from("business_users")
      .select("*, businesses_with_category(*)")
      .eq("user_id", user.id);
    setMyClaims(claims || []);

    const { data: subs } = await supabase
      .from("businesses_with_category")
      .select("*")
      .eq("submitted_by", user.id);
    setMySubmissions(subs || []);
  };

  useEffect(() => { loadMine(); }, [user]);

  const claimListing = async (businessId) => {
    await supabase.from("business_users").upsert(
      { business_id: businessId, user_id: user.id, status: "pending_verification" },
      { onConflict: "business_id,user_id" }
    );
    loadMine();
  };

  const [form, setForm] = useState({ name: "", city: "", category: "", price_range: "$", description: "", contact: "" });
  const submitNew = async () => {
    const category = await supabase.from("business_categories").select("id").eq("name", form.category).single();
    await supabase.from("businesses").insert({
      name: form.name,
      city: form.city,
      category_id: category.data?.id,
      description: form.description,
      why_recommend: form.description,
      price_range: form.price_range,
      contact: form.contact,
      verification_status: "pending",
      is_demo: false,
      submitted_by: user.id,
    });
    setForm({ name: "", city: "", category: "", price_range: "$", description: "", contact: "" });
    setTab("mine");
    loadMine();
  };

  if (userLoading || !user) return null;

  return (
    <div className="flex-1 overflow-y-auto">
      <ScreenHeader title="Business Dashboard" subtitle={`Signed in as ${user.email}`} onBack={() => router.push("/")} />
      <div className="px-5 pb-2 flex gap-2 overflow-x-auto">
        <Chip label="Claim a listing" active={tab === "claim"} onClick={() => setTab("claim")} />
        <Chip label="Suggest new" active={tab === "suggest"} onClick={() => setTab("suggest")} />
        <Chip label="My submissions" active={tab === "mine"} onClick={() => setTab("mine")} />
      </div>

      <div className="px-5 pt-4 pb-10">
        {tab === "claim" && (
          <>
            <TextField label="Search existing listings" value={claimSearch} onChange={setClaimSearch} placeholder="Search by business name…" />
            {claimResults.map((l) => (
              <div key={l.id} className="bg-white border border-[#EFE8D8] rounded-2xl p-3.5 mb-2.5 flex justify-between items-center">
                <div>
                  <div className="font-display font-semibold text-[15px]">{l.name}</div>
                  <div className="font-body text-xs text-muted">{l.city} · {l.category_name}</div>
                </div>
                <button
                  onClick={() => claimListing(l.id)}
                  className="font-body font-semibold text-[12.5px] px-3 py-2 rounded-lg border-[1.5px] border-forest text-forest"
                >
                  This is mine
                </button>
              </div>
            ))}
            {claimSearch.length > 1 && claimResults.length === 0 && (
              <p className="font-body text-sm text-[#B0A98F] italic">No match — try "Suggest new" instead.</p>
            )}
          </>
        )}

        {tab === "suggest" && (
          <>
            <TextField label="Business name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="e.g. Dar Tazi Riad" />
            <SelectField label="City" value={form.city} onChange={(v) => setForm((f) => ({ ...f, city: v }))} options={CITIES} />
            <SelectField label="Category" value={form.category} onChange={(v) => setForm((f) => ({ ...f, category: v }))} options={CATEGORIES} />
            <SelectField label="Price range" value={form.price_range} onChange={(v) => setForm((f) => ({ ...f, price_range: v }))} options={["$", "$$", "$$$", "$$$$"]} />
            <TextField label="Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} placeholder="What makes this place worth visiting?" multiline />
            <TextField label="Contact / WhatsApp" value={form.contact} onChange={(v) => setForm((f) => ({ ...f, contact: v }))} placeholder="+212…" />
            <PrimaryButton full disabled={!form.name || !form.city || !form.category} onClick={submitNew}>
              Submit for review
            </PrimaryButton>
            <p className="font-body text-[11.5px] text-[#B0A98F] mt-3 leading-relaxed">
              Submissions enter as "Pending Verification" and are reviewed before appearing in Hidden Morocco.
            </p>
          </>
        )}

        {tab === "mine" && (
          <>
            {myClaims.length === 0 && mySubmissions.length === 0 && (
              <EmptyState title="Nothing submitted yet" body="Claim an existing listing or suggest a new business to get started." />
            )}
            {myClaims.map((c) => (
              <div key={c.id} className="bg-white border border-[#EFE8D8] rounded-2xl p-3.5 mb-2.5">
                <div className="flex justify-between items-start">
                  <div className="font-display font-semibold text-[15px]">{c.businesses_with_category?.name}</div>
                  <Badge tone="green">Claimed</Badge>
                </div>
                <div className="font-body text-xs text-muted mt-1">Status: {c.status.replace("_", " ")}</div>
              </div>
            ))}
            {mySubmissions.map((s) => (
              <div key={s.id} className="bg-white border border-[#EFE8D8] rounded-2xl p-3.5 mb-2.5">
                <div className="flex justify-between items-start">
                  <div className="font-display font-semibold text-[15px]">{s.name}</div>
                  <Badge tone="terracotta">{s.verification_status}</Badge>
                </div>
                <div className="font-body text-xs text-muted mt-1">{s.city} · {s.category_name}</div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="px-5 pb-6">
        <GhostButton full onClick={async () => { await supabase.auth.signOut(); router.push("/"); }}>
          Log out
        </GhostButton>
      </div>
    </div>
  );
}
