import Link from "next/link";
import { SITE, whatsappLink } from "@/lib/site";

export function Container({ children, className = "" }) {
  return <div className={`max-w-[1200px] mx-auto px-5 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false, className = "" }) {
  return (
    <div
      className={`font-sans text-[13px] tracking-[0.2em] uppercase font-semibold ${
        light ? "text-gold" : "text-brass"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function H2({ children, className = "" }) {
  return (
    <h2 className={`font-serif font-medium text-[40px] md:text-[56px] leading-[1.02] m-0 ${className}`}>
      {children}
    </h2>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-nightLine">
      <Container className="py-4 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="flex items-baseline gap-3 text-ivory no-underline">
          <span className="font-serif font-semibold text-[28px] md:text-[30px]">Souk N Story</span>
          <span lang="ar" className="font-arabic text-[19px] text-gold">
            سوق وحكاية
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[15px]">
          <Link href="/#journeys" className="text-ivory no-underline hover:text-gold">Journeys</Link>
          <Link href="/departures" className="text-ivory no-underline hover:text-gold">Departures</Link>
          <Link href="/#tiers" className="text-ivory no-underline hover:text-gold">Pricing</Link>
          <Link href="/stories" className="text-ivory no-underline hover:text-gold">Stories</Link>
          <Link href="/partners" className="text-ivory no-underline hover:text-gold">Partners</Link>
          <Link href="/onboarding" className="bg-gold text-night px-5 py-3 font-semibold no-underline hover:brightness-110">
            Design my journey
          </Link>
        </nav>
      </Container>
    </header>
  );
}

export function SiteFooter() {
  const wa = whatsappLink();
  return (
    <footer className="bg-[#0B0E13] text-mist font-sans">
      <Container className="py-9 flex flex-wrap justify-between gap-5 text-sm">
        <div className="flex flex-col gap-1.5">
          <span className="font-serif font-semibold text-[22px] text-ivory">Souk N Story</span>
          <span>Private, tailor-made journeys to Morocco · Charlotte, NC</span>
        </div>
        <div className="flex flex-wrap gap-5 items-center">
          <Link href="/#journeys" className="text-mist hover:text-gold">Journeys</Link>
          <Link href="/departures" className="text-mist hover:text-gold">Group departures</Link>
          <Link href="/onboarding" className="text-mist hover:text-gold">Design My Trip</Link>
          <Link href="/stories" className="text-mist hover:text-gold">Stories</Link>
          <Link href="/partners" className="text-mist hover:text-gold">Become a partner</Link>
          {SITE.instagram && (
            <a href={`https://instagram.com/${SITE.instagram}`} className="text-mist hover:text-gold">
              @{SITE.instagram}
            </a>
          )}
          {wa && <a href={wa} className="text-mist hover:text-gold">WhatsApp</a>}
          <span>© {new Date().getFullYear()}</span>
        </div>
      </Container>
    </footer>
  );
}

// Placeholder for photography: a tinted arch with a zellige motif and a caption.
export function ArchImage({ label, tint = "#2A2F38", dark = true, className = "" }) {
  return (
    <div
      className={`arch relative w-full overflow-hidden flex items-end justify-center pb-8 border ${
        dark ? "border-gold outline outline-1 outline-[#3A404B] outline-offset-[10px]" : "border-line"
      } ${className}`}
      style={{ background: tint }}
    >
      <Zellige className="absolute inset-0 w-full h-full" color={dark ? "#C9A45C" : "#7A5A1C"} opacity={0.18} />
      {label && (
        <span className={`relative font-sans text-sm ${dark ? "text-mist" : "text-stone"}`}>{label}</span>
      )}
    </div>
  );
}

export function TintBlock({ tint, label, className = "" }) {
  return (
    <div className={`relative overflow-hidden flex items-end p-4 ${className}`} style={{ background: tint }}>
      <Zellige className="absolute inset-0 w-full h-full" color="#7A5A1C" opacity={0.16} />
      {label && <span className="relative font-sans text-[13px] text-stone">{label}</span>}
    </div>
  );
}

export function Zellige({ className = "", color = "#C9A45C", opacity = 0.2 }) {
  const id = `z${color.replace("#", "")}`;
  return (
    <svg className={className} aria-hidden="true" style={{ opacity }}>
      <defs>
        <pattern id={id} width="56" height="56" patternUnits="userSpaceOnUse">
          <g transform="translate(28 28)" fill="none" stroke={color} strokeWidth="1.2">
            <rect x="-12" y="-12" width="24" height="24" />
            <rect x="-12" y="-12" width="24" height="24" transform="rotate(45)" />
            <circle r="3" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export const inputClass =
  "w-full h-[50px] border border-field bg-white px-3.5 text-base font-sans text-night outline-none focus:border-night";
export const labelClass = "block font-sans text-sm text-stone mb-1.5";
