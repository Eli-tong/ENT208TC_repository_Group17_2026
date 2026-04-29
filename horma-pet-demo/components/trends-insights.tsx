import Link from "next/link";
import { WeeklyImpactBars } from "@/components/impact-bars";
import { EnergySparkline } from "@/components/sparkline";
import type { TrendsInsights } from "@/lib/trends-insights";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/60 p-3 ring-1 ring-stone-200/70">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-stone-800">{value}</p>
    </div>
  );
}

export function TrendsInsightsPanel({ insights }: { insights: TrendsInsights }) {
  return (
    <aside className="rounded-3xl border border-rose-100/80 bg-gradient-to-br from-rose-50/90 to-amber-50/40 p-5 shadow-sm ring-1 ring-rose-100/60 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-rose-700/75">Whisper from your cat</p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight text-stone-900">Your weekly insight</h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            A gentle recap of what your last 7 days suggest so you can learn your patterns, not chase perfection.
          </p>
          {insights.usedDemoAny ? (
            <p className="mt-2 text-xs leading-relaxed text-stone-500">
              Note: some days are still using demo data. Log a few actions on Home to make this fully personal.
            </p>
          ) : null}
        </div>
        <div className="shrink-0 pt-1">
          <Link
            href="/"
            className="rounded-xl border border-stone-200/90 bg-white/70 px-3 py-2 text-xs font-semibold text-stone-700 shadow-sm hover:bg-white hover:text-stone-900 active:scale-[0.99]"
          >
            Log today
          </Link>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Stat label="Average energy" value={`${insights.avgEnergy} / 100`} />
        <Stat label="Week change" value={`${insights.change >= 0 ? "+" : ""}${insights.change}`} />
      </div>

      <div className="mt-4">
        <EnergySparkline
          points={insights.series}
          highlight={{ bestDate: insights.bestDay.date, toughDate: insights.toughestDay.date }}
        />
      </div>

      <div className="mt-4">
        <WeeklyImpactBars days={insights.impacts} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {insights.cards.slice(0, 4).map((card) => (
          <div key={card.title} className="rounded-2xl bg-white/55 p-4 ring-1 ring-stone-200/60">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-600">{card.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-stone-700">{card.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-white/55 p-4 ring-1 ring-stone-200/60">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-600">Next steps</p>
        <ul className="mt-2 space-y-2 text-sm text-stone-700">
          {insights.suggestions.slice(0, 5).map((suggestion) => (
            <li key={suggestion} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400/80" aria-hidden />
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
