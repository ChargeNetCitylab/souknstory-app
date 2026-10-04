import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow, H2, SiteHeader, SiteFooter, ArchImage, TintBlock } from "@/components/site";
import { JOURNEYS, TIERS, getJourney, hotelsFor, priceLabel } from "@/lib/journeys";

export function generateStaticParams() {
  return JOURNEYS.map((j) => ({ slug: j.slug }));
}

export function generateMetadata({ params }) {
  const j = getJourney(params.slug);
  if (!j) return {};
  return {
    title: `${j.title} · ${j.days}-day private journey · Souk N Story`,
    description: j.intro,
  };
}

const TINTS = ["#D9CDB6", "#C9B593", "#D6BFA8", "#BFA98A", "#CDBFA9", "#E4D9C6"];

export default function JourneyPage({ params }) {
  const j = getJourney(params.slug);
  if (!j) notFound();
  const hotels = hotelsFor(j);
  const nights = j.days - 1;

  return (
    <div className="font-sans text-night bg-ivory">
      <section className="bg-night text-ivory">
        <SiteHeader />
        <Container className="pt-14 pb-16 grid gap-14 items-center md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Link href="/#journeys" className="text-sm text-mist">← All journeys</Link>
            <Eyebrow light>{j.theme} · {j.days} days · Private</Eyebrow>
            <h1 className="font-serif font-medium text-[52px] md:text-[86px] leading-[0.98] m-0">{j.title}</h1>
            <p className="text-[19px] leading-relaxed text-mist max-w-[520px] m-0">{j.intro}</p>
            <div className="grid grid-cols-3 gap-4 border-t border-nightLine pt-4">
              {[["Arrive", j.arrive], ["Depart", j.depart], ["From", j.fromPrice ? `$${j.fromPrice.toLocaleString("en-US")} pp` : "On request"]].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1">
                  <span className="text-xs tracking-[0.14em] uppercase text-mist">{k}</span>
                  <span className="text-[17px]">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <ArchImage className="max-w-[440px] h-[440px] md:h-[540px]" label={j.route[0].city} tint="#2A2F38" />
          </div>
        </Container>
      </section>

      <section className="bg-white border-b border-line">
        <Container className="py-9 flex flex-col gap-4">
          <Eyebrow>Your route</Eyebrow>
          <ol className="flex flex-wrap items-center gap-3 list-none p-0 m-0">
            {j.route.map((r, i) => (
              <li key={`${r.city}-${i}`} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="text-brass text-[22px]">→</span>}
                <span className="flex flex-col">
                  <span className="font-serif font-semibold text-[26px]">{r.city}</span>
                  <span className="text-[13px] text-stone">{r.nights} {r.nights === 1 ? "night" : "nights"}</span>
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section>
        <Container className="py-24 flex flex-col gap-9">
          <div className="flex flex-col gap-3">
            <Eyebrow>Day by day</Eyebrow>
            <H2>Your journey, every day.</H2>
          </div>
          <div className="flex flex-col border-b border-night">
            {j.itinerary.map((d, i) => (
              <div key={d.day} className={`flex flex-wrap gap-6 py-7 border-t ${i === 0 ? "border-night" : "border-line"}`}>
                <div className="basis-[96px] shrink-0 flex flex-col">
                  <span className="text-xs tracking-[0.16em] uppercase text-stone">Day</span>
                  <span className="font-serif text-[52px] leading-none text-brass">{d.day}</span>
                </div>
                <div className="flex-[999_1_380px] min-w-0 flex flex-col gap-2">
                  <span className="font-serif font-semibold text-[28px] leading-tight">{d.title}</span>
                  <span className="text-base leading-relaxed text-stone">{d.text}</span>
                </div>
                <dl className="flex-[1_1_240px] flex flex-col gap-1.5 text-sm text-stone m-0">
                  {d.stay && <div><dt className="inline font-semibold text-night">Stay: </dt><dd className="inline m-0">{d.stay}</dd></div>}
                  {d.drive && <div><dt className="inline font-semibold text-night">Drive: </dt><dd className="inline m-0">{d.drive}</dd></div>}
                  {d.meals && <div><dt className="inline font-semibold text-night">Meals: </dt><dd className="inline m-0">{d.meals}</dd></div>}
                </dl>
              </div>
            ))}
          </div>
          <p className="text-sm text-stone m-0">Drive times are approximate. Hotels shown are examples and subject to availability.</p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-24 flex flex-col gap-9">
          <div className="flex flex-col gap-3">
            <Eyebrow>Where you'll stay</Eyebrow>
            <H2>{hotels.length} remarkable places to stay.</H2>
          </div>
          <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {hotels.map((h, i) => (
              <div key={h.name} className="flex flex-col gap-2.5">
                <TintBlock tint={TINTS[i % TINTS.length]} className="h-[200px]" />
                <span className="text-xs tracking-[0.16em] uppercase text-brass font-semibold">
                  {h.nights} {h.nights === 1 ? "night" : "nights"}
                </span>
                <span className="font-serif font-semibold text-[22px] leading-tight">{h.name}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-24 grid gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow>Included</Eyebrow>
            <ul className="list-none p-0 m-0 flex flex-col">
              {[
                `${nights} nights in the hotels above, breakfast daily`,
                "Private driver and vehicle throughout",
                "Licensed private guides for sightseeing",
                "Entrance fees and the experiences listed",
                "Airport meet and greet, WhatsApp support",
              ].map((t) => <li key={t} className="border-t border-line py-3 text-base">{t}</li>)}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <Eyebrow className="!text-stone">Not included</Eyebrow>
            <ul className="list-none p-0 m-0 flex flex-col text-stone">
              {["International flights (quoted from your city)", "Meals not listed, drinks and tips", "Travel insurance (offered at booking)"].map((t) => (
                <li key={t} className="border-t border-line py-3 text-base">{t}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-night text-ivory">
        <Container className="py-24 flex flex-col gap-9">
          <div className="flex flex-col gap-3 items-center text-center">
            <Eyebrow light>Choose your level</Eyebrow>
            <H2>{j.title}, three ways.</H2>
            <p className="text-[15px] text-mist m-0">Per person, sharing a room. Flights added from your departure city.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {TIERS.map((t) => (
              <div key={t.key} className={`border p-7 flex flex-col gap-2.5 ${t.featured ? "border-gold" : "border-[#3A404B]"}`}>
                {t.featured && <span className="text-xs tracking-[0.18em] uppercase text-gold font-semibold">As shown</span>}
                <span className="font-serif font-semibold text-[30px]">{t.name}</span>
                <span className="text-[15px] text-mist">{t.blurb}</span>
                <span className="text-xl font-semibold pt-1.5">
                  {t.featured ? priceLabel(j) : "Price on request"}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3.5 justify-center pt-2">
            <Link href={`/onboarding?journey=${j.slug}`} className="bg-gold text-night px-8 py-4 font-semibold no-underline">
              Design this journey
            </Link>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </div>
  );
}
