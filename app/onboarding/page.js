"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/lib/useUser";
import { ScreenHeader, PrimaryButton, Chip, ZelligeStar } from "@/components/ui";

const CITIES = ["Rabat","Casablanca","Marrakech","Fes","Tangier","Chefchaouen","Agadir","Essaouira","Other"];
const TRAVELER_TYPES = ["Local Culture","Foodie","Adventure","Luxury","Family","Photography","History","Art & Design","Wellness","Nightlife"];
const AVOID_OPTIONS = ["Tourist traps","Big groups","Rushing","High prices","Long drives","Generic experiences"];
const STYLE_OPTIONS = ["Budget","Comfort","Premium","Luxury"];
const INTEREST_OPTIONS = ["Food","People","Craft","Architecture","Nature","History","Music","Fashion","Business","Nightlife"];

const STEPS = ["welcome", "type", "avoid", "style", "interests", "cities"];

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();
  const [step, setStep] = useState(0);
  const [prefs, setPrefs] = useState({ types: [], avoid: [], style: "", interests: [], cities: [] });

  const toggle = (field, value) => {
    setPrefs((p) => {
      const arr = p[field] || [];
      return { ...p, [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const canNext = () => {
    const key = STEPS[step];
    if (key === "type") return prefs.types.length > 0;
    if (key === "style") return !!prefs.style;
    if (key === "interests") return prefs.interests.length > 0;
    if (key === "cities") return prefs.cities.length > 0;
    return true;
  };

  const finish = async () => {
    // Persist preferences if the traveler is logged in; otherwise store
    // in sessionStorage so /trip can still read them for this session.
    if (user) {
      await supabase.from("user_preferences").upsert({
        user_id: user.id,
        traveler_types: prefs.types,
        avoid_list: prefs.avoid,
        travel_style: prefs.style,
        interests: prefs.interests,
        target_cities: prefs.cities,
      });
    }
    sessionStorage.setItem("souk_prefs", JSON.stringify(prefs));
    router.push("/trip");
  };

  const next = () => (step < STEPS.length - 1 ? setStep(step + 1) : finish());

  return (
    <div className="flex-1 flex flex-col">
      <div className="px-5 pt-4">
        <div className="flex gap-1.5">
          {STEPS.map((_, i) => (
            <div key={i} className={`flex-1 h-1 rounded ${i <= step ? "bg-forest" : "bg-[#EFE8D8]"}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 px-5 py-6">
        {STEPS[step] === "welcome" && (
          <div className="text-center pt-8">
            <div className="flex justify-center mb-4"><ZelligeStar size={54} color="#163329" /></div>
            <h1 className="font-display font-semibold text-2xl">Welcome to SoukNStory</h1>
            <p className="font-body text-muted text-[15px] mt-2">Let's discover Morocco your way.</p>
          </div>
        )}
        {STEPS[step] === "type" && (
          <>
            <ScreenHeader title="What kind of traveler are you?" subtitle="Choose as many as you like." />
            <ChipGrid options={TRAVELER_TYPES} selected={prefs.types} onToggle={(v) => toggle("types", v)} />
          </>
        )}
        {STEPS[step] === "avoid" && (
          <>
            <ScreenHeader title="What do you want to avoid?" subtitle="We'll steer clear of these." />
            <ChipGrid options={AVOID_OPTIONS} selected={prefs.avoid} onToggle={(v) => toggle("avoid", v)} />
          </>
        )}
        {STEPS[step] === "style" && (
          <>
            <ScreenHeader title="What's your travel style?" />
            <ChipGrid options={STYLE_OPTIONS} selected={prefs.style ? [prefs.style] : []} onToggle={(v) => setPrefs((p) => ({ ...p, style: v }))} />
          </>
        )}
        {STEPS[step] === "interests" && (
          <>
            <ScreenHeader title="What interests you about Morocco?" />
            <ChipGrid options={INTEREST_OPTIONS} selected={prefs.interests} onToggle={(v) => toggle("interests", v)} />
          </>
        )}
        {STEPS[step] === "cities" && (
          <>
            <ScreenHeader title="Where are you going?" />
            <ChipGrid options={CITIES} selected={prefs.cities} onToggle={(v) => toggle("cities", v)} />
          </>
        )}
      </div>

      <div className="p-5">
        <PrimaryButton full disabled={!canNext()} onClick={next}>
          {step < STEPS.length - 1 ? "Continue" : "Build My Morocco"}
        </PrimaryButton>
      </div>
    </div>
  );
}

function ChipGrid({ options, selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2 mt-4.5 mt-[18px]">
      {options.map((o) => (
        <Chip key={o} label={o} active={selected.includes(o)} onClick={() => onToggle(o)} />
      ))}
    </div>
  );
}
