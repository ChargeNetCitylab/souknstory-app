"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/lib/useUser";
import { ScreenHeader, GhostButton, Badge, ZelligeStar, BottomNav } from "@/components/ui";

export default function TripBuilderPage() {
  const router = useRouter();
  const { user } = useUser();
  const [prefs, setPrefs] = useState(null);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("souk_prefs");
    setPrefs(stored ? JSON.parse(stored) : { cities: ["Marrakech", "Essaouira"], interests: [] });
  }, []);

  useEffect(() => {
    if (!prefs) return;
    (async () => {
      const targetCities = (prefs.cities || []).filter((c) => c !== "Other");
      const cities = targetCities.length ? targetCities.slice(0, 3) : ["Marrakech", "Essaouira"];

      const { data: businesses } = await supabase.from("businesses_with_category").select("*").in("city", cities);
      const { data: experiences } = await supabase.from("experiences").select("*").in("city", cities);

      const built = cities.map((city, i) => {
        const cityListings = (businesses || []).filter((b) => b.city === city);
        const cityExp = (experiences || []).find((e) => e.city === city);
        const items = [];
        if (cityListings[0]) items.push({ type: "listing", ref: cityListings[0], time: "Morning" });
        if (cityExp) items.push({ type: "experience", ref: cityExp, time: "Afternoon" });
        if (cityListings[1]) items.push({ type: "listing", ref: cityListings[1], time: "Evening" });
        return { day: i + 1, city, items };
      });

      setDays(built);
      setLoading(false);

      // Persist to Supabase if logged in
      if (user) {
        const { data: trip } = await supabase
          .from("trips")
          .insert({ user_id: user.id, title: "My Morocco" })
          .select()
          .single();

        if (trip) {
          for (const d of built) {
            const { data: dayRow } = await supabase
              .from("itinerary_days")
              .insert({ trip_id: trip.id, day_number: d.day, city: d.city })
              .select()
              .single();
            if (dayRow) {
              for (const item of d.items) {
                await supabase.from("itinerary_items").insert({
                  itinerary_day_id: dayRow.id,
                  business_id: item.type === "listing" ? item.ref.id : null,
                  experience_id: item.type === "experience" ? item.ref.id : null,
                  time_of_day: item.time,
                });
              }
            }
          }
          sessionStorage.setItem("souk_trip_id", trip.id);
        }
      }
    })();
  }, [prefs, user]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <ZelligeStar size={40} color="#D9C49B" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <ScreenHeader
          title="Your Morocco"
          subtitle={`Built around ${(prefs?.interests || []).slice(0, 3).join(", ") || "your preferences"}.`}
          onBack={() => router.push("/")}
        />
        <div className="px-5 pb-6">
          {days.map((day) => (
            <div key={day.day} className="mb-5.5 mb-[22px]">
              <div className="flex items-center gap-2 mb-3">
                <ZelligeStar size={16} color="#BE5B3B" />
                <div className="font-display font-semibold text-[17px]">Day {day.day} · {day.city}</div>
              </div>
              {day.items.length === 0 && (
                <div className="font-body text-sm text-[#B0A98F] italic">
                  No items yet for this city — add something from Hidden Morocco.
                </div>
              )}
              {day.items.map((item, idx) => (
                <div key={idx} className="bg-white border border-[#EFE8D8] rounded-2xl p-3.5 mb-2.5">
                  <Badge>{item.time}</Badge>
                  <div className="font-display font-semibold text-[15.5px] mt-2">
                    {item.type === "listing" ? item.ref.name : item.ref.title}
                  </div>
                  <div className="font-body text-[12.5px] text-muted mt-1">
                    {item.type === "listing"
                      ? item.ref.why_recommend
                      : `${item.ref.duration} · $${item.ref.price} · ${item.ref.provider}`}
                  </div>
                </div>
              ))}
            </div>
          ))}
          <GhostButton full onClick={() => router.push("/hidden")}>+ Add more from Hidden Morocco</GhostButton>
        </div>
      </div>
      <BottomNav active="trip" />
    </div>
  );
}
