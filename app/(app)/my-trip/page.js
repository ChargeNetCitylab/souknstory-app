"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/lib/useUser";
import { ScreenHeader, EmptyState, BottomNav } from "@/components/ui";

export default function MyTripPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }
    (async () => {
      const { data: trips } = await supabase
        .from("trips")
        .select("id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (!trips?.length) {
        setLoading(false);
        return;
      }

      const { data: itineraryDays } = await supabase
        .from("itinerary_days")
        .select("*, itinerary_items(*, businesses_with_category(*), experiences(*))")
        .eq("trip_id", trips[0].id)
        .order("day_number");

      setDays(itineraryDays || []);
      setLoading(false);
    })();
  }, [user, userLoading]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <ScreenHeader title="My Trip" subtitle="Everything you've built and saved." onBack={() => router.push("/")} />
        <div className="px-5 pb-10">
          {loading && <p className="font-body text-sm text-muted">Loading…</p>}

          {!loading && !user && (
            <EmptyState
              title="Log in to save your trip"
              body="Your itinerary is only saved for this session right now. Add a login flow to persist trips across visits."
              actionLabel="Build My Morocco"
              onAction={() => router.push("/onboarding")}
            />
          )}

          {!loading && user && days.length === 0 && (
            <EmptyState
              title="No trip yet"
              body="Start with Build My Morocco to generate a personalized itinerary."
              actionLabel="Build My Morocco"
              onAction={() => router.push("/onboarding")}
            />
          )}

          {days.map((day) => (
            <div key={day.id} className="mb-4.5 mb-[18px]">
              <div className="font-display font-semibold text-base">Day {day.day_number} · {day.city}</div>
              {(day.itinerary_items || []).map((item) => (
                <div key={item.id} className="font-body text-[13.5px] text-[#4F4939] py-1.5 border-b border-[#F0EADA]">
                  {item.time_of_day} — {item.businesses_with_category?.name || item.experiences?.title}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="trip" />
    </div>
  );
}
