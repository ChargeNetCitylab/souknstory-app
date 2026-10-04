"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { JOURNEYS, TIERS } from "@/lib/journeys";
import { SITE, whatsappLink } from "@/lib/site";
import { inputClass, labelClass } from "@/components/site";

const THEMES = [...JOURNEYS.map((j) => ({ value: j.slug, label: j.title })), { value: "tailor-made", label: "Something tailor-made" }];
const CABINS = [
  ["economy", "Economy", "Best value"],
  ["premium", "Premium economy", "More space"],
  ["business", "Business", "Lie-flat seats"],
  ["first", "First", "Via Europe"],
  ["own", "I'll book my own", "Land only"],
];
const BUDGETS = ["Under $5,000", "$5,000 – $10,000", "$10,000 – $20,000", "$20,000 – $35,000", "$35,000+", "Not sure yet"];

function Choice({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-[46px] px-4 text-[15px] border text-left ${
        active ? "border-night bg-night text-ivory" : "border-field bg-white text-night hover:border-night"
      }`}
    >
      {children}
    </button>
  );
}

function Step({ n, title, children }) {
  return (
    <fieldset className="flex flex-col gap-4 border-0 border-t border-night pt-6 p-0 m-0">
      <legend className="font-serif font-semibold text-[28px] pb-4 pt-6 float-left w-full">{n}. {title}</legend>
      {children}
    </fieldset>
  );
}

export default function JourneyForm() {
  const params = useSearchParams();
  const preset = params.get("journey");
  const [f, setF] = useState({
    journey: THEMES.some((t) => t.value === preset) ? preset : "",
    departure_city: "",
    travel_month: "",
    nights: "",
    adults: "2",
    children: "0",
    occasion: "",
    cabin: "",
    tier: "",
    budget: "",
    full_name: "",
    email: "",
    phone: "",
    contact_pref: "Email",
    notes: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    if (!f.full_name.trim() || (!f.email.trim() && !f.phone.trim())) {
      setError("Please add your name and an email or phone number so we can send your itinerary.");
      return;
    }
    setError("");
    setStatus("sending");
    const { error: dbError } = await supabase.from("journey_requests").insert({
      ...f,
      adults: f.adults ? Number(f.adults) : null,
      children: f.children ? Number(f.children) : null,
    });
    if (dbError) {
      console.error(dbError);
      setStatus("error");
    } else {
      setStatus("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const wa = whatsappLink(`Hello! I'd like to plan a journey to Morocco. My name is ${f.full_name}.`);

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-5 py-10">
        <span lang="ar" className="font-arabic text-[44px] text-brass leading-none">شكرا</span>
        <h2 className="font-serif font-medium text-[44px] md:text-[60px] leading-none m-0">Thank you, {f.full_name.split(" ")[0]}.</h2>
        <p className="text-lg leading-relaxed text-stone m-0">
          Your journey request is in. You'll receive a day-by-day itinerary with hotel and flight options within{" "}
          {SITE.itineraryHours} hours. No payment until you approve it.
        </p>
        <a href="/" className="font-semibold text-brass">← Back to the homepage</a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-10" noValidate>
      <Step n={1} title="Which story calls you?">
        <div className="flex flex-wrap gap-2.5">
          {THEMES.map((t) => (
            <Choice key={t.value} active={f.journey === t.value} onClick={() => set("journey")(t.value)}>
              {t.label}
            </Choice>
          ))}
        </div>
      </Step>

      <Step n={2} title="When and who?">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div><label htmlFor="city" className={labelClass}>Departure city</label><input id="city" className={inputClass} placeholder="e.g. Charlotte, NC" value={f.departure_city} onChange={set("departure_city")} /></div>
          <div><label htmlFor="month" className={labelClass}>Travel month</label><input id="month" type="month" className={inputClass} value={f.travel_month} onChange={set("travel_month")} /></div>
          <div><label htmlFor="nights" className={labelClass}>Nights in Morocco</label>
            <select id="nights" className={inputClass} value={f.nights} onChange={set("nights")}>
              <option value="">Select…</option><option>7–9 nights</option><option>10–12 nights</option><option>13+ nights</option><option>Not sure yet</option>
            </select></div>
          <div><label htmlFor="adults" className={labelClass}>Adults</label><input id="adults" type="number" min="1" className={inputClass} value={f.adults} onChange={set("adults")} /></div>
          <div><label htmlFor="kids" className={labelClass}>Children</label><input id="kids" type="number" min="0" className={inputClass} value={f.children} onChange={set("children")} /></div>
          <div><label htmlFor="occ" className={labelClass}>Occasion</label>
            <select id="occ" className={inputClass} value={f.occasion} onChange={set("occasion")}>
              <option value="">Just because</option><option>Honeymoon</option><option>Anniversary</option><option>Milestone birthday</option><option>Family heritage trip</option><option>Group or friends trip</option>
            </select></div>
        </div>
      </Step>

      <Step n={3} title="How would you like to fly?">
        <div className="grid gap-3 grid-cols-2 md:grid-cols-5">
          {CABINS.map(([v, t, s]) => (
            <Choice key={v} active={f.cabin === v} onClick={() => set("cabin")(v)}>
              <span className="flex flex-col py-3"><span className="font-semibold">{t}</span><span className={`text-[13px] ${f.cabin === v ? "text-mist" : "text-stone"}`}>{s}</span></span>
            </Choice>
          ))}
        </div>
      </Step>

      <Step n={4} title="Your level of comfort">
        <div className="grid gap-3 md:grid-cols-3">
          {TIERS.map((t) => (
            <Choice key={t.key} active={f.tier === t.key} onClick={() => set("tier")(t.key)}>
              <span className="flex flex-col py-3"><span className="font-serif text-2xl font-semibold">{t.name}</span><span className={`text-[13px] ${f.tier === t.key ? "text-mist" : "text-stone"}`}>{t.blurb}</span></span>
            </Choice>
          ))}
        </div>
        <div><label htmlFor="budget" className={labelClass}>Total budget per person, including flights</label>
          <select id="budget" className={inputClass} value={f.budget} onChange={set("budget")}>
            <option value="">Select…</option>{BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select></div>
      </Step>

      <Step n={5} title="Where should we send your itinerary?">
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label htmlFor="name" className={labelClass}>Full name</label><input id="name" autoComplete="name" className={inputClass} value={f.full_name} onChange={set("full_name")} /></div>
          <div><label htmlFor="email" className={labelClass}>Email</label><input id="email" type="email" autoComplete="email" className={inputClass} value={f.email} onChange={set("email")} /></div>
          <div><label htmlFor="phone" className={labelClass}>Phone or WhatsApp</label><input id="phone" type="tel" autoComplete="tel" className={inputClass} value={f.phone} onChange={set("phone")} /></div>
          <div><label htmlFor="pref" className={labelClass}>How should we reach you?</label>
            <select id="pref" className={inputClass} value={f.contact_pref} onChange={set("contact_pref")}>
              <option>Email</option><option>Phone call</option><option>WhatsApp</option>
            </select></div>
          <div className="sm:col-span-2"><label htmlFor="notes" className={labelClass}>Anything we should know? Must-sees, dietary needs, mobility</label>
            <textarea id="notes" rows={4} className={`${inputClass} h-auto py-3`} value={f.notes} onChange={set("notes")} /></div>
        </div>
      </Step>

      <div className="flex flex-col gap-3.5 items-start">
        {error && <p role="alert" className="text-[15px] text-[#9B2C1F] m-0">{error}</p>}
        {status === "error" && (
          <p role="alert" className="text-[15px] text-[#9B2C1F] m-0">
            Something went wrong sending your request.{" "}
            {wa ? <a href={wa} className="underline">Message us on WhatsApp</a> : SITE.email ? <a href={`mailto:${SITE.email}`} className="underline">Email us</a> : "Please try again in a moment"}.
          </p>
        )}
        <button type="submit" disabled={status === "sending"} className="min-h-[58px] px-9 bg-night text-ivory text-[17px] font-semibold disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send my journey request"}
        </button>
        <span className="text-sm text-stone">
          Your custom itinerary arrives within {SITE.itineraryHours} hours. No payment until you approve it.
        </span>
      </div>
    </form>
  );
}
