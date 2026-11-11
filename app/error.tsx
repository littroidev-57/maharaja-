"use client";

import { useEffect } from "react";
import { RoyalButton } from "@/components/ui/RoyalButton";
import { NakasiDivider } from "@/components/ui/NakasiDivider";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Court error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center bg-[#4a0101] text-white">
      <div className="max-w-md w-full p-8 border border-[#cda757]/40 bg-[#2a0000] rounded-3xl shadow-2xl">
        <p className="text-xs font-inria uppercase tracking-[0.3em] text-[#cda757] font-semibold mb-2">
          Notice · Hinweis
        </p>
        <h2 className="text-3xl font-inria font-bold mb-3 text-white">
          An Issue Occurred
        </h2>
        <NakasiDivider color="gold" className="my-4" />
        <p className="font-nunito text-base text-white/80 mb-6 leading-relaxed">
          The requested palace chamber encountered a brief delay. Please try reloading or return home.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <RoyalButton onClick={() => reset()} variant="gold" size="sm" className="rounded-full">
            Try Again
          </RoyalButton>
          <RoyalButton href="/" variant="outline" size="sm" className="rounded-full">
            Return to Home
          </RoyalButton>
        </div>
      </div>
    </div>
  );
}

