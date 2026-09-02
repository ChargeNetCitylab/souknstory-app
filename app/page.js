"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { ZelligeStar, PrimaryButton, GhostButton, SectionLabel, BottomNav } from "@/components/ui";
import { ListingCard } from "@/components/cards";

export default function HomePage() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    supabase
      .from("businesses_with_category")
      .select("*")
      .eq("verification_status", "verified")
      .limit(2)
      .then(({ data, error }) => {
        if (!error && data) setListings(data);
      });
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div
          className="px-[22px] pt-9 pb-[30px] rounded-b-[28px] text-cream relative overflow-hidden"
          style={{ background: "linear-gradient(160deg,#163329 0%,#1F4A3A 100%)" }}
        >
          <div className="absolute right-[-20px] top-[-10px]">
            <ZelligeStar size={140} color="#F6F1E611" />
          </div>
          <div className="font-body text-xs tracking-[2px] uppercase text-[#C9C2AE]">SoukNStory</div>
          <h1 className="font-display font-semibold text-[30px] leading-tight my-2.5">
            Discover the Morocco behind the map.
          </h1>
          <p className="font-body text-[14.5px] text-[#DCD6C4] leading-relaxed mb-5">
            Personalized trips, trusted local experiences, and a Moroccan AI companion — built around you.
          </p>
          <div className="flex flex-col gap-2.5">
            <Link href="/onboarding">
              <PrimaryButton full>Build My Morocco</PrimaryButton>
            </Link>
            <Link
              href="/stories"
              className="font-body font-semibold text-[14.5px] px-5 py-3 rounded-2xl border-[1.5px] border-[#F6F1E655] text-center text-cream"
            >
              Explore Stories
            </Link>
          </div>
        </div>

        <div className="px-5 pt-5 pb-2">
          <Link href="/ask" className="w-full flex items-center gap-3 text-left bg-white border-[1.5px] border-[#EFE8D8] rounded-xl2 p-4">
            <div className="w-10 h-10 rounded-xl bg-terracottaLight flex items-center justify-center shrink-0">
              <ZelligeStar size={20} color="#BE5B3B" />
            </div>
            <div>
              <div className="font-display font-semibold text-[15.5px] text-ink">Ask Souk</div>
              <div className="font-body text-[12.5px] text-muted">"Where should I eat tonight?"</div>
            </div>
          </Link>
        </div>

        <div className="px-5 py-4.5 p-[18px]">
          <SectionLabel>Hidden Morocco</SectionLabel>
          {listings.length === 0 && (
            <p className="font-body text-sm text-muted italic">
              No verified listings yet — run supabase/seed.sql to load demo content.
            </p>
          )}
          {listings.map((l) => (
            <ListingCard key={l.id} item={l} />
          ))}
          <Link href="/hidden">
            <GhostButton full>See all discoveries</GhostButton>
          </Link>
        </div>

        <div className="px-5 pt-2 pb-6">
          <Link
            href="/business/login"
            className="w-full flex items-center justify-between bg-sandLight rounded-2xl px-4 py-3.5"
          >
            <div>
              <div className="font-display font-semibold text-sm text-[#4A3C1E]">Own a business in Morocco?</div>
              <div className="font-body text-xs text-[#8A7043] mt-0.5">Claim or suggest your listing</div>
            </div>
            <span className="text-[#8A7043] text-lg">→</span>
          </Link>
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
}
