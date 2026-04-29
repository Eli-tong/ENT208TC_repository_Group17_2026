"use client";

import { TrendsInsightsPanel } from "@/components/trends-insights";
import { VirtualCat } from "@/components/virtual-cat";
import { useAppState } from "@/hooks/use-app-state";
import { buildTrendDays, buildTrendsInsights } from "@/lib/trends-insights";
import { energyForDay, last7Days, petMoodFromEnergy } from "@/lib/pet-logic";
import type { ActionEvent, DayLog, PetMood } from "@/lib/types";

const demoPlan: Array<{
  phase: DayLog["phase"];
  actions: Array<Pick<ActionEvent, "type" | "label" | "delta">>;
}> = [
  { phase: "Menstrual", actions: [{ type: "task", label: "Meetings / social", delta: -12 }] },
  { phase: "Menstrual", actions: [{ type: "food", label: "Warm ginger tea", delta: 6 }] },
  { phase: "Luteal", actions: [{ type: "food", label: "Berries", delta: 8 }] },
  {
    phase: "Luteal",
    actions: [
      { type: "workout", label: "Stretch + release", delta: 6 },
      { type: "task", label: "Focus session (30 min)", delta: -10 },
    ],
  },
  { phase: "Follicular", actions: [{ type: "workout", label: "Easy walk", delta: 8 }] },
  {
    phase: "Ovulation",
    actions: [
      { type: "food", label: "Omega-3 fish", delta: 10 },
      { type: "workout", label: "Gentle yoga", delta: 10 },
    ],
  },
  { phase: "Ovulation", actions: [{ type: "task", label: "House chore", delta: -8 }] },
];

function demoLog(date: string, idx: number): DayLog {
  const item = demoPlan[idx] ?? demoPlan[demoPlan.length - 1];
  return {
    date,
    phase: item.phase,
    actions: item.actions.map((action, actionIndex) => ({
      id: `demo_${date}_${idx}_${actionIndex}`,
      at: new Date().toISOString(),
      ...action,
    })),
  };
}

const moodLabel: Record<PetMood, string> = {
  sick: "Under the weather",
  tired: "Running low",
  normal: "Steady and settled",
  energetic: "Bright and bouncy",
};

const moodGlow: Record<PetMood, string> = {
  sick: "from-rose-200/70 via-stone-100/50 to-rose-50/20",
  tired: "from-violet-200/60 via-rose-100/50 to-orange-50/20",
  normal: "from-amber-200/60 via-orange-100/45 to-yellow-50/20",
  energetic: "from-emerald-200/60 via-teal-100/45 to-cyan-50/20",
};

function iconForAction(type: ActionEvent["type"]): string {
  if (type === "food") return "🥗";
  if (type === "workout") return "🧘";
  if (type === "care") return "🐾";
  return "⚡️";
}

function labelForDelta(delta: number): { text: string; cls: string } {
  if (delta >= 0) return { text: `+${delta}`, cls: "text-emerald-700 bg-emerald-50 ring-emerald-200/70" };
  return { text: `${delta}`, cls: "text-rose-700 bg-rose-50 ring-rose-200/70" };
}

export default function TrendsPage() {
  const { state } = useAppState();

  if (!state) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center px-4 py-10 text-center">
        <p className="text-sm font-medium text-stone-500">Finding your cat...</p>
      </div>
    );
  }

  const days = last7Days();
  const trendDays = buildTrendDays({ days, stateLogs: state.logs, demoLog });
  const insights = buildTrendsInsights(trendDays);

  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-3xl bg-gradient-to-b from-rose-50/90 via-orange-50/35 to-amber-50/20 px-5 py-6 ring-1 ring-rose-100/50 sm:px-6 sm:py-7">
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-[1.65rem]">
          Your cat's 7-day rhythm
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          Each day is a simple story: cycle phase sets a baseline, then food, comfort, movement, and tasks shape the
          result. Over a week, you can see what helps your cat (and you) feel steadier.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-stone-500">
          Tip: if you haven't logged anything yet, we show a sample week so the pattern is easy to demo.
        </p>
      </div>

      <TrendsInsightsPanel insights={insights} />

      <section className="flex flex-col gap-3">
        {trendDays.map(({ date, log, energy }, idx) => {
          const mood = petMoodFromEnergy(energy);
          const pct = Math.min(100, Math.max(0, energy)) / 100;
          const actions = (log.actions ?? []).slice().sort((a, b) => a.at.localeCompare(b.at));

          return (
            <article key={date} className="rounded-2xl border border-stone-200/90 bg-white/70 p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className={`rounded-2xl bg-gradient-to-br ${moodGlow[mood]} p-2 ring-1 ring-white/60`}>
                  <VirtualCat mood={mood} className="h-24 w-24" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-mono text-xs text-stone-600">{date}</span>
                    <span className="text-xs font-semibold text-stone-700">{moodLabel[mood]}</span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-600">
                    <span>
                      Phase: <span className="font-medium text-stone-800">{log.phase}</span>
                    </span>
                    <span className="text-xs text-stone-500">
                      {actions.length ? `${actions.length} events logged` : `No events logged${idx < 6 ? " (demo data)" : ""}`}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-baseline justify-between text-xs text-stone-600">
                      <span>Cat energy</span>
                      <span className="font-tabular-nums font-semibold text-stone-800">
                        {energy}
                        <span className="font-normal text-stone-500"> / 100</span>
                      </span>
                    </div>
                    <div
                      className="mt-1 h-2 overflow-hidden rounded-full bg-stone-100 ring-1 ring-stone-200/60"
                      role="meter"
                      aria-valuenow={energy}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Cat energy for ${date}`}
                    >
                      <div
                        className={`h-full rounded-full bg-gradient-to-r transition-[width] duration-300 ease-out ${
                          mood === "sick"
                            ? "from-rose-400 to-stone-400"
                            : mood === "tired"
                              ? "from-violet-400 to-amber-300"
                              : mood === "normal"
                                ? "from-amber-300 to-orange-300"
                                : "from-emerald-400 to-teal-300"
                        }`}
                        style={{ width: `${pct * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-600">What happened</p>
                    {actions.length === 0 ? (
                      <p className="text-sm text-stone-500">No events yet-log a food, movement, task, or care action.</p>
                    ) : (
                      <ul className="space-y-2">
                        {actions.slice(-4).map((action) => {
                          const delta = labelForDelta(action.delta);
                          return (
                            <li
                              key={action.id}
                              className="flex items-start justify-between gap-3 rounded-xl bg-white/60 p-2 ring-1 ring-stone-200/70"
                            >
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-stone-800">
                                  <span className="mr-2" aria-hidden>
                                    {iconForAction(action.type)}
                                  </span>
                                  {action.label}
                                </p>
                                <p className="mt-0.5 text-xs text-stone-500">{action.type === "care" ? "care" : action.type}</p>
                              </div>
                              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${delta.cls}`}>
                                {delta.text}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
