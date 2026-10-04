import { Suspense } from "react";
import { Eyebrow, SiteHeader, SiteFooter } from "@/components/site";
import JourneyForm from "@/components/JourneyForm";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Design My Journey · Souk N Story",
  description: "Tell us about your Morocco and receive a private, day-by-day itinerary with hotel and flight options.",
};

export default function DesignMyJourneyPage() {
  return (
    <div className="font-sans text-night bg-ivory">
      <section className="bg-night text-ivory">
        <SiteHeader />
      </section>
      <div className="max-w-[880px] mx-auto px-5 pt-16 pb-24 flex flex-col gap-10">
        <div className="flex flex-col gap-3.5">
          <Eyebrow>Design my journey · about 5 minutes</Eyebrow>
          <h1 className="font-serif font-medium text-[44px] md:text-[72px] leading-none m-0">Tell us about your Morocco.</h1>
          <p className="text-lg leading-relaxed text-stone m-0">
            We'll send a day-by-day itinerary with hotels and flight options within {SITE.itineraryHours} hours.
            No payment needed to start.
          </p>
        </div>
        <Suspense fallback={null}>
          <JourneyForm />
        </Suspense>
      </div>
      <SiteFooter />
    </div>
  );
}
