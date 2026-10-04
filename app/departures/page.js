import Link from "next/link";
import { Container, Eyebrow, H2, SiteHeader, SiteFooter, ArchImage } from "@/components/site";
import DepartureCalendar from "@/components/DepartureCalendar";
import { GROUP_PRODUCT } from "@/lib/departures";

export const metadata = {
  title: "Small-group departures · The First Story · Souk N Story",
  description:
    "Weekly small-group journeys to Morocco: 8 days from Marrakech to the High Atlas and the Agafay desert, up to 12 guests, every Saturday.",
};

const MOMENTS = [
  ["Day 1", "Engraved tea glasses and a calligraphy welcome note in your room"],
  ["Day 2", "A hammam and massage ritual"],
  ["Day 3", "A sunrise hot-air balloon flight with the Atlas on the horizon"],
  ["Day 4", "Cooking with a Berber family in their mountain home"],
  ["Day 6", "A private dinner under the desert stars with Gnawa musicians"],
];

export default function DeparturesPage() {
  const p = GROUP_PRODUCT;
  return (
    <div className="font-sans text-night bg-ivory">
      <section className="bg-night text-ivory">
        <SiteHeader />
        <Container className="pt-14 pb-16 grid gap-14 items-center md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Eyebrow light>Small-group departures · every Saturday</Eyebrow>
            <h1 className="font-serif font-medium text-[52px] md:text-[86px] leading-[0.98] m-0">{p.title}</h1>
            <p className="font-serif italic text-[24px] text-mist m-0">Your first taste of Morocco, done beautifully.</p>
            <p className="text-[18px] leading-relaxed text-mist max-w-[520px] m-0">
              Eight unhurried days from the medina of Marrakech to a mountain village and the stone desert of
              Agafay, with up to {p.capacity} guests and a licensed tour leader.
            </p>
            <div className="grid grid-cols-3 gap-4 border-t border-nightLine pt-4">
              {[["From", `$${p.basePrice.toLocaleString("en-US")}`], ["Group size", `Up to ${p.capacity}`], ["Runs at", `${p.guaranteedAt} guests`]].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1">
                  <span className="text-xs tracking-[0.14em] uppercase text-mist">{k}</span>
                  <span className="font-serif text-[28px] leading-none">{v}</span>
                </div>
              ))}
            </div>
            <a href="#calendar" className="self-start bg-gold text-night px-7 py-4 font-semibold no-underline">See dates</a>
          </div>
          <div className="flex justify-center">
            <ArchImage className="max-w-[440px] h-[440px] md:h-[520px]" label="Agafay at dusk" />
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-20 grid gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow>Five wow moments, included</Eyebrow>
            <ul className="list-none p-0 m-0 flex flex-col">
              {MOMENTS.map(([d, t]) => (
                <li key={t} className="border-t border-line py-3 flex gap-4">
                  <span className="font-serif text-xl text-brass w-16 shrink-0">{d}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <Eyebrow>Ways to save</Eyebrow>
            <ul className="list-none p-0 m-0 flex flex-col">
              {[
                ["Early bird", "$200 off when you book 120+ days ahead"],
                ["Bring friends", "$150 off each for 4+ booking together"],
                ["Make it yours", "8+ friends can take a whole departure privately"],
                ["Traveling solo", `Your own room throughout for +$${p.singleSupplement.toLocaleString("en-US")}`],
              ].map(([t, b]) => (
                <li key={t} className="border-t border-line py-3 flex flex-col">
                  <strong>{t}</strong>
                  <span className="text-stone">{b}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-stone m-0">
              Prices per person sharing a room, land only. Peak months (March–May, October–November) are $300 higher.
              No departures in July and August.
            </p>
          </div>
        </Container>
      </section>

      <section id="calendar">
        <div className="max-w-[1000px] mx-auto px-5 py-20 flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <Eyebrow>2027 departures</Eyebrow>
            <H2>Choose your Saturday.</H2>
            <p className="text-stone m-0">
              Reserve a seat and we'll confirm availability and send your booking details. A $500 deposit holds
              your place.
            </p>
          </div>
          <DepartureCalendar />
          <p className="text-sm text-stone m-0">
            Want a private version with palace hotels? <Link href="/#journeys" className="text-brass font-semibold">See our private journeys →</Link>
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
