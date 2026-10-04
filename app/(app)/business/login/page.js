"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ScreenHeader, PrimaryButton, ZelligeStar, TextField } from "@/components/ui";

export default function BusinessLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const sendLink = async () => {
    setError("");
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/business/dashboard`,
        data: { full_name: name, role: "business_owner" },
      },
    });
    if (err) setError(err.message);
    else setSent(true);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <ScreenHeader title="For Business Owners" subtitle="Claim your listing or suggest a new one." onBack={() => router.push("/")} />
      <div className="px-5 pb-8">
        <div className="bg-forest rounded-xl2 p-4.5 p-[18px] text-cream mb-5.5 mb-[22px] flex gap-3 items-start">
          <ZelligeStar size={26} color="#F6F1E6" />
          <div className="font-body text-[13px] leading-relaxed text-[#DCD6C4]">
            Own or manage a business in Morocco? Sign up to claim your existing listing or suggest a new place. Every
            submission is reviewed by our team before it goes live.
          </div>
        </div>

        {sent ? (
          <div className="text-center py-8">
            <div className="font-display font-semibold text-lg">Check your email</div>
            <p className="font-body text-sm text-muted mt-2">
              We sent a magic sign-in link to {email}. Open it on this device to continue to your dashboard.
            </p>
          </div>
        ) : (
          <>
            <TextField label="Your name" value={name} onChange={setName} placeholder="e.g. Youssef Naji" />
            <TextField label="Email" value={email} onChange={setEmail} placeholder="you@business.com" />
            {error && <p className="font-body text-sm text-red-600 mb-3">{error}</p>}
            <PrimaryButton full disabled={!email} onClick={sendLink}>
              Send sign-in link
            </PrimaryButton>
            <p className="font-body text-[11.5px] text-[#B0A98F] mt-3.5 leading-relaxed">
              Passwordless login via email — configure your redirect URL and email templates in Supabase Auth settings
              before going live.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
