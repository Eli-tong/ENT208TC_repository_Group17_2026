import type { CyclePhase, PetMood } from "@/lib/types";
import { VirtualCat } from "@/components/virtual-cat";

const moodLabel: Record<PetMood, string> = {
  sick: "Under the weather",
  tired: "Running on low power",
  normal: "Steady and settled",
  energetic: "Bright-eyed and bouncy",
};

const moodWhisper: Record<PetMood, string> = {
  sick: "I’m tuckered out… could we take today gently?",
  tired: "Everything’s a little heavy—snuggles help.",
  normal: "I like this pace. Thanks for checking in.",
  energetic: "I’m prancing! Want to share a silly moment?",
};

/** Short narrator line for the demo — clarifies the band without new logic. */
const moodHint: Record<PetMood, string> = {
  sick: "Low energy: they need softness and patience.",
  tired: "Still low energy: small steps still move the needle.",
  normal: "Mid range: things feel balanced.",
  energetic: "High energy: they’re feeling strong and playful.",
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
};

export function PetCard({ energy, mood, phase }: Props) {
  const pct = Math.min(100, Math.max(0, energy)) / 100;

  return (
    <section
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${moodAccent[mood]} p-6 shadow-md ring-1 ring-white/60 transition-[background] duration-700 ease-out sm:p-8`}
      aria-labelledby="pet-card-title"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/40 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 left-1/4 h-24 w-40 rounded-full bg-rose-200/30 blur-2xl" />

      <div className="relative">
        <p id="pet-card-title" className="text-xs font-semibold uppercase tracking-wider text-stone-600/90">
          Your Horma cat
        </p>
        <p className="mt-1 text-sm leading-relaxed text-stone-600">
          A tiny companion who feels what you feed them—food, gentle movement, and care you show yourself.
        </p>

        <div className="mt-6 rounded-2xl bg-white/55 py-6 ring-1 ring-white/70 transition-shadow duration-500 sm:mt-7 sm:py-8">
          <VirtualCat mood={mood} className="h-40 w-40 sm:h-48 sm:w-48" />
        </div>

        <div className="mt-5 text-center sm:mt-6">
          <p className="text-lg font-semibold tracking-tight text-stone-900 sm:text-xl">{moodLabel[mood]}</p>
          <p className="mx-auto mt-2 max-w-[22rem] text-sm italic leading-relaxed text-stone-800">
            “{moodWhisper[mood]}”
          </p>
          <p className="mx-auto mt-3 max-w-[22rem] text-xs leading-relaxed text-stone-600">
            {moodHint[mood]}
          </p>
          <p className="mt-3 text-sm text-stone-600">
            Today’s cycle rhythm:{" "}
            <span className="font-medium text-stone-800">{phase}</span>
          </p>
        </div>

        <div className="mt-6 sm:mt-8">
          <div className="flex items-baseline justify-between text-sm text-stone-600">
            <span>How bright they feel</span>
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
