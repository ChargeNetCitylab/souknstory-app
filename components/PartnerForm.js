"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { inputClass, labelClass } from "@/components/site";

const TYPES = ["Riad or hotel", "Licensed guide", "Driver or transport", "Desert camp", "Chef or cooking class", "Artisan workshop", "Experience or activity", "Travel agency"];
const REGIONS = ["Marrakech", "Fes", "Casablanca", "Rabat", "Meknes", "Tangier", "Chefchaouen", "Essaouira", "Atlas Mountains", "Ouarzazate & Skoura", "Merzouga & the Sahara", "Other"];
const LANGS = ["English", "French", "Arabic / Darija", "Amazigh", "Spanish"];

function Section({ n, title, children }) {
  return (
    <fieldset className="flex flex-col gap-4 border-0 border-t border-night p-0 m-0">
      <legend className="font-serif font-semibold text-[26px] pt-6 pb-4 float-left w-full">{n}. {title}</legend>
      {children}
    </fieldset>
  );
}

export default function PartnerForm() {
  const [f, setF] = useState({
    business_name: "",
    business_type: "",
    region: "",
    years_operating: "",
    website: "",
    capacity: "",
    contact_name: "",
    whatsapp: "",
    email: "",
    languages: [],
    license_number: "",
    price_note: "",
    story: "",
    photos_link: "",
  });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const toggleLang = (l) =>
    setF((p) => ({ ...p, languages: p.languages.includes(l) ? p.languages.filter((x) => x !== l) : [...p.languages, l] }));

  const submit = async (e) => {
    e.preventDefault();
    if (!f.business_name.trim() || !f.business_type || !f.contact_name.trim() || (!f.whatsapp.trim() && !f.email.trim())) {
      setError("Please add your business name, type, your name, and a WhatsApp number or email.");
      return;
    }
    if (!consent) {
      setError("Please confirm the information is accurate.");
      return;
    }
    setError("");
    setStatus("sending");
    const { error: dbError } = await supabase.from("partner_applications").insert({
      ...f,
      years_operating: f.years_operating ? Number(f.years_operating) : null,
      consent: true,
    });
    if (dbError) {
      console.error(dbError);
      setStatus("error");
    } else {
      setStatus("sent");
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-4 py-6">
        <span lang="ar" className="font-arabic text-[44px] text-brass leading-none">شكرا</span>
        <h3 className="font-serif font-medium text-[40px] leading-none m-0">Thank you, {f.contact_name.split(" ")[0]}.</h3>
        <p className="text-lg leading-relaxed text-stone m-0">
          We've received your application for {f.business_name}. We'll reply on WhatsApp or by email after we
          review it.
        </p>
        <p lang="fr" className="text-base italic text-stone m-0">Merci ! Nous vous répondrons très bientôt.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-10" noValidate>
      <Section n={1} title="Your business">
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label htmlFor="biz" className={labelClass}>Business name</label><input id="biz" className={inputClass} value={f.business_name} onChange={set("business_name")} /></div>
          <div><label htmlFor="type" className={labelClass}>Type of business</label>
            <select id="type" className={inputClass} value={f.business_type} onChange={set("business_type")}>
              <option value="">Select…</option>{TYPES.map((t) => <option key={t}>{t}</option>)}
            </select></div>
          <div><label htmlFor="region" className={labelClass}>City or region</label>
            <select id="region" className={inputClass} value={f.region} onChange={set("region")}>
              <option value="">Select…</option>{REGIONS.map((t) => <option key={t}>{t}</option>)}
            </select></div>
          <div><label htmlFor="years" className={labelClass}>Years in business</label><input id="years" type="number" min="0" className={inputClass} value={f.years_operating} onChange={set("years_operating")} /></div>
          <div><label htmlFor="web" className={labelClass}>Website or Instagram</label><input id="web" className={inputClass} value={f.website} onChange={set("website")} /></div>
          <div><label htmlFor="cap" className={labelClass}>Capacity (rooms, seats or group size)</label><input id="cap" className={inputClass} value={f.capacity} onChange={set("capacity")} /></div>
        </div>
      </Section>

      <Section n={2} title="Contact">
        <div className="grid gap-4 sm:grid-cols-3">
          <div><label htmlFor="cname" className={labelClass}>Your full name</label><input id="cname" autoComplete="name" className={inputClass} value={f.contact_name} onChange={set("contact_name")} /></div>
          <div><label htmlFor="wa" className={labelClass}>WhatsApp number</label><input id="wa" type="tel" placeholder="+212" className={inputClass} value={f.whatsapp} onChange={set("whatsapp")} /></div>
          <div><label htmlFor="pemail" className={labelClass}>Email</label><input id="pemail" type="email" autoComplete="email" className={inputClass} value={f.email} onChange={set("email")} /></div>
        </div>
        <span className={labelClass}>Languages you speak with guests</span>
        <div className="flex flex-wrap gap-2.5">
          {LANGS.map((l) => {
            const on = f.languages.includes(l);
            return (
              <button key={l} type="button" aria-pressed={on} onClick={() => toggleLang(l)}
                className={`min-h-[44px] px-4 text-[15px] border ${on ? "border-night bg-night text-ivory" : "border-field bg-white text-night"}`}>
                {l}
              </button>
            );
          })}
        </div>
      </Section>

      <Section n={3} title="License, prices & story">
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label htmlFor="lic" className={labelClass}>License or registration number</label><input id="lic" className={inputClass} value={f.license_number} onChange={set("license_number")} /></div>
          <div><label htmlFor="price" className={labelClass}>Typical price (MAD or EUR)</label><input id="price" placeholder="per night, per day or per person" className={inputClass} value={f.price_note} onChange={set("price_note")} /></div>
          <div className="sm:col-span-2"><label htmlFor="story" className={labelClass}>Your story: what makes your place or experience special?</label>
            <textarea id="story" rows={5} className={`${inputClass} h-auto py-3`} value={f.story} onChange={set("story")} /></div>
          <div className="sm:col-span-2"><label htmlFor="photos" className={labelClass}>Link to photos (Google Drive, Instagram or website)</label>
            <input id="photos" className={inputClass} value={f.photos_link} onChange={set("photos_link")} /></div>
        </div>
      </Section>

      <div className="flex flex-col gap-4 border-t border-night pt-6">
        <div className="flex gap-3 items-start">
          <input id="agree" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="w-[22px] h-[22px] mt-0.5 shrink-0" />
          <label htmlFor="agree" className="text-[15px] leading-normal text-stone">
            I confirm the information is accurate and agree that Souk N Story may contact me about a partnership.
          </label>
        </div>
        {error && <p role="alert" className="text-[15px] text-[#9B2C1F] m-0">{error}</p>}
        {status === "error" && <p role="alert" className="text-[15px] text-[#9B2C1F] m-0">Something went wrong sending your application. Please try again in a moment.</p>}
        <button type="submit" disabled={status === "sending"} className="self-start min-h-[58px] px-9 bg-night text-ivory text-[17px] font-semibold disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Submit my application"}
        </button>
      </div>
    </form>
  );
}
