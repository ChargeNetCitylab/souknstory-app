"use client";
import Link from "next/link";
import { Badge, ZelligeStar } from "./ui";

export function ListingCard({ item, onSave, saved }) {
  return (
    <div className="bg-white rounded-xl2 p-4 mb-3 border border-[#EFE8D8]">
      <div className="h-[120px] rounded-xl mb-3 flex items-center justify-center"
           style={{ background: "linear-gradient(135deg,#D9C49B,#BE5B3B22)" }}>
        <ZelligeStar size={30} color="#16332944" />
      </div>
      <div className="flex justify-between items-start">
        <div>
          <div className="font-display font-semibold text-[17px] text-ink">{item.name}</div>
          <div className="font-body text-[12.5px] text-muted mt-0.5">
            {item.city} · {item.category_name || item.category} · {item.price_range || item.price}
          </div>
        </div>
        {onSave && (
          <button onClick={() => onSave(item.id)} className={`text-lg ${saved ? "text-terracotta" : "text-[#C9BFA9]"}`}>
            {saved ? "♥" : "♡"}
          </button>
        )}
      </div>
      <div className="flex gap-1.5 flex-wrap my-2.5">
        {(item.badges || []).map((b) => (
          <Badge key={b} tone={b === "Locally Verified" ? "green" : "sand"}>{b}</Badge>
        ))}
        {item.is_demo && <Badge tone="terracotta">Demo listing</Badge>}
      </div>
      <p className="font-body text-[13.5px] text-[#4F4939] leading-relaxed m-0">
        {item.why_recommend || item.why}
      </p>
    </div>
  );
}

export function StoryCard({ story }) {
  return (
    <Link href={`/stories/${story.id}`} className="block bg-forest rounded-xl2 p-4.5 p-[18px] mb-3 text-cream">
      <div className="flex justify-between items-center mb-2.5">
        <Badge tone="terracotta">Story</Badge>
        <ZelligeStar size={16} color="#F6F1E699" />
      </div>
      <div className="font-display font-semibold text-lg leading-tight">{story.title}</div>
      <div className="font-body text-[12.5px] text-[#C9C2AE] mt-2">
        {story.person_name} · {story.person_role} · {story.city}
      </div>
      <p className="font-body text-[13px] text-[#DCD6C4] mt-2.5 leading-relaxed">{story.excerpt}</p>
    </Link>
  );
}

export function ExperienceCard({ exp, onAdd, added }) {
  return (
    <div className="bg-white rounded-xl2 p-4 mb-3 border border-[#EFE8D8]">
      <div className="font-display font-semibold text-[17px]">{exp.title}</div>
      <div className="font-body text-[12.5px] text-muted mt-1">
        {exp.city} · {exp.duration} · by {exp.provider}
      </div>
      <div className="flex gap-1.5 flex-wrap my-2.5">
        {(exp.includes || []).map((i) => <Badge key={i}>{i}</Badge>)}
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="font-display font-semibold text-lg text-forest">
          ${exp.price} <span className="font-body font-normal text-xs text-muted">/ person</span>
        </span>
        {onAdd && (
          <button
            onClick={() => onAdd(exp)}
            className={`font-body font-semibold text-[13px] px-3.5 py-2 rounded-xl border-[1.5px] border-forest ${
              added ? "bg-forest text-white" : "bg-white text-forest"
            }`}
          >
            {added ? "Added ✓" : "Add to Trip"}
          </button>
        )}
      </div>
    </div>
  );
}
