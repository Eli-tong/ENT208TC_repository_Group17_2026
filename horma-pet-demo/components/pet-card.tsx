import type { CyclePhase, PetMood } from "@/lib/types";
import { VirtualCat } from "@/components/virtual-cat";

const moodLabel: Record<PetMood, string> = {
  sick: "Needing a little comfort",
  tired: "Low on energy",
  normal: "Steady and calm",
  energetic: "Bright and playful",
};

const moodWhisper: Record<PetMood, string> = {
  sick: "Could we keep close and make today gentle?",
  tired: "I’m cozy but quiet—little kindnesses help.",
  normal: "This feels like us. I’m glad you’re here.",
  energetic: "I’ve got a spring in my step—stay with me?",
};

const moodAccent: Record<PetMood, string> = {
  sick: "from-rose-200/70 via-stone-200/80 to-stone-100",
  tired: "from-violet-200/65 via-rose-100/70 to-orange-50/60",
  normal: "from-amber-100/90 via-orange-50/80 to-yellow-50/50",
  energetic: "from-emerald-200/70 via-teal-100/80 to-cyan-50/70",
};

type Props = {
  energy: number;
  mood: PetMood;
  phase: CyclePhase;
  /** Short post-log visual (image only; logic unchanged). */
  showSoothed?: boolean;
};

export function PetCard({ energy, mood, phase, showSoothed = false }: Props) {
  const pct = Math.min(100, Math.max(0, energy)) / 100;

  return (
    <section
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${moodAccent[mood]} p-4 shadow-md ring-1 ring-white/60 transition-[background] duration-700 ease-out sm:p-5`}
      aria-labelledby="pet-card-title"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/40 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 left-1/4 h-24 w-40 rounded-full bg-rose-200/30 blur-2xl" />

      <div className="relative">
        <p id="pet-card-title" className="text-xs font-semibold uppercase tracking-wider text-stone-600/90">
          Your Horma cat
        </p>
        <p className="mt-0.5 text-xs leading-snug text-stone-600 sm:text-[13px]">
          Their look matches today’s rhythm and the care you log.
        </p>

        <div className="mt-4 rounded-xl bg-white/55 py-3 ring-1 ring-white/70 transition-shadow duration-500 sm:py-4">
          <VirtualCat mood={mood} showSoothed={showSoothed} className="h-44 w-44 sm:h-52 sm:w-52" />
        </div>

        <div className="mt-3 text-center sm:mt-4">
          <p className="text-base font-semibold tracking-tight text-stone-900 sm:text-lg">{moodLabel[mood]}</p>
          <p className="mx-auto mt-1.5 max-w-[20rem] text-sm italic leading-snug text-stone-800">
            “{moodWhisper[mood]}”
          </p>
          <p className="mt-2 text-xs text-stone-600 sm:text-sm">
            Cycle today: <span className="font-medium text-stone-800">{phase}</span>
          </p>
        </div>

        <div className="mt-4">
          <div className="flex items-baseline justify-between text-sm text-stone-600">
            <span>Cat energy</span>
            <span className="font-tabular-nums font-medium text-stone-800">
              {energy}
              <span className="font-normal text-stone-500"> / 100</span>
            </span>
          </div>
          <div
            className="mt-2 h-3 overflow-hidden rounded-full bg-white/70 ring-1 ring-stone-200/60"
            role="meter"
            aria-valuenow={energy}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Cat companion brightness"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400 transition-[width] duration-300 ease-out"
              style={{ width: `${pct * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
