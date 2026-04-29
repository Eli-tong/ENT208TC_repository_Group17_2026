import type { CyclePhase } from "@/lib/types";

type Point = { date: string; energy: number; phase: CyclePhase };

function phaseColor(phase: CyclePhase): string {
  if (phase === "Menstrual") return "#fb7185";
  if (phase === "Follicular") return "#f59e0b";
  if (phase === "Ovulation") return "#10b981";
  return "#a78bfa";
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

function fmtShortDate(date: string): string {
  return `${date.slice(5, 7)}/${date.slice(8, 10)}`;
}

export function EnergySparkline({
  points,
  highlight,
}: {
  points: Point[];
  highlight?: { bestDate?: string; toughDate?: string };
}) {
  const w = 320;
  const h = 84;
  const padX = 10;
  const padY = 10;

  const xs = points.map((_, i) => (points.length === 1 ? w / 2 : padX + (i * (w - padX * 2)) / (points.length - 1)));
  const ys = points.map((point) => {
    const e = clamp(point.energy, 0, 100);
    return padY + (1 - e / 100) * (h - padY * 2);
  });

  const path = points.map((_, i) => `${i === 0 ? "M" : "L"} ${xs[i]!.toFixed(2)} ${ys[i]!.toFixed(2)}`).join(" ");
  const bestIdx = highlight?.bestDate ? points.findIndex((point) => point.date === highlight.bestDate) : -1;
  const toughIdx = highlight?.toughDate ? points.findIndex((point) => point.date === highlight.toughDate) : -1;

  return (
    <div className="rounded-2xl bg-white/55 p-4 ring-1 ring-stone-200/60">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-600">Energy line (7 days)</p>
        <p className="text-[11px] font-medium text-stone-500">0-100</p>
      </div>

      <div className="mt-2 overflow-hidden rounded-xl bg-gradient-to-b from-white/60 to-stone-50/40 ring-1 ring-stone-200/50">
        <svg viewBox={`0 0 ${w} ${h}`} className="block h-[92px] w-full" role="img" aria-label="7-day energy sparkline">
          <g stroke="#e7e5e4" strokeWidth="1" opacity="0.85">
            <line x1="0" y1={padY} x2={w} y2={padY} />
            <line x1="0" y1={h / 2} x2={w} y2={h / 2} />
            <line x1="0" y1={h - padY} x2={w} y2={h - padY} />
          </g>

          <path d={`${path} L ${xs[xs.length - 1]} ${h - padY} L ${xs[0]} ${h - padY} Z`} fill="#fb7185" opacity="0.08" />
          <path d={path} fill="none" stroke="#fb7185" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.9" />
          <path d={path} fill="none" stroke="#0f172a" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round" opacity="0.12" />

          {points.map((point, i) => {
            const x = xs[i]!;
            const y = ys[i]!;
            const color = phaseColor(point.phase);
            const isBest = i === bestIdx;
            const isTough = i === toughIdx;
            return (
              <g key={point.date}>
                <circle cx={x} cy={y} r={isBest || isTough ? 5 : 4} fill={color} opacity={0.95} />
                <circle cx={x} cy={y} r={isBest || isTough ? 9 : 8} fill={color} opacity={0.12} />
                {isBest ? <text x={x} y={y - 10} textAnchor="middle" fontSize="10" fill="#065f46">^</text> : null}
                {isTough ? <text x={x} y={y + 14} textAnchor="middle" fontSize="10" fill="#9f1239">v</text> : null}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-stone-500">
        <div className="flex gap-3">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full" style={{ background: phaseColor("Menstrual") }} />
            Menstrual
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full" style={{ background: phaseColor("Follicular") }} />
            Follicular
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full" style={{ background: phaseColor("Ovulation") }} />
            Ovulation
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full" style={{ background: phaseColor("Luteal") }} />
            Luteal
          </span>
        </div>
        <div className="hidden sm:block">
          <span className="font-medium">^</span> best <span className="ml-2 font-medium">v</span> dip
        </div>
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1 text-[10px] text-stone-500">
        {points.map((point) => (
          <div key={point.date} className="truncate text-center" title={point.date}>
            {fmtShortDate(point.date)}
          </div>
        ))}
      </div>
    </div>
  );
}
