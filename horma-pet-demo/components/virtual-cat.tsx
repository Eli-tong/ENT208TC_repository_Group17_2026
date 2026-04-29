import Image from "next/image";
import type { PetMood } from "@/lib/types";

const SRC = {
  low: "/cat/cat-low.png",
  mid: "/cat/cat-mid.png",
  high: "/cat/cat-high.png",
  soothed: "/cat/cat-soothed.png",
} as const;

function imageForMood(mood: PetMood): string {
  if (mood === "sick" || mood === "tired") return SRC.low;
  if (mood === "normal") return SRC.mid;
  return SRC.high;
}

type Props = {
  mood: PetMood;
  className?: string;
  /** Short UI-only feedback after logging care — does not change pet logic. */
  showSoothed?: boolean;
};

/** Renders custom cat art from `public/cat` — low / mid / high by mood, optional soothed flash. */
export function VirtualCat({ mood, className = "", showSoothed = false }: Props) {
  const src = showSoothed ? SRC.soothed : imageForMood(mood);
  const label = showSoothed ? "Cat soothed after care" : `Cat — ${mood}`;

  return (
    <div className={`relative mx-auto ${className}`}>
      <Image
        src={src}
        alt={label}
        fill
        sizes="(max-width: 640px) 11rem, 13rem"
        className="object-contain object-center drop-shadow-sm transition-opacity duration-200"
      />
    </div>
  );
}
