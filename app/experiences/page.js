"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/lib/useUser";
import { ScreenHeader } from "@/components/ui";
import { ExperienceCard } from "@/components/cards";

export default function ExperiencesPage() {
  const router = useRouter();
  const { user } = useUser();
  const [experiences, setExperiences] = useState([]);
  const [added, setAdded] = useState([]);

  useEffect(() => {
    supabase.from("experiences").select("*").then(({ data }) => setExperiences(data || []));
  }, []);

  const addExp = async (exp) => {
    setAdded((a) => [...a, exp.id]);
    if (user) {
      await supabase.from("bookings").insert({ user_id: user.id, experience_id: exp.id, status: "requested" });
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <ScreenHeader title="Experiences" subtitle="Request-to-book for now — Stripe checkout comes later." onBack={() => router.push("/")} />
      <div className="p-5">
        {experiences.map((e) => (
          <ExperienceCard key={e.id} exp={e} onAdd={addExp} added={added.includes(e.id)} />
        ))}
      </div>
    </div>
  );
}
