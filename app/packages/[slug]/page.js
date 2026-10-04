import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow, H2, SiteHeader, SiteFooter, ArchImage } from "@/components/site";
import { PACKAGES, getPackage, usd } from "@/lib/packages";

export function generateStaticParams() {
  return PACKAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getPackage(params.slug);
  if (!p) return {};
  return { title: `${p.name} · ${p.tier} · Souk N Story`, description: p.intro };
}

export default function PackagePage({ params }) {
  const p = getPackage(params.slug);
  if (!p) notFound();
  const others = PACKAGES.filter((o) => o.slug !== p.slug);

  return (
    <div className="font-sans text-night bg-ivory">
      <section className="bg-night text-ivory">
        <SiteHeader />
        <Container className="pt-14 pb-16 grid gap-14 items-center md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Link href="/#packages" className="text-sm text-mist">← All packages</Link>
            <Eyebrow light>{p.tier} · 8 days · Marrakech · High Atlas · Agafay</Eyebrow>
            <h1 className="font-serif font-medium text-[52px] md:text-[92px] leading-[0.95] m-0">{p.name}</h1>
            <p className="font-serif italic text-[24px] text-mist m-0">{p.tagline}</p>
            <p className="text-[18px] leading-relaxed text-mist max-w-[520px] m-0">{p.intro}</p>
            <div className="grid grid-cols-3 gap-4 border-t border-nightLine pt-4">
              {[["From, per person", usd(p.price)], ["Flights", p.flights], ["Included", p.wow]].map(([k, v], i) => (
                <div key={k} className="flex flex-col gap-1">
                  <span className="text-xs tracking-[0.14em] uppercase text-mist">{k}</span>
                  <span className={i === 0 ? "font-serif text-[34px] leading-none" : "text-[15px] leading-snug"}>{v}</span>
                </div>
              ))}
            </div>
            <Link href={p.cta.href} className="self-start bg-gold text-night px-7 py-4 font-semibold no-underline">{p.cta.label}</Link>
          </div>
          <div className="flex justify-center">
            <ArchImage className="max-w-[440px] h-[440px] md:h-[540px]" label={p.days[0][2]} />
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-24 flex flex-col gap-9">
          <div className="flex flex-col gap-3 max-w-[640px]">
            <Eyebrow>Your story in eight scenes</Eyebrow>
            <H2>What you'll see, feel and remember.</H2>
          </div>
          <ol className="list-none m-0 p-0 flex flex-col border-b border-night">
            {p.days.map(([n, title, stay, scene, moment]) => (
              <li key={n} className="flex flex-wrap gap-7 py-8 border-t border-line first:border-night">
                <div className="basis-[96px] shrink-0 flex flex-col">
                  <span className="text-xs tracking-[0.16em] uppercase text-stone">Day</span>
                  <span className="font-serif text-[58px] leading-[0.9] text-brass">{n}</span>
                </div>
                <div className="flex-[999_1_380px] min-w-0 flex flex-col gap-3">
                  <span className="font-serif font-semibold text-[30px] leading-tight">{title}</span>
                  <span className="text-[17px] leading-relaxed text-[#3F444C]">{scene}</span>
                  {moment && (
                    <div className="flex gap-3.5 items-start bg-white border border-line px-4 py-3.5">
                      <span aria-hidden="true" className="shrink-0 w-3.5 h-3.5 mt-1.5 bg-gold" />
                      <span className="flex flex-col gap-0.5">
                        <span className="text-xs tracking-[0.16em] uppercase text-brass font-semibold">The moment</span>
                        <span className="text-base leading-normal">{moment}</span>
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-[1_1_200px] flex flex-col gap-1 text-sm text-stone">
                  <span className="text-xs tracking-[0.14em] uppercase">Tonight</span>
                  <span className="text-base text-night">{stay}</span>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-20 grid gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow>Included</Eyebrow>
            <ul className="list-none p-0 m-0 flex flex-col">
              {p.included.map((t) => <li key={t} className="border-t border-line py-3">{t}</li>)}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <Eyebrow className="!text-stone">Not included</Eyebrow>
            <ul className="list-none p-0 m-0 flex flex-col text-stone">
              {["International flights (quoted from your city)", "Drinks, tips and meals not listed", "Travel insurance (offered at booking)"].map((t) => (
                <li key={t} className="border-t border-line py-3">{t}</li>
              ))}
            </ul>
            <p className="text-sm text-stone m-0">
              Prices per person, two travelers sharing. A $500 deposit per traveler holds your place; the balance is
              paid in two parts, 90 and 60 days before you travel. Hotels shown are examples, subject to availability.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-night text-ivory">
        <Container className="py-20 flex flex-col gap-8">
          <div className="flex flex-wrap justify-between items-end gap-6">
            <H2>Travel it another way</H2>
            <Link href={p.cta.href} className="bg-gold text-night px-7 py-4 font-semibold no-underline">{p.cta.label}</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {others.map((o) => (
              <Link key={o.slug} href={`/packages/${o.slug}`} className="border border-[#3A404B] p-7 flex flex-col gap-2 text-ivory no-underline hover:border-gold">
                <span className="text-xs tracking-[0.18em] uppercase text-gold font-semibold">{o.tier}</span>
                <span className="font-serif font-semibold text-[30px]">{o.name}</span>
                <span className="text-mist text-[15px]">{o.tagline}</span>
                <span className="font-semibold pt-1">From {usd(o.price)} per person →</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <SiteFooter />
    </div>
  );
}
