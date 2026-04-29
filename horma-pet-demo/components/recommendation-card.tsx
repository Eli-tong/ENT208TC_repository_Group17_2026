import type { CyclePhase } from "@/lib/types";
import { getWhisper } from "@/lib/whisper";

type Props = {
  phase: CyclePhase;
  energy: number;
  onAction: (label: string, delta: number) => void;
};

export function RecommendationCard({ phase, energy, onAction }: Props) {
  const whisper = getWhisper(phase, energy);

  return (
    <aside
      className="rounded-2xl border border-rose-100/80 bg-gradient-to-br from-rose-50/90 to-amber-50/50 p-3 shadow-sm ring-1 ring-rose-100/60 sm:p-4"
      aria-label="Whisper from your cat"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-rose-700/80">{whisper.eyebrow}</p>
      <h2 className="mt-1 text-base font-semibold leading-snug text-stone-800">{whisper.title}</h2>

      <div className="mt-2 space-y-2 text-sm leading-relaxed">
        <p className="text-stone-700">
          <span className="font-medium">Soft paw-tap:</span> {whisper.empathy}
        </p>
        <p className="text-stone-700">
          <span className="font-medium">Today's priority:</span> {whisper.priority}
        </p>
      </div>

      <details className="mt-3 rounded-xl bg-white/50 px-3 py-2 ring-1 ring-stone-200/60">
        <summary className="cursor-pointer select-none text-xs font-semibold uppercase tracking-wide text-stone-600">
          Why this helps + doable steps
        </summary>
        <div className="mt-2 space-y-2 text-sm leading-relaxed">
          <p className="text-stone-600">{whisper.science}</p>
          <ul className="space-y-2 text-stone-700">
            {whisper.actions.map((tip) => (
              <li key={tip} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400/80" aria-hidden />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </details>

      <div className="mt-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-600">Next tiny action</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {whisper.nextSteps.map((cta) => (
            <button
              key={cta.label}
              type="button"
              onClick={() => onAction(cta.label, cta.delta)}
              className="rounded-xl border border-stone-200/80 bg-white/70 px-2.5 py-1.5 text-xs font-semibold text-stone-700 shadow-sm hover:bg-white hover:text-stone-900 active:scale-[0.99]"
            >
              {cta.label}
            </button>
          ))}
        </div>
      </div>

      <details className="mt-3 rounded-xl bg-white/50 px-3 py-2 ring-1 ring-stone-200/60">
        <summary className="cursor-pointer select-none text-xs font-semibold uppercase tracking-wide text-stone-600">
          {whisper.knowledge.title}
        </summary>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">{whisper.knowledge.body}</p>
      </details>

      <details className="mt-3 rounded-xl bg-rose-50/60 px-3 py-2 ring-1 ring-rose-100/80">
        <summary className="cursor-pointer select-none text-xs font-semibold uppercase tracking-wide text-rose-700/80">
          When to get help
        </summary>
        <ul className="mt-2 space-y-1.5 text-sm text-stone-700">
          {whisper.redFlags.map((flag) => (
            <li key={flag} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500/80" aria-hidden />
              <span>{flag}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs leading-relaxed text-stone-500">
          This is general information, not medical advice. If you're worried, trust that feeling and reach out to a
          clinician.
        </p>
      </details>
    </aside>
  );
}
