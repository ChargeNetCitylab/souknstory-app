"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { GROUP_PRODUCT, generatedSchedule, addDays, formatDate, monthLabel, seatState } from "@/lib/departures";

const BADGE = {
  open: "border-line text-stone",
  guaranteed: "border-[#2F6B4F] text-[#2F6B4F]",
  few: "border-brass text-brass",
  full: "border-stone text-stone",
  cancelled: "border-stone text-stone",
};

export default function DepartureCalendar() {
  const today = new Date().toISOString().slice(0, 10);
  // Show the planned schedule immediately, then swap in live seats from Supabase.
  const [deps, setDeps] = useState(generatedSchedule);

  useEffect(() => {
    let alive = true;
    setDeps((prev) => prev.filter((d) => d.start_date >= today));
    supabase
      .from("departures")
      .select("*")
      .eq("product", GROUP_PRODUCT.slug)
      .gte("start_date", today)
      .order("start_date")
      .then(({ data, error }) => {
        if (!alive) return;
        if (!error && data && data.length) setDeps(data);
      });
    return () => { alive = false; };
  }, [today]);

  const months = useMemo(() => {
    const groups = [];
    (deps || []).forEach((d) => {
      const key = d.start_date.slice(0, 7);
      let g = groups.find((x) => x.key === key);
      if (!g) groups.push((g = { key, label: monthLabel(d.start_date), items: [] }));
      g.items.push(d);
    });
    return groups;
  }, [deps]);

  if (!months.length) {
    return <p className="text-stone">New departures are being scheduled. <Link href="/onboarding?journey=first-story" className="text-brass font-semibold">Join the waitlist →</Link></p>;
  }

  return (
    <div className="flex flex-col gap-12">
      {months.map((m) => (
        <section key={m.key} aria-labelledby={`m-${m.key}`} className="flex flex-col">
          <h3 id={`m-${m.key}`} className="font-serif font-semibold text-[30px] m-0 pb-3 border-b border-night">{m.label}</h3>
          <ul className="list-none m-0 p-0">
            {m.items.map((d) => {
              const s = seatState(d);
              const closed = s.key === "full" || s.key === "cancelled";
              const pct = Math.round((Math.min(d.seats_booked, d.capacity) / d.capacity) * 100);
              return (
                <li key={d.start_date} className="flex flex-wrap items-center gap-x-6 gap-y-3 py-5 border-b border-line">
                  <div className="flex-[1_1_220px] min-w-0 flex flex-col gap-0.5">
                    <span className="font-serif font-semibold text-[24px] leading-tight">
                      {formatDate(d.start_date)} – {formatDate(addDays(d.start_date, 7))}
                    </span>
                    <span className="text-sm text-stone">Arrive and depart Marrakech · 7 nights</span>
                  </div>
                  <div className="flex-[1_1_200px] flex flex-col gap-2">
                    <span className={`self-start text-[13px] font-semibold border px-2.5 py-1 ${BADGE[s.key]}`}>
                      {d.founding ? "Founding departure · hosted by the founder" : s.label}
                    </span>
                    {d.founding && !closed && <span className="text-[13px] text-stone">{s.label}</span>}
                    <span className="block h-1.5 bg-line w-full max-w-[220px]" aria-hidden="true">
                      <span className="block h-full bg-brass" style={{ width: `${pct}%` }} />
                    </span>
                  </div>
                  <div className="flex-[0_1_150px] flex flex-col">
                    <span className="text-xs tracking-[0.14em] uppercase text-stone">Per person</span>
                    <span className="font-serif text-[30px] leading-none tabular-nums">${d.price_usd.toLocaleString("en-US")}</span>
                  </div>
                  <div className="flex-[0_0_auto]">
                    {closed ? (
                      <Link href={`/onboarding?journey=first-story&departure=${d.start_date}`} className="inline-block border border-night text-night px-5 py-3 font-medium no-underline">
                        Join waitlist
                      </Link>
                    ) : (
                      <Link href={`/onboarding?journey=first-story&departure=${d.start_date}`} className="inline-block bg-night text-ivory px-5 py-3 font-semibold no-underline hover:bg-brass">
                        Reserve
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
