"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ScreenHeader, Chip, Badge } from "@/components/ui";

const CITIES = ["Rabat","Casablanca","Marrakech","Fes","Tangier","Chefchaouen","Agadir","Essaouira"];

export default function AskSoukPage() {
  const router = useRouter();
  const [cityFilter, setCityFilter] = useState("");
  const [messages, setMessages] = useState([
    { role: "souk", text: "Salam! I'm Souk — ask me anything about your trip. I'll only recommend real, verified places, not guesses." },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || sending) return;
    const userMsg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMsg.text, city: cityFilter || null }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "souk", text: data.text, results: data.results }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "souk", text: "Something went wrong reaching the server — try again in a moment." }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      <ScreenHeader title="Ask Souk" subtitle="Your Moroccan friend in your pocket." onBack={() => router.push("/")} />
      <div className="px-5 pb-2.5 flex gap-2 overflow-x-auto">
        <Chip label="All cities" active={cityFilter === ""} onClick={() => setCityFilter("")} />
        {CITIES.map((c) => (
          <Chip key={c} label={c} active={cityFilter === c} onClick={() => setCityFilter(c)} />
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-2.5">
        {messages.map((m, i) => (
          <div key={i} className={`flex mb-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[82%] px-3.5 py-3 rounded-2xl font-body text-sm leading-relaxed ${
                m.role === "user" ? "bg-forest text-cream" : "bg-white border border-[#EFE8D8] text-[#2A251E]"
              }`}
            >
              {m.text}
              {m.results?.length > 0 && (
                <div className="mt-2.5">
                  {m.results.map((r) => (
                    <div key={r.id} className="bg-creamCard rounded-xl p-2.5 mt-2">
                      <div className="font-display font-semibold text-sm text-ink">{r.name}</div>
                      <div className="text-[11.5px] text-muted mt-0.5">{r.city} · {r.price_range}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="p-4 border-t border-[#EFE8D8] flex gap-2 bg-cream">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about food, hidden spots, families..."
          className="flex-1 font-body text-sm px-3.5 py-3 rounded-2xl border-[1.5px] border-[#E2D9C4] outline-none"
        />
        <button
          onClick={send}
          disabled={sending}
          className="bg-terracotta text-white rounded-2xl px-4.5 font-body font-semibold disabled:opacity-60"
        >
          Send
        </button>
      </div>
    </div>
  );
}
