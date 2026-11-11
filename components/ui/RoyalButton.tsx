"use client";

import Link from "next/link";
import { clsx } from "clsx";

type RoyalButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "gold" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function RoyalButton({
  children,
  href,
  onClick,
  variant = "gold",
  size = "md",
  external = false,
  className,
  type = "button",
  disabled,
}: RoyalButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center font-inria tracking-widest uppercase transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f7b800] font-bold rounded-full overflow-hidden select-none";

  const variants = {
    // Primary #f7b800 button: stays rich #f7b800, with silky light sweep shimmer & spring scale/glow on hover
    gold: "bg-[#f7b800] text-[#4a0101] border-2 border-[#f7b800] shadow-[0_4px_18px_rgba(247,184,0,0.35)] hover:shadow-[0_8px_30px_rgba(247,184,0,0.6)] hover:scale-[1.04] active:scale-[0.98] before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent before:transition-transform before:duration-700 before:ease-out",
    // Outline variant with gold border and glowing sweep
    outline:
      "border-2 border-[#f7b800] text-[#f7b800] bg-transparent hover:scale-[1.04] active:scale-[0.98] hover:shadow-[0_0_22px_rgba(247,184,0,0.45)] backdrop-blur-sm before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-[#f7b800]/25 before:to-transparent before:transition-transform before:duration-700 before:ease-out",
    white:
      "bg-white text-[#4a0101] border-2 border-white hover:scale-[1.04] active:scale-[0.98] shadow-lg hover:shadow-white/35 before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-black/10 before:to-transparent before:transition-transform before:duration-700 before:ease-out",
    ghost:
      "text-[#f7b800] hover:scale-105 active:scale-95 underline underline-offset-4 transition-transform",
  };

  const sizes = {
    sm: "px-5 py-2 text-xs",
    md: "px-7 py-3 text-sm",
    lg: "px-9 py-3.5 text-sm sm:text-base",
  };

  const cls = clsx(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(cls, disabled && "opacity-50 cursor-not-allowed")}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  );
}
