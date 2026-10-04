import Link from "next/link";
import { Container, Eyebrow, H2, SiteHeader, SiteFooter, ArchImage } from "@/components/site";
import PartnerForm from "@/components/PartnerForm";

export const metadata = {
  title: "Become a Partner · Souk N Story",
  description:
    "Moroccan riads, guides, drivers, desert camps, chefs and artisans: join the Souk N Story partner network and host our American travelers.",
};

const KINDS = [
  ["Riads & hotels", "Boutique riads, kasbahs and guesthouses with character."],
  ["Licensed guides", "City, mountain and desert guides who tell the real story."],
  ["Drivers & transport", "Licensed private drivers with comfortable, insured vehicles."],
  ["Desert camps", "Comfortable and luxury camps in Merzouga, Zagora and beyond."],
  ["Chefs & cooking", "Home cooks, cooking schools and family kitchens."],
  ["Artisans", "Weavers, potters, leather and zellige masters who welcome visitors."],
  ["Experiences", "Hot-air balloons, surf, horse riding, music, hammams."],
  ["Travel agencies", "Licensed ground operators who can run full journeys."],
];

export default function PartnersPage() {
  return (
    <div className="font-sans text-night bg-ivory">
      <section className="bg-night text-ivory">
        <SiteHeader />
        <Container className="pt-16 pb-20 grid gap-14 items-center md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Eyebrow light>For Moroccan hosts, guides &amp; artisans</Eyebrow>
            <h1 className="font-serif font-medium text-[50px] md:text-[84px] leading-[0.98] m-0">
              Share your Morocco with our travelers.
            </h1>
            <p className="text-[19px] leading-relaxed text-mist max-w-[540px] m-0">
              Souk N Story designs private journeys for American travelers. We're building a trusted circle of the
              best hosts, guides, drivers and makers in Morocco, and we'd like you to be part of it.
            </p>
            <p lang="fr" className="text-base italic text-[#A39D90] m-0">
              Devenez partenaire : accueillez nos voyageurs américains.
            </p>
            <div className="flex flex-wrap gap-3.5 pt-1">
              <Link href="#apply" className="bg-gold text-night px-7 py-4 font-semibold no-underline">Apply to join</Link>
              <Link href="#how" className="border border-ivory text-ivory px-7 py-4 font-medium no-underline">How it works</Link>
            </div>
          </div>
          <div className="flex justify-center">
            <ArchImage className="max-w-[440px] h-[440px] md:h-[520px]" label="Moroccan craft" />
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-24 flex flex-col gap-9">
          <div className="flex flex-col gap-3 max-w-[680px]">
            <Eyebrow>Who we're looking for</Eyebrow>
            <H2>The people behind the places.</H2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {KINDS.map(([t, b]) => (
              <div key={t} className="bg-white border border-line p-6 flex flex-col gap-2">
                <span className="font-serif font-semibold text-2xl">{t}</span>
                <span className="text-[15px] leading-normal text-stone">{b}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-24 grid gap-14 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow>Why partner with us</Eyebrow>
            <H2 className="!text-[38px] md:!text-[50px]">Fewer, better guests. A real relationship.</H2>
            <div className="flex flex-col">
              {[
                ["Private, high-value travelers", "Small groups from the United States on carefully planned trips."],
                ["Clear, fair payment", "Rates and payment terms agreed in writing before every booking."],
                ["Your story, featured", "Partners appear on our Stories page and in our journeys."],
                ["Free to join", "No sign-up fee. We only work together when we book you."],
              ].map(([t, b]) => (
                <div key={t} className="border-t border-line py-3.5 flex flex-col gap-1">
                  <strong>{t}</strong>
                  <span className="text-stone">{b}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Eyebrow>Our standards</Eyebrow>
            <H2 className="!text-[38px] md:!text-[50px]">What we ask of every partner.</H2>
            <ul className="list-none p-0 m-0 flex flex-col">
              {[
                "The license or registration your activity requires in Morocco",
                "Insurance for vehicles and activities",
                "English or French for guest communication",
                "Quick replies on WhatsApp",
                "Honest prices, clean spaces, and warm hospitality",
              ].map((t) => <li key={t} className="border-t border-line py-3.5">{t}</li>)}
            </ul>
          </div>
        </Container>
      </section>

      <section id="how">
        <Container className="py-24 flex flex-col gap-9">
          <div className="flex flex-col gap-3">
            <Eyebrow>How it works</Eyebrow>
            <H2>From application to first guests.</H2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["I", "Apply", "Fill in the form below and share a link to your photos."],
              ["II", "We talk", "A call on WhatsApp, then a visit when we're in Morocco."],
              ["III", "Agree rates", "We agree prices, availability and payment terms in writing."],
              ["IV", "Welcome guests", "You join our journeys and our Stories page."],
            ].map(([n, t, b]) => (
              <div key={n} className="flex flex-col gap-2.5 border-t border-night pt-5">
                <span className="font-serif text-[44px] text-brass leading-none">{n}</span>
                <span className="text-xl font-semibold">{t}</span>
                <span className="text-[15px] leading-relaxed text-stone">{b}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="apply" className="bg-white">
        <div className="max-w-[880px] mx-auto px-5 py-24 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <Eyebrow>Partner application · about 10 minutes</Eyebrow>
            <H2>Tell us about your business.</H2>
            <p lang="fr" className="text-[15px] italic text-stone m-0">
              Vous pouvez répondre en anglais ou en français.
            </p>
          </div>
          <PartnerForm />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
