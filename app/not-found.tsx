import Link from "next/link";
import { RoyalButton } from "@/components/ui/RoyalButton";
import { NakasiDivider } from "@/components/ui/NakasiDivider";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center bg-[#4a0101] text-white">
      <div className="max-w-md w-full p-8 border border-[#cda757]/40 bg-[#2a0000] rounded-3xl shadow-2xl">
        <p className="text-xs font-inria uppercase tracking-[0.3em] text-[#cda757] font-semibold mb-2">
          404 · Page Not Found
        </p>
        <h1 className="text-3xl sm:text-4xl font-inria font-bold mb-3 text-white">
          Chamber Not Found
        </h1>
        <NakasiDivider color="gold" className="my-4" />
        <p className="font-nunito text-base text-white/80 mb-6 leading-relaxed">
          The requested page does not exist or has been moved within the palace.
        </p>
        <RoyalButton href="/" variant="gold" size="sm" className="rounded-full">
          Return to Grand Court
        </RoyalButton>
      </div>
    </div>
  );
}

