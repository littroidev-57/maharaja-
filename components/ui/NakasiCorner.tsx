"use client";

import Image from "next/image";
import { clsx } from "clsx";

type NakasiCornerProps = {
  corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  side?: "left" | "right";
  position?: "top" | "bottom";
  color?: "gold" | "maroon";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  opacity?: number;
};

export function NakasiCorner({
  corner,
  side = "left",
  position = "top",
  size = "sm",
  className = "",
}: NakasiCornerProps) {
  const effectiveCorner =
    corner ||
    (position === "bottom"
      ? side === "right"
        ? "bottom-right"
        : "bottom-left"
      : side === "right"
      ? "top-right"
      : "top-left");

  // Refined, tasteful sizing so it never blocks UI elements or text
  const sizes = {
    xs: 36,
    sm: 52,
    md: 76,
    lg: 104,
  };

  const dim = sizes[size] || sizes.sm;

  const transformClasses = {
    "top-left": "",
    "top-right": "-scale-x-100",
    "bottom-left": "-scale-y-100",
    "bottom-right": "-scale-x-100 -scale-y-100",
  }[effectiveCorner];

  return (
    <div
      className={clsx(
        "relative select-none pointer-events-none transition-all duration-300 z-10",
        transformClasses,
        className
      )}
      style={{
        width: dim,
        height: dim,
      }}
      aria-hidden="true"
    >
      <Image
        src="/images/nakasi-corner-gold.png"
        alt=""
        width={dim * 2}
        height={dim * 2}
        className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(205,167,87,0.4)]"
      />
    </div>
  );
}

/**
 * An ornate royal Punjabi / Mughal framed container
 * Main background: #4a0101 with border: #cda757
 */
export function NakasiCard({
  children,
  className = "",
  size = "sm",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "xs" | "sm" | "md";
}) {
  return (
    <div
      className={clsx(
        "relative border border-[#cda757]/40 bg-[#4a0101] text-white p-6 md:p-8 overflow-hidden shadow-2xl",
        className
      )}
    >
      <div className="absolute top-1.5 left-1.5 pointer-events-none">
        <NakasiCorner corner="top-left" size={size} className="opacity-80" />
      </div>
      <div className="absolute top-1.5 right-1.5 pointer-events-none">
        <NakasiCorner corner="top-right" size={size} className="opacity-80" />
      </div>
      <div className="absolute bottom-1.5 left-1.5 pointer-events-none">
        <NakasiCorner corner="bottom-left" size={size} className="opacity-80" />
      </div>
      <div className="absolute bottom-1.5 right-1.5 pointer-events-none">
        <NakasiCorner corner="bottom-right" size={size} className="opacity-80" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
