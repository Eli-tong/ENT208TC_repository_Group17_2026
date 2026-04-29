import type { ActionEvent, CyclePhase } from "@/lib/types";

type ImpactDay = {
  date: string;
  phase: CyclePhase;
  totals: Record<ActionEvent["type"], number>;
  net: number;
};

function fmtShortDate(date: string): string {
  return `${date.slice(5, 7)}/${date.slice(8, 10)}`;
}

function phaseDot(phase: CyclePhase): string {
  if (phase === "Menstrual") return "bg-rose-400";
  if (phase === "Follicular") return "bg-amber-400";
  if (phase === "Ovulation") return "bg-emerald-400";
  return "bg-violet-400";
}

const TYPE_STYLE: Record<ActionEvent["type"], { label: string; cls: string }> = {
  food: { label: "Food", cls: "bg-amber-400/90" },
  workout: { label: "Movement", cls: "bg-emerald-400/90" },
  care: { label: "Care", cls: "bg-sky-400/90" },
  task: { label: "Tasks", cls: "bg-rose-400/90" },
};

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

function titleForDay(day: ImpactDay): string {
  const totals = day.totals;
  return [
    `Date: ${day.date}`,
    `Phase: ${day.phase}`,
    `Food: ${totals.food >= 0 ? "+" : ""}${Math.round(totals.food)}`,
    `Movement: ${totals.workout >= 0 ? "+" : ""}${Math.round(totals.workout)}`,
    `Care: ${totals.care >= 0 ? "+" : ""}${Math.round(totals.care)}`,
    `Tasks: ${totals.task >= 0 ? "+" : ""}${Math.round(totals.task)}`,
    `Net: ${day.net >= 0 ? "+" : ""}${day.net}`,
  ].join("\n");
}

export function WeeklyImpactBars({ days }: { days: ImpactDay[] }) {
  const maxAbs = Math.max(10, ...days.map((day) => Math.abs(day.net)));

  return (
    <div className="rounded-2xl bg-white/55 p-4 ring-1 ring-stone-200/60">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-600">Weekly impact (what changed energy)</p>
        <p className="text-[11px] font-medium text-stone-500">Net delta per day</p>
      </div>

      <div className="mt-2 rounded-xl bg-gradient-to-b from-white/60 to-stone-50/40 p-3 ring-1 ring-stone-200/50">
        <div className="relative grid grid-cols-7 gap-2">
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-stone-200/80" aria-hidden />

          {days.map((day) => {
            const scale = 44 / maxAbs;
            const netPx = clamp(Math.abs(day.net) * scale, 2, 44);
            const positive = [
              { type: "food" as const, v: Math.max(0, day.totals.food) },
              { type: "workout" as const, v: Math.max(0, day.totals.workout) },
              { type: "care" as const, v: Math.max(0, day.totals.care) },
            ].filter((item) => item.v > 0);
            const negative = [{ type: "task" as const, v: Math.min(0, day.totals.task) }].filter((item) => item.v < 0);

            const posTotal = positive.reduce((sum, item) => sum + item.v, 0);
            const negTotal = Math.abs(negative.reduce((sum, item) => sum + item.v, 0));
            const posPxTotal = clamp(posTotal * scale, 0, 44);
            const negPxTotal = clamp(negTotal * scale, 0, 44);

            return (
              <div key={day.date} className="flex flex-col items-center gap-2">
                <div className="relative h-[96px] w-full max-w-[44px]" title={titleForDay(day)} aria-label={`Impact for ${day.date}`}>
                  <div className="absolute bottom-1/2 left-0 right-0 flex flex-col-reverse gap-0.5">
                    {posTotal === 0 ? (
                      <div className="h-[2px] rounded-full bg-stone-200/60" />
                    ) : (
                      positive.map((item) => {
                        const height = clamp((item.v / posTotal) * posPxTotal, 2, 44);
                        return <div key={item.type} className={`rounded-md ${TYPE_STYLE[item.type].cls}`} style={{ height: `${height}px` }} />;
                      })
                    )}
                  </div>

                  <div className="absolute top-1/2 left-0 right-0 flex flex-col gap-0.5">
                    {negTotal === 0 ? (
                      <div className="h-[2px] rounded-full bg-stone-200/60" />
                    ) : (
                      negative.map((item) => {
                        const height = clamp((Math.abs(item.v) / negTotal) * negPxTotal, 2, 44);
                        return <div key={item.type} className={`rounded-md ${TYPE_STYLE[item.type].cls}`} style={{ height: `${height}px` }} />;
                      })
                    )}
                  </div>

                  <div
                    className="pointer-events-none absolute left-1/2 w-2 -translate-x-1/2 rounded-full bg-stone-800/20"
                    style={{
                      top: day.net >= 0 ? `calc(50% - ${netPx}px)` : "50%",
                      height: `${netPx}px`,
                      opacity: 0.45,
                    }}
                    aria-hidden
                  />
                </div>

                <div className="flex items-center gap-1 text-[10px] text-stone-500">
                  <span className={`h-2 w-2 rounded-full ${phaseDot(day.phase)}`} aria-hidden />
                  <span className="tabular-nums">{fmtShortDate(day.date)}</span>
                </div>

                <div className={`text-[10px] font-semibold tabular-nums ${day.net >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                  {day.net >= 0 ? "+" : ""}
                  {day.net}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-stone-500">
        {(Object.keys(TYPE_STYLE) as Array<ActionEvent["type"]>).map((key) => (
          <span key={key} className="inline-flex items-center gap-1">
            <span className={`h-2.5 w-2.5 rounded-sm ${TYPE_STYLE[key].cls}`} aria-hidden />
            {TYPE_STYLE[key].label}
          </span>
        ))}
        <span className="ml-auto hidden sm:inline text-[11px] text-stone-500">Tip: hover a bar for details</span>
      </div>
    </div>
  );
}
