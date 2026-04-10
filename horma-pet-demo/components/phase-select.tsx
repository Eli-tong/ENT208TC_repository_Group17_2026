import type { CyclePhase } from "@/lib/types";

const PHASES: CyclePhase[] = ["Menstrual", "Follicular", "Ovulation", "Luteal"];

type Props = {
  value: CyclePhase;
  onChange: (phase: CyclePhase) => void;
};

export function PhaseSelect({ value, onChange }: Props) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium text-stone-700">Where are you in your cycle?</span>
      <span className="text-xs leading-relaxed text-stone-500">
        Your cat picks up the baseline vibe for today—switch phases anytime in this demo.
      </span>
      <select
        className="rounded-xl border border-stone-200/90 bg-white/90 px-4 py-3 text-stone-900 shadow-sm outline-none ring-rose-200/50 transition focus:border-rose-300 focus:ring-2"
        value={value}
        onChange={(e) => onChange(e.target.value as CyclePhase)}
      >
        {PHASES.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </label>
  );
}
