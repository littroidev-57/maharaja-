"use client";

import React from "react";
import { VegIcon, NonVegIcon, VeganIcon } from "@/components/ui/Icons";

export type DietaryType = "vegan" | "veg" | "non-veg";

interface DietaryBadgeProps {
  type: DietaryType;
  theme?: "dark" | "light";
  showLabel?: boolean;
  lang?: "de" | "en";
  className?: string;
  size?: number;
}

export function DietaryBadge({
  type,
  theme = "dark",
  showLabel = false,
  lang = "de",
  className = "",
  size = 18,
}: DietaryBadgeProps) {
  const isDark = theme === "dark";

  const getTitle = () => {
    if (type === "vegan") {
      return lang === "de" ? "Vegan (Rein pflanzlich)" : "Vegan (100% Plant-based)";
    }
    if (type === "veg") {
      return lang === "de" ? "Vegetarisch" : "Vegetarian";
    }
    return lang === "de"
      ? "Nicht-Vegetarisch (Fleisch / Geflügel / Fisch)"
      : "Non-Vegetarian (Meat / Poultry / Seafood)";
  };

  const getLabel = () => {
    if (type === "vegan") return "Vegan";
    if (type === "veg") return lang === "de" ? "Vegetarisch" : "Veg";
    return lang === "de" ? "Nicht-Veg" : "Non-Veg";
  };

  // If ONLY icon is requested (default)
  if (!showLabel) {
    return (
      <span
        className={`inline-flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-110 cursor-help ${className}`}
        title={getTitle()}
        aria-label={getTitle()}
      >
        {type === "vegan" && <VeganIcon size={size} className="w-[18px] h-[18px]" />}
        {type === "veg" && <VegIcon size={size} className="w-[18px] h-[18px]" />}
        {type === "non-veg" && <NonVegIcon size={size} className="w-[18px] h-[18px]" />}
      </span>
    );
  }

  // With label (if explicitly requested)
  if (type === "vegan") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold font-inria tracking-wider uppercase border transition-all ${
          isDark
            ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/60 shadow-sm"
            : "bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm"
        } ${className}`}
        title={getTitle()}
      >
        <VeganIcon size={14} className="w-3.5 h-3.5 flex-shrink-0" />
        <span>{getLabel()}</span>
      </span>
    );
  }

  if (type === "veg") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold font-inria tracking-wider uppercase border transition-all ${
          isDark
            ? "bg-green-950/80 text-green-300 border-green-500/60 shadow-sm"
            : "bg-green-50 text-green-800 border-green-300 shadow-sm"
        } ${className}`}
        title={getTitle()}
      >
        <VegIcon size={14} className="w-3.5 h-3.5 flex-shrink-0" />
        <span>{getLabel()}</span>
      </span>
    );
  }

  // Non-Veg with label
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold font-inria tracking-wider uppercase border transition-all ${
        isDark
          ? "bg-red-950/80 text-red-300 border-red-500/60 shadow-sm"
          : "bg-red-50 text-red-800 border-red-300 shadow-sm"
      } ${className}`}
      title={getTitle()}
    >
      <NonVegIcon size={14} className="w-3.5 h-3.5 flex-shrink-0" />
      <span>{getLabel()}</span>
    </span>
  );
}
