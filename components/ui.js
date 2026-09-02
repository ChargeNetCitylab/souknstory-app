"use client";
import Link from "next/link";

export function ZelligeStar({ size = 20, color = "currentColor", opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ opacity }}>
      <g fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round">
        <path d="M20 3 L24 14 L36 12 L27 20 L36 28 L24 26 L20 37 L16 26 L4 28 L13 20 L4 12 L16 14 Z" />
      </g>
    </svg>
  );
}

export function Badge({ children, tone = "sand" }) {
  const tones = {
    sand: "bg-sandLight text-[#6B5628]",
    green: "bg-forestLight text-cream",
    terracotta: "bg-terracottaLight text-[#8A3C24]",
  };
  return (
    <span className={`${tones[tone]} text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap`}>
      {children}
    </span>
  );
}

export function ScreenHeader({ title, subtitle, onBack }) {
  return (
    <div className="px-5 pt-5 pb-3">
      {onBack && (
        <button onClick={onBack} className="text-[13px] text-muted mb-2.5 font-body">
          &larr; Back
        </button>
      )}
      <h1 className="font-display font-semibold text-[26px] text-ink m-0">{title}</h1>
      {subtitle && <p className="font-body text-sm text-muted mt-1.5">{subtitle}</p>}
    </div>
  );
}

export function SectionLabel({ children }) {
  return (
    <div className="font-body text-xs tracking-widest uppercase text-muted font-semibold mb-3">
      {children}
    </div>
  );
}

export function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`font-body text-sm font-medium px-3.5 py-2.5 rounded-full whitespace-nowrap border transition-colors ${
        active ? "bg-forest text-cream border-forest" : "bg-white text-[#3D372D] border-[#E2D9C4]"
      }`}
    >
      {label}
    </button>
  );
}

export function PrimaryButton({ children, onClick, disabled, full, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-body font-semibold text-[15px] px-5 py-3.5 rounded-2xl text-white ${full ? "w-full" : ""} ${
        disabled ? "bg-[#CFC6B2] cursor-not-allowed" : "bg-terracotta shadow-[0_6px_16px_rgba(190,91,59,0.28)]"
      }`}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick, full }) {
  return (
    <button
      onClick={onClick}
      className={`font-body font-semibold text-[15px] px-5 py-3.5 rounded-2xl border-[1.5px] border-forest text-forest bg-transparent ${
        full ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
}

export function EmptyState({ title, body, actionLabel, onAction }) {
  return (
    <div className="text-center py-12 px-3">
      <div className="flex justify-center mb-3.5">
        <ZelligeStar size={40} color="#D9C49B" />
      </div>
      <div className="font-display font-semibold text-lg text-ink">{title}</div>
      <p className="font-body text-sm text-muted my-2 mb-4 leading-relaxed">{body}</p>
      {actionLabel && <PrimaryButton onClick={onAction}>{actionLabel}</PrimaryButton>}
    </div>
  );
}

export function TextField({ label, value, onChange, placeholder, multiline }) {
  const Tag = multiline ? "textarea" : "input";
  return (
    <div className="mb-3.5">
      <label className="font-body text-[12.5px] font-semibold text-[#5C5442] block mb-1.5">{label}</label>
      <Tag
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={multiline ? 3 : undefined}
        className="w-full font-body text-sm px-3 py-2.5 rounded-xl border-[1.5px] border-[#E2D9C4] outline-none bg-white focus:border-forest"
      />
    </div>
  );
}

export function SelectField({ label, value, onChange, options }) {
  return (
    <div className="mb-3.5">
      <label className="font-body text-[12.5px] font-semibold text-[#5C5442] block mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full font-body text-sm px-3 py-2.5 rounded-xl border-[1.5px] border-[#E2D9C4] outline-none bg-white"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export function BottomNav({ active }) {
  const items = [
    { key: "home", label: "Home", href: "/" },
    { key: "hidden", label: "Explore", href: "/hidden" },
    { key: "trip", label: "My Trip", href: "/my-trip" },
    { key: "ask", label: "Ask", href: "/ask" },
    { key: "profile", label: "Profile", href: "/profile" },
  ];
  return (
    <div className="sticky bottom-0 bg-cream border-t border-[#EFE8D8] flex px-1.5 pt-2 pb-2.5">
      {items.map((it) => {
        const isActive = active === it.key;
        return (
          <Link
            key={it.key}
            href={it.href}
            className="flex-1 flex flex-col items-center gap-1 py-1"
          >
            <div className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-terracotta" : "bg-transparent"}`} />
            <span className={`font-body text-[11px] ${isActive ? "font-bold text-forest" : "font-medium text-[#A79E88]"}`}>
              {it.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
