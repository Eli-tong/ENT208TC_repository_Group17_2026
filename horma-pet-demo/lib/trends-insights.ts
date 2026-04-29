import type { ActionEvent, CyclePhase, DayLog } from "@/lib/types";
import { energyForDay } from "@/lib/pet-logic";

export type TrendDay = {
  date: string;
  log: DayLog;
  energy: number;
  usedDemo: boolean;
};

export type InsightCard = {
  title: string;
  body: string;
};

export type TrendsInsights = {
  usedDemoAny: boolean;
  avgEnergy: number;
  change: number;
  series: Array<{ date: string; energy: number; phase: CyclePhase }>;
  impacts: Array<{
    date: string;
    phase: CyclePhase;
    totals: Record<ActionEvent["type"], number>;
    net: number;
  }>;
  bestDay: { date: string; energy: number; phase: CyclePhase };
  toughestDay: { date: string; energy: number; phase: CyclePhase };
  phaseSummary: Array<{ phase: CyclePhase; avgEnergy: number; days: number }>;
  topBoosts: Array<{ label: string; total: number; count: number }>;
  topDrains: Array<{ label: string; total: number; count: number }>;
  actionMix: Record<ActionEvent["type"], number>;
  cards: InsightCard[];
  suggestions: string[];
};

function round(n: number): number {
  return Math.round(n);
}

function byTotalDesc(a: { total: number }, b: { total: number }) {
  return b.total - a.total;
}

function summarizeByLabel(actions: ActionEvent[], pick: (a: ActionEvent) => boolean) {
  const map = new Map<string, { label: string; total: number; count: number }>();
  for (const action of actions) {
    if (!pick(action)) continue;
    const key = action.label || "(unnamed)";
    const prev = map.get(key) ?? { label: key, total: 0, count: 0 };
    prev.total += action.delta ?? 0;
    prev.count += 1;
    map.set(key, prev);
  }
  return Array.from(map.values()).sort(byTotalDesc);
}

function trendSentence(change: number): string {
  if (change >= 12) return "Your energy climbed across the week.";
  if (change >= 4) return "Your energy nudged upward overall.";
  if (change <= -12) return "Your energy dipped across the week.";
  if (change <= -4) return "Your energy drifted down a bit overall.";
  return "Your energy stayed fairly steady overall.";
}

export function buildTrendsInsights(days: TrendDay[]): TrendsInsights {
  const usedDemoAny = days.some((day) => day.usedDemo);
  const energies = days.map((day) => day.energy);
  const avgEnergy = energies.length ? round(energies.reduce((sum, x) => sum + x, 0) / energies.length) : 0;
  const change = energies.length ? round(energies[energies.length - 1]! - energies[0]!) : 0;
  const series = days.map((day) => ({ date: day.date, energy: day.energy, phase: day.log.phase }));
  const impacts = days.map((day) => {
    const totals: Record<ActionEvent["type"], number> = { food: 0, workout: 0, care: 0, task: 0 };
    for (const action of day.log.actions ?? []) {
      totals[action.type] = (totals[action.type] ?? 0) + (action.delta ?? 0);
    }
    const net = Object.values(totals).reduce((sum, x) => sum + x, 0);
    return { date: day.date, phase: day.log.phase, totals, net: round(net) };
  });

  let best = days[0]!;
  let tough = days[0]!;
  for (const day of days) {
    if (day.energy > best.energy) best = day;
    if (day.energy < tough.energy) tough = day;
  }

  const allActions = days.flatMap((day) => day.log.actions ?? []);
  const actionMix: Record<ActionEvent["type"], number> = { food: 0, workout: 0, task: 0, care: 0 };
  for (const action of allActions) actionMix[action.type] = (actionMix[action.type] ?? 0) + 1;

  const topBoosts = summarizeByLabel(allActions, (action) => (action.delta ?? 0) > 0).slice(0, 3);
  const topDrains = summarizeByLabel(allActions, (action) => (action.delta ?? 0) < 0)
    .map((item) => ({ ...item, total: Math.abs(item.total) }))
    .sort(byTotalDesc)
    .slice(0, 3);

  const phaseBuckets = new Map<CyclePhase, { phase: CyclePhase; sum: number; days: number }>();
  for (const day of days) {
    const prev = phaseBuckets.get(day.log.phase) ?? { phase: day.log.phase, sum: 0, days: 0 };
    prev.sum += day.energy;
    prev.days += 1;
    phaseBuckets.set(day.log.phase, prev);
  }

  const phaseSummary = Array.from(phaseBuckets.values())
    .map((item) => ({ phase: item.phase, days: item.days, avgEnergy: round(item.sum / item.days) }))
    .sort((a, b) => b.avgEnergy - a.avgEnergy);

  const cards: InsightCard[] = [
    {
      title: "Weekly overview",
      body: `${trendSentence(change)} Average energy was ${avgEnergy}/100.`,
    },
    {
      title: "Peaks & dips",
      body: `Best day: ${best.date} (${best.energy}/100, ${best.log.phase}). Toughest day: ${tough.date} (${tough.energy}/100, ${tough.log.phase}).`,
    },
  ];

  if (phaseSummary.length >= 2) {
    const top = phaseSummary[0]!;
    const low = phaseSummary[phaseSummary.length - 1]!;
    cards.push({
      title: "Phase pattern (this week)",
      body: `${top.phase} ran highest on average (${top.avgEnergy}/100). ${low.phase} ran lowest (${low.avgEnergy}/100).`,
    });
  } else if (phaseSummary.length === 1) {
    const only = phaseSummary[0]!;
    cards.push({
      title: "Phase pattern (this week)",
      body: `You logged only ${only.phase} this week. Average energy: ${only.avgEnergy}/100.`,
    });
  }

  if (topBoosts.length) {
    const boost = topBoosts[0]!;
    cards.push({
      title: "What restored you most",
      body: `${boost.label} showed up ${boost.count}x for a total of +${round(boost.total)} energy.`,
    });
  }

  if (topDrains.length) {
    const drain = topDrains[0]!;
    cards.push({
      title: "What cost you most",
      body: `${drain.label} showed up ${drain.count}x for a total of -${round(drain.total)} energy.`,
    });
  }

  const suggestions: string[] = [];
  const careCount = actionMix.care ?? 0;
  const workoutCount = actionMix.workout ?? 0;
  const foodCount = actionMix.food ?? 0;
  const taskCount = actionMix.task ?? 0;

  if (careCount < 2) suggestions.push("Add 1-2 tiny comfort actions (heat, water, 60-sec breathing) on low days.");
  if (workoutCount === 0) suggestions.push("Try one gentle movement day (easy walk or stretch) to smooth the dips.");
  if (foodCount === 0) suggestions.push("Log one nourishing food this week so we can learn what supports you.");
  if (taskCount >= 4 && change <= -4) suggestions.push("When tasks pile up, buffer recovery: add a short reset after heavy days.");

  const volatility = Math.max(...energies) - Math.min(...energies);
  if (volatility >= 25) suggestions.push("Your week was swingy-aim for steadier basics: consistent meals, water, and earlier wind-down.");

  suggestions.push("Next step: tap one action today, then check back here tomorrow for a clearer pattern.");

  return {
    usedDemoAny,
    avgEnergy,
    change,
    series,
    impacts,
    bestDay: { date: best.date, energy: best.energy, phase: best.log.phase },
    toughestDay: { date: tough.date, energy: tough.energy, phase: tough.log.phase },
    phaseSummary,
    topBoosts: topBoosts.map((item) => ({ ...item, total: round(item.total) })),
    topDrains: topDrains.map((item) => ({ ...item, total: round(item.total) })),
    actionMix,
    cards,
    suggestions,
  };
}

export function buildTrendDays(args: {
  days: string[];
  stateLogs: Record<string, DayLog | undefined>;
  demoLog: (date: string, idx: number) => DayLog;
}): TrendDay[] {
  const out: TrendDay[] = [];
  for (const [idx, date] of args.days.entries()) {
    const real = args.stateLogs[date];
    const log = real ?? args.demoLog(date, idx);
    out.push({ date, log, energy: energyForDay(log), usedDemo: !real });
  }
  return out;
}
