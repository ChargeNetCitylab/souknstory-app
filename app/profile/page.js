"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/lib/useUser";
import { ScreenHeader, GhostButton, ZelligeStar, SectionLabel, BottomNav } from "@/components/ui";

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useUser();
  const [prefs, setPrefs] = useState(null);

  useEffect(() => {
    if (user) {
      supabase.from("user_preferences").select("*").eq("user_id", user.id).single().then(({ data }) => setPrefs(data));
    } else {
      const stored = sessionStorage.getItem("souk_prefs");
      setPrefs(stored ? JSON.parse(stored) : null);
    }
  }, [user]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <ScreenHeader title="Profile" onBack={() => router.push("/")} />
        <div className="p-5">
          <div className="bg-white border border-[#EFE8D8] rounded-xl2 p-4.5 p-[18px] mb-4">
            <SectionLabel>Traveler profile</SectionLabel>
            <div className="font-body text-[13.5px] text-[#4F4939] leading-loose">
              <div><b>Style:</b> {prefs?.travel_style || prefs?.style || "Not set"}</div>
              <div><b>Interests:</b> {(prefs?.interests || []).join(", ") || "Not set"}</div>
              <div><b>Traveler type:</b> {(prefs?.traveler_types || prefs?.types || []).join(", ") || "Not set"}</div>
              <div><b>Cities:</b> {(prefs?.target_cities || prefs?.cities || []).join(", ") || "Not set"}</div>
            </div>
          </div>
          <GhostButton full onClick={() => router.push("/onboarding")}>Edit preferences</GhostButton>

          <div
            onClick={() => router.push("/business/login")}
            className="mt-6 bg-forest rounded-2xl p-4 flex gap-3 items-center cursor-pointer"
          >
            <ZelligeStar size={22} color="#F6F1E6" />
            <div>
              <div className="font-display font-semibold text-sm text-cream">Own a business in Morocco?</div>
              <div className="font-body text-xs text-[#C9C2AE] mt-0.5">Claim your listing or suggest a new one →</div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}
