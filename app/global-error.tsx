"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical root error caught:", error);
  }, [error]);

  return (
    <html lang="de">
      <body className="bg-[#4a0101] text-white flex items-center justify-center min-h-screen p-4 m-0 font-serif">
        <div className="max-w-md w-full p-8 border border-[#cda757]/40 bg-[#2a0000] rounded-3xl text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-3 text-[#cda757]">
            Application Anomaly
          </h2>
          <p className="text-white/80 mb-6 text-sm leading-relaxed">
            A critical system exception was encountered. Click below to reload the application.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-[#cda757] text-[#4a0101] font-bold rounded-full text-xs uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Reload Court
          </button>
        </div>
      </body>
    </html>
  );
}

