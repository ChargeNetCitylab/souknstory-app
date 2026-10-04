"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ScreenHeader, BottomNav } from "@/components/ui";
import { StoryCard } from "@/components/cards";

export default function StoriesPage() {
  const router = useRouter();
  const [stories, setStories] = useState([]);

  useEffect(() => {
    supabase.from("stories").select("*").eq("published", true).then(({ data }) => setStories(data || []));
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <ScreenHeader title="Stories" subtitle="The people behind the places." onBack={() => router.push("/")} />
        <div className="p-5">
          {stories.length === 0 && (
            <p className="font-body text-sm text-muted italic">Stories from our partners across Morocco are coming soon.</p>
          )}
          {stories.map((s) => <StoryCard key={s.id} story={s} />)}
        </div>
      </div>
      <BottomNav active="stories" />
    </div>
  );
}
