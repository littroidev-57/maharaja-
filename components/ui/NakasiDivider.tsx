"use client";

type NakasiDividerProps = {
  color?: "gold" | "light" | "maroon";
  className?: string;
  withLotus?: boolean;
};

export function NakasiDivider({
  color = "gold",
  className = "",
  withLotus = true,
}: NakasiDividerProps) {
  const c =
    color === "gold"
      ? "#cda757"
      : color === "maroon"
      ? "#4a0101"
      : "#dfc384";

  return (
    <div className={`flex items-center justify-center gap-3 my-5 ${className}`}>
      <div
        className="flex-1 max-w-[120px] sm:max-w-[180px] h-px"
        style={{ background: `linear-gradient(to right, transparent, ${c})` }}
      />
      {withLotus ? (
        <svg width="36" height="18" viewBox="0 0 36 18" fill="none" aria-hidden className="opacity-90">
          <circle cx="18" cy="9" r="3" fill={c} />
          <ellipse cx="18" cy="4" rx="2" ry="3.5" fill={c} fillOpacity="0.75" />
          <ellipse cx="18" cy="14" rx="2" ry="3.5" fill={c} fillOpacity="0.75" />
          <ellipse cx="13" cy="9" rx="3.5" ry="2" fill={c} fillOpacity="0.75" />
          <ellipse cx="23" cy="9" rx="3.5" ry="2" fill={c} fillOpacity="0.75" />
          <circle cx="6" cy="9" r="1.5" fill={c} fillOpacity="0.5" />
          <circle cx="30" cy="9" r="1.5" fill={c} fillOpacity="0.5" />
        </svg>
      ) : (
        <svg width="10" height="10" viewBox="0 0 24 24" fill={c} aria-hidden="true" className="opacity-90">
          <path d="M12 2L22 12L12 22L2 12Z" />
        </svg>
      )}
      <div
        className="flex-1 max-w-[120px] sm:max-w-[180px] h-px"
        style={{ background: `linear-gradient(to left, transparent, ${c})` }}
      />
    </div>
  );
}
