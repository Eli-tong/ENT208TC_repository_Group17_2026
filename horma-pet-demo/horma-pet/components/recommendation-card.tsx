import type { CyclePhase } from "@/lib/types";

const LOW_ENERGY_PHASES: CyclePhase[] = ["Menstrual", "Luteal"];

type Props = {
  phase: CyclePhase;
};

export function RecommendationCard({ phase }: Props) {
  if (!LOW_ENERGY_PHASES.includes(phase)) {
    return null;
  }

  const copy =
    phase === "Menstrual"
      ? {
          title: "Your cat is moving slowly too",
          lead: "This part of the month can feel heavy. Small, cozy wins help both of you—you don’t have to be heroic.",
          tips: ["Warm soup or berries for you both", "A tiny stretch or hallway walk", "Permission to nap without guilt"],
        }
      : {
          title: "They’ll take the gentle version",
          lead: "Energy might dip—your cat mirrors that. Soft habits still read as love.",
          tips: ["Nuts, yogurt, or greens", "Yoga, a walk, or slow breaths", "One kind choice at a time"],
        };

  return (
    <aside
      className="rounded-2xl border border-rose-100/80 bg-gradient-to-br from-rose-50/90 to-amber-50/50 p-4 shadow-sm ring-1 ring-rose-100/60 sm:p-5"
      aria-label="Suggestions for you and your cat"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-rose-700/80">Whisper from your cat</p>
      <h2 className="mt-1.5 text-base font-semibold leading-snug text-stone-800">{copy.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">{copy.lead}</p>
      <ul className="mt-3 space-y-2 text-sm text-stone-700">
        {copy.tips.map((tip) => (
          <li key={tip} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400/80" aria-hidden />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
