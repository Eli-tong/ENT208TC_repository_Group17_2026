import { useMemo, useState } from "react";

type Props = {
  onFood: (label: string, delta: number) => void;
  onWorkout: (label: string, delta: number) => void;
  onTask: (label: string, delta: number) => void;
  onCare: (label: string, delta: number) => void;
};

const FOOD_OPTIONS = [
  { emoji: "🐟", label: "Omega-3 fish", detail: "Anti-inflammatory support", delta: 10 },
  { emoji: "🫐", label: "Berries", detail: "Antioxidants + steady energy", delta: 8 },
  { emoji: "🍫", label: "Dark chocolate", detail: "Magnesium-friendly comfort", delta: 7 },
  { emoji: "🥬", label: "Leafy greens", detail: "Iron + folate boost", delta: 9 },
  { emoji: "🫖", label: "Warm ginger tea", detail: "Cozy, soothing warmth", delta: 6 },
] as const;

const WORKOUT_OPTIONS = [
  { emoji: "🧘", label: "Gentle yoga", detail: "Ease cramps, soften tension", delta: 10 },
  { emoji: "🤸", label: "Stretch + release", detail: "Low effort, high relief", delta: 6 },
  { emoji: "🚶", label: "Easy walk", detail: "Light movement + mood lift", delta: 8 },
  { emoji: "🧍", label: "Breathwork", detail: "Nervous system reset", delta: 5 },
  { emoji: "🧠", label: "Meditation", detail: "Quiet + calm recovery", delta: 5 },
  { emoji: "🏋️", label: "Light strength", detail: "Gentle strength check-in", delta: 7 },
] as const;

const TASK_OPTIONS = [
  { emoji: "🧑‍💻", label: "Focus session (30 min)", detail: "Spent energy to get it done", delta: -10 },
  { emoji: "🧹", label: "House chore", detail: "A small but real drain", delta: -8 },
  { emoji: "🗓️", label: "Meetings / social", detail: "Emotional + mental cost", delta: -12 },
] as const;

const CARE_OPTIONS = [
  { emoji: "🔥", label: "Heat pad (15 min)", detail: "Cozy warmth for cramps or stress", delta: 5 },
  { emoji: "💧", label: "Drink water (200~300ml)", detail: "Quick hydration for steadier energy", delta: 3 },
  { emoji: "🌬️", label: "Breathing (60 sec)", detail: "Quick nervous system downshift", delta: 4 },
] as const;

function ActionButton({
  emoji,
  title,
  detail,
  delta,
  tone,
  onClick,
}: {
  emoji: string;
  title: string;
  detail: string;
  delta: number;
  tone: "rose" | "amber" | "orange" | "red";
  onClick: () => void;
}) {
  const toneClass =
    tone === "rose"
      ? "border-rose-300/90 ring-rose-100/50 hover:border-rose-400 hover:bg-rose-50/40"
      : tone === "amber"
        ? "border-amber-300/90 ring-amber-100/50 hover:border-amber-400 hover:bg-amber-50/50"
        : tone === "orange"
          ? "border-orange-300/90 ring-orange-100/50 hover:border-orange-400 hover:bg-orange-50/40"
          : "border-red-300/90 ring-red-100/50 hover:border-red-400 hover:bg-red-50/40";

  const deltaClass = delta >= 0 ? "text-emerald-800/90" : "text-rose-800/90";
  const deltaLabel = delta >= 0 ? `+${delta}` : `${delta}`;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group rounded-2xl border bg-white/90 px-3 py-3 text-left shadow-sm ring-1 transition hover:shadow-md active:scale-[0.99] ${toneClass}`}
    >
      <span className="flex items-start gap-3">
        <span className="mt-0.5 text-base leading-none" aria-hidden>
          {emoji}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold leading-snug text-stone-800">{title}</span>
          <span className="mt-0.5 block text-xs leading-snug text-stone-600">{detail}</span>
          <span className={`mt-1 inline-flex items-center text-xs font-semibold ${deltaClass}`}>{deltaLabel} energy</span>
        </span>
      </span>
    </button>
  );
}

function CategoryCard({
  emoji,
  title,
  detail,
  countLabel,
  tone,
  onClick,
}: {
  emoji: string;
  title: string;
  detail: string;
  countLabel: string;
  tone: "rose" | "amber" | "orange" | "red";
  onClick: () => void;
}) {
  const toneClass =
    tone === "rose"
      ? "border-rose-300/90 ring-rose-100/50 bg-gradient-to-br from-rose-50/70 via-white/70 to-amber-50/35 hover:border-rose-400 hover:from-rose-50/85"
      : tone === "amber"
        ? "border-amber-300/90 ring-amber-100/50 bg-gradient-to-br from-amber-50/70 via-white/70 to-orange-50/30 hover:border-amber-400 hover:from-amber-50/85"
        : tone === "orange"
          ? "border-orange-300/90 ring-orange-100/50 bg-gradient-to-br from-orange-50/70 via-white/70 to-rose-50/25 hover:border-orange-400 hover:from-orange-50/85"
          : "border-red-300/90 ring-red-100/50 bg-gradient-to-br from-red-50/70 via-white/70 to-amber-50/30 hover:border-red-400 hover:from-red-50/85";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group rounded-2xl border px-4 py-4 text-left shadow-sm ring-1 transition hover:shadow-md active:scale-[0.99] ${toneClass}`}
    >
      <span className="inline-flex items-center gap-2">
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/70 ring-1 ring-black/5"
          aria-hidden
        >
          {emoji}
        </span>
        <span className="block text-sm font-semibold text-stone-800">{title}</span>
      </span>
      <span className="mt-1 block text-xs leading-relaxed text-stone-600">{detail}</span>
      <span className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-stone-700">
        <span className="rounded-full bg-stone-900/5 px-2 py-1 ring-1 ring-stone-900/10">{countLabel}</span>
        <span className="text-stone-500 transition group-hover:text-stone-700">Tap to choose</span>
      </span>
    </button>
  );
}

export function ActionLogger({ onFood, onWorkout, onTask, onCare }: Props) {
  const [activeCategory, setActiveCategory] = useState<"care" | "food" | "movement" | "tasks" | null>(null);

  const categories = useMemo(
    () =>
      [
        {
          key: "care" as const,
          eyebrow: "Quick comfort",
          title: "Quick comfort",
          detail: "Small soothing actions with fast payoff.",
          cardTone: "rose" as const,
          buttonTone: "rose" as const,
          options: CARE_OPTIONS,
          onPick: onCare,
        },
        {
          key: "food" as const,
          eyebrow: "Anti-inflammatory foods",
          title: "Foods",
          detail: "Gentle nutrition to support energy + mood.",
          cardTone: "amber" as const,
          buttonTone: "amber" as const,
          options: FOOD_OPTIONS,
          onPick: onFood,
        },
        {
          key: "movement" as const,
          eyebrow: "Movement",
          title: "Movement",
          detail: "Low-intensity options that still help.",
          cardTone: "orange" as const,
          buttonTone: "orange" as const,
          options: WORKOUT_OPTIONS,
          onPick: onWorkout,
        },
        {
          key: "tasks" as const,
          eyebrow: "Spend energy (tasks)",
          title: "Tasks",
          detail: "Log effort so energy feels accounted for.",
          cardTone: "red" as const,
          buttonTone: "red" as const,
          options: TASK_OPTIONS,
          onPick: onTask,
        },
      ] as const,
    [onCare, onFood, onTask, onWorkout],
  );

  const active = activeCategory ? categories.find((c) => c.key === activeCategory) : null;
  const activeShellClass = !active
    ? ""
    : active.cardTone === "rose"
      ? "border-rose-300/80 ring-rose-100/60 bg-gradient-to-br from-rose-50/85 via-white/60 to-amber-50/40"
      : active.cardTone === "amber"
        ? "border-amber-300/80 ring-amber-100/60 bg-gradient-to-br from-amber-50/80 via-white/60 to-orange-50/35"
        : active.cardTone === "orange"
          ? "border-orange-300/80 ring-orange-100/60 bg-gradient-to-br from-orange-50/80 via-white/60 to-rose-50/30"
          : "border-red-300/80 ring-red-100/60 bg-gradient-to-br from-red-50/80 via-white/60 to-amber-50/35";

  return (
    <div className="space-y-3">
      {active ? (
        <div className={`rounded-2xl border p-3 shadow-sm ring-1 sm:p-4 ${activeShellClass}`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-600">{active.eyebrow}</p>
              <p className="mt-1 text-sm font-semibold text-stone-900">{active.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-stone-600">{active.detail}</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className="shrink-0 rounded-xl border border-stone-200/90 bg-white/70 px-3 py-2 text-xs font-semibold text-stone-700 shadow-sm hover:bg-white hover:text-stone-900 active:scale-[0.99]"
            >
              Back
            </button>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {active.options.map((option) => (
              <ActionButton
                key={option.label}
                emoji={option.emoji}
                title={option.label}
                detail={option.detail}
                delta={option.delta}
                tone={active.buttonTone}
                onClick={() => active.onPick(option.label, option.delta)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.key}
              emoji={
                cat.key === "care" ? "🔥" : cat.key === "food" ? "🥗" : cat.key === "movement" ? "🧘" : "🧑‍💻"
              }
              title={cat.title}
              detail={cat.detail}
              countLabel={`${cat.options.length} options`}
              tone={cat.cardTone}
              onClick={() => setActiveCategory(cat.key)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
