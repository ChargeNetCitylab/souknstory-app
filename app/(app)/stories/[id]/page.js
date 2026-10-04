"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ScreenHeader, Badge, SectionLabel } from "@/components/ui";
import { ListingCard } from "@/components/cards";

export default function StoryDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [related, setRelated] = useState(null);

  useEffect(() => {
    supabase.from("stories").select("*").eq("id", id).single().then(({ data }) => {
      setStory(data);
      if (data?.related_business_id) {
        supabase
          .from("businesses_with_category")
          .select("*")
          .eq("id", data.related_business_id)
          .single()
          .then(({ data: b }) => setRelated(b));
      }
    });
  }, [id]);

  if (!story) return null;

  return (
    <div className="flex-1 overflow-y-auto">
      <ScreenHeader title={story.person_name} subtitle={`${story.person_role} · ${story.city}`} onBack={() => router.push("/stories")} />
      <div className="px-5 pb-8">
        <Badge tone="terracotta">Story · Demo content</Badge>
        <h2 className="font-display font-semibold text-[22px] my-3.5 leading-tight">{story.title}</h2>
        <p className="font-body text-[14.5px] text-[#4F4939] leading-loose">{story.excerpt}</p>
        {related && (
          <div className="mt-5">
            <SectionLabel>Related place</SectionLabel>
            <ListingCard item={related} />
          </div>
        )}
      </div>
    </div>
  );
}
