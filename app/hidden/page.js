"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/lib/useUser";
import { ScreenHeader, Chip, BottomNav } from "@/components/ui";
import { ListingCard } from "@/components/cards";

const CITIES = ["Rabat","Casablanca","Marrakech","Fes","Tangier","Chefchaouen","Agadir","Essaouira"];

export default function HiddenMoroccoPage() {
  const router = useRouter();
  const { user } = useUser();
  const [city, setCity] = useState("All");
  const [category, setCategory] = useState("All");
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    supabase.from("businesses_with_category").select("*").eq("verification_status", "verified").then(({ data }) => {
      setListings(data || []);
      const cats = Array.from(new Set((data || []).map((l) => l.category_name).filter(Boolean)));
      setCategories(cats);
    });
    if (user) {
      supabase.from("favorites").select("business_id").eq("user_id", user.id).then(({ data }) => {
        setSaved((data || []).map((f) => f.business_id));
      });
    }
  }, [user]);

  const toggleSave = async (id) => {
    if (!user) {
      router.push("/business/login"); // reuse login flow / could route to traveler login instead
      return;
    }
    if (saved.includes(id)) {
      await supabase.from("favorites").delete().eq("user_id", user.id).eq("business_id", id);
      setSaved((s) => s.filter((x) => x !== id));
    } else {
      await supabase.from("favorites").insert({ user_id: user.id, business_id: id });
      setSaved((s) => [...s, id]);
    }
  };

  const filtered = listings.filter(
    (l) => (city === "All" || l.city === city) && (category === "All" || l.category_name === category)
  );

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <ScreenHeader title="Hidden Morocco" subtitle="Curated, not ranked. Never fabricated." onBack={() => router.push("/")} />
        <div className="px-5 pb-2.5 flex gap-2 overflow-x-auto">
          <Chip label="All cities" active={city === "All"} onClick={() => setCity("All")} />
          {CITIES.map((c) => <Chip key={c} label={c} active={city === c} onClick={() => setCity(c)} />)}
        </div>
        {categories.length > 0 && (
          <div className="px-5 pt-2.5 pb-1 flex gap-2 overflow-x-auto">
            <Chip label="All" active={category === "All"} onClick={() => setCategory("All")} />
            {categories.map((c) => <Chip key={c} label={c} active={category === c} onClick={() => setCategory(c)} />)}
          </div>
        )}
        <div className="p-5">
          {filtered.length === 0 && (
            <div className="font-body text-[#B0A98F] italic">
              Nothing here yet — run supabase/seed.sql for demo content, or add real verified listings via the business portal.
            </div>
          )}
          {filtered.map((l) => (
            <ListingCard key={l.id} item={l} saved={saved.includes(l.id)} onSave={toggleSave} />
          ))}
        </div>
      </div>
      <BottomNav active="hidden" />
    </div>
  );
}
