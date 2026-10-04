import Link from "next/link";
import { Container, Eyebrow, H2, SiteHeader, SiteFooter, ArchImage, TintBlock } from "@/components/site";
import { JOURNEYS, TIERS, priceLabel } from "@/lib/journeys";
import { SITE, whatsappLink } from "@/lib/site";

export default function HomePage() {
  const wa = whatsappLink("Hello! I'd like to plan a journey to Morocco.");
  const trust = [
    SITE.groundPartner && `Licensed Moroccan ground partner: ${SITE.groundPartner}`,
    SITE.hostAgency && `Member of ${SITE.hostAgency}`,
    "Licensed private guides and insured private vehicles",
    "Travel insurance offered on every trip",
    "WhatsApp support from arrival to departure",
  ].filter(Boolean);

  return (
    <div className="font-sans text-night bg-ivory">
      {/* Hero */}
      <section className="bg-night text-ivory">
        <SiteHeader />
        <Container className="pt-16 pb-20 grid gap-14 items-center md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Eyebrow light>Private, tailor-made journeys to Morocco</Eyebrow>
            <h1 className="font-serif font-medium text-[52px] md:text-[88px] leading-[0.98] m-0">
              Morocco, designed around you.
            </h1>
            <p className="text-[19px] leading-relaxed text-mist max-w-[520px] m-0">
              From your home city to the Sahara and back. Flights, palace stays, private guides and every
              detail in between, designed by a Moroccan American who knows both homes.
            </p>
            <div className="flex flex-wrap gap-3.5 pt-1.5">
              <Link href="/onboarding" className="bg-gold text-night px-7 py-4 font-semibold no-underline hover:brightness-110">
                Design my journey
              </Link>
              <Link href="#journeys" className="border border-ivory text-ivory px-7 py-4 font-medium no-underline hover:bg-ivory hover:text-night">
                Explore journeys
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <ArchImage className="max-w-[440px] h-[440px] md:h-[560px]" label="The Sahara at dusk" />
          </div>
        </Container>
        <div className="border-t border-nightLine">
          <Container className="py-5 flex flex-wrap justify-between gap-4 text-sm tracking-wide text-mist">
            <span>Departures from any US city</span>
            <span>Gateways: New York · Washington · Miami · Boston · Los Angeles</span>
            <span>Private guides &amp; drivers</span>
            <span>WhatsApp support in Morocco</span>
          </Container>
        </div>
      </section>

      {/* Journeys */}
      <section id="journeys">
        <Container className="py-24 flex flex-col gap-11">
          <div className="flex flex-wrap justify-between items-end gap-6">
            <div className="flex flex-col gap-3 max-w-[640px]">
              <Eyebrow>Signature journeys</Eyebrow>
              <H2>Choose a story. We'll tailor every day of it.</H2>
            </div>
            <p className="text-base leading-relaxed text-stone max-w-[380px] m-0">
              Every journey is private and fully customizable: length, pace, hotels and flights.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {JOURNEYS.map((j) => (
              <Link key={j.slug} href={`/journeys/${j.slug}`} className="bg-white flex flex-col text-night no-underline group">
                <TintBlock tint={j.tint} className="h-[240px]" label={j.route.map((r) => r.city).filter((c, i, a) => a.indexOf(c) === i).join(" · ")} />
                <div className="p-7 flex flex-col gap-2.5">
                  <span className="text-xs tracking-[0.18em] uppercase text-brass font-semibold">
                    {j.theme} · {j.days} days
                  </span>
                  <span className="font-serif font-semibold text-[30px] leading-tight group-hover:text-brass">{j.title}</span>
                  <span className="text-[15px] leading-relaxed text-stone">{j.short}</span>
                  <span className="text-[15px] font-semibold pt-1.5">{priceLabel(j)} →</span>
                </div>
              </Link>
            ))}
            <Link href="/onboarding" className="bg-night text-ivory flex flex-col justify-center gap-3.5 px-8 py-10 no-underline">
              <span className="text-xs tracking-[0.18em] uppercase text-gold font-semibold">Tailor-made</span>
              <span className="font-serif font-medium text-[38px] leading-[1.05]">Honeymoons, milestones &amp; heritage trips</span>
              <span className="text-[15px] leading-relaxed text-mist">
                Tell us the occasion. We'll build the journey from a blank page.
              </span>
              <span className="text-[15px] font-semibold text-gold pt-1.5">Start designing →</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Small-group departures */}
      <section className="bg-night text-ivory">
        <Container className="py-16 flex flex-wrap items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-[620px]">
            <Eyebrow light>Small-group departures · every Saturday</Eyebrow>
            <h2 className="font-serif font-medium text-[38px] md:text-[52px] leading-[1.02] m-0">The First Story, from $3,290</h2>
            <p className="text-mist text-[17px] leading-relaxed m-0">
              Eight days from Marrakech to the High Atlas and the Agafay desert, with up to 12 guests and five
              wow moments included. Founding departures in spring 2027.
            </p>
          </div>
          <Link href="/departures" className="bg-gold text-night px-7 py-4 font-semibold no-underline">See 2027 dates</Link>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-white">
        <Container className="py-24 flex flex-col gap-11">
          <div className="flex flex-col gap-3">
            <Eyebrow>How it works</Eyebrow>
            <H2>Three steps to Morocco.</H2>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              ["I", "Tell us your dream", "A five-minute form or a call: dates, departure city, style and budget."],
              ["II", "Receive your itinerary", `A day-by-day plan with hotels and flight options within ${SITE.itineraryHours} hours. Refine it together.`],
              ["III", "Travel, fully looked after", "Private drivers and guides on the ground, and WhatsApp support from arrival to departure."],
            ].map(([n, t, b]) => (
              <div key={n} className="flex flex-col gap-3 border-t border-night pt-5">
                <span className="font-serif text-5xl text-brass leading-none">{n}</span>
                <span className="text-[21px] font-semibold">{t}</span>
                <span className="text-base leading-relaxed text-stone">{b}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Tiers */}
      <section id="tiers">
        <Container className="py-24 flex flex-col gap-11">
          <div className="flex flex-col gap-3 items-center text-center">
            <Eyebrow>Ways to travel</Eyebrow>
            <H2>Three levels of luxury.</H2>
            <p className="text-base text-stone m-0">
              Every journey comes in three levels. Flights from your city are quoted separately or bundled.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 items-stretch">
            {TIERS.map((t) =>
              t.featured ? (
                <div key={t.key} className="bg-night text-ivory p-9 flex flex-col gap-4 outline outline-1 outline-gold -outline-offset-8">
                  <span className="text-xs tracking-[0.18em] uppercase text-gold font-semibold">Most requested</span>
                  <span className="font-serif font-semibold text-[34px]">{t.name}</span>
                  <div className="border-t border-[#3A404B]" />
                  <ul className="flex flex-col gap-2.5 text-[15px] leading-snug flex-grow list-none p-0 m-0">
                    {t.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <Link href="/onboarding" className="text-center bg-gold text-night py-3.5 font-semibold no-underline">
                    Plan a {t.name} trip
                  </Link>
                </div>
              ) : (
                <div key={t.key} className="bg-white border border-line p-9 flex flex-col gap-4">
                  <span className="font-serif font-semibold text-[34px]">{t.name}</span>
                  <div className="border-t border-line" />
                  <ul className="flex flex-col gap-2.5 text-[15px] leading-snug flex-grow list-none p-0 m-0">
                    {t.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <Link href="/onboarding" className="text-center border border-night text-night py-3.5 font-medium no-underline hover:bg-night hover:text-ivory">
                    Plan a {t.name} trip
                  </Link>
                </div>
              )
            )}
          </div>
        </Container>
      </section>

      {/* About */}
      <section className="bg-white">
        <Container className="py-24 grid gap-14 items-center md:grid-cols-2">
          <ArchImage dark={false} tint="#E4D9C6" className="h-[420px] md:h-[500px]" label="Your host in Morocco" />
          <div className="flex flex-col gap-5">
            <span lang="ar" className="font-arabic text-[52px] leading-none text-brass">مرحبا</span>
            <Eyebrow>Your host</Eyebrow>
            <H2>Two homes. One story.</H2>
            <p className="text-[17px] leading-relaxed text-stone m-0">
              I'm a Moroccan American based in Charlotte, North Carolina, and I spend part of every year in
              Morocco. After 15 years in restaurants and 8 years at Tesla, I know what world-class service feels
              like and how much the small details matter.
            </p>
            <p className="text-[17px] leading-relaxed text-stone m-0">
              Souk N Story shows you the Morocco I grew up with, at the level of comfort you expect at home.
            </p>
            <Link href="/stories" className="font-semibold text-brass">Meet the people behind the places →</Link>
          </div>
        </Container>
      </section>

      {/* Ask Souk + confidence */}
      <section>
        <Container className="py-24 grid gap-14 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow>Ask Souk</Eyebrow>
            <H2>Questions before you book?</H2>
            <p className="text-[17px] leading-relaxed text-stone m-0">
              Souk, our Moroccan concierge, answers your questions about cities, seasons and what to expect.
              When you're ready to plan, a real person takes it from there.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/ask" className="bg-night text-ivory px-6 py-3.5 font-medium no-underline">Ask Souk</Link>
              {wa && (
                <a href={wa} className="border border-night text-night px-6 py-3.5 font-medium no-underline">
                  Talk to us on WhatsApp
                </a>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Eyebrow>Travel with confidence</Eyebrow>
            <ul className="list-none p-0 m-0 flex flex-col">
              {trust.map((t) => (
                <li key={t} className="border-t border-line py-3.5 text-base">{t}</li>
              ))}
            </ul>
            <Eyebrow className="pt-6">Good to know</Eyebrow>
            <div className="flex flex-col">
              {[
                ["When is the best time to go?", "Spring and autumn suit most journeys. Desert nights are cold in winter, and summer inland is very hot. We'll advise for your route."],
                ["Can you book flights from my city?", "Yes. We quote options from your nearest airport in the cabin you prefer, or you can book your own."],
                ["Can I change a journey?", "Always. Every journey is private, so we adjust days, hotels and pace to suit you."],
              ].map(([q, a]) => (
                <div key={q} className="border-t border-line py-3.5 flex flex-col gap-1.5">
                  <span className="text-[17px] font-semibold">{q}</span>
                  <span className="text-[15px] leading-relaxed text-stone">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="bg-night text-ivory">
        <div className="max-w-[900px] mx-auto px-5 py-24 flex flex-col gap-6 items-center text-center">
          <span lang="ar" className="font-arabic text-[40px] text-gold">أهلا وسهلا</span>
          <h2 className="font-serif font-medium text-[44px] md:text-[72px] leading-none m-0">
            Your story in Morocco starts here.
          </h2>
          <Link href="/onboarding" className="bg-gold text-night px-8 py-4 font-semibold no-underline">
            Design my journey
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
