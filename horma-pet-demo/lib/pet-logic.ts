import type { CyclePhase, DayLog, PetMood } from "./types";

/** Baseline energy for the day before today's action boosts. */
export function baselineEnergyForPhase(phase: CyclePhase): number {
  switch (phase) {
    case "Menstrual":
      return 40;
    case "Follicular":
      return 60;
    case "Ovulation":
      return 80;
    case "Luteal":
      return 55;
    default: {
      const _exhaustive: never = phase;
      return _exhaustive;
    }
  }
}

const MAX_ENERGY = 100;
const MIN_ENERGY = 0;

export function energyForDay(log: DayLog): number {
  const base = baselineEnergyForPhase(log.phase);
  const legacyBoost = (log.foodCount ?? 0) * 8 + (log.workoutCount ?? 0) * 10;
  const actionDelta = (log.actions ?? []).reduce((sum, action) => sum + (action.delta ?? 0), 0);
  const raw = base + legacyBoost + actionDelta;
  return Math.min(MAX_ENERGY, Math.max(MIN_ENERGY, Math.round(raw)));
}

export function petMoodFromEnergy(energy: number): PetMood {
  if (energy <= 39) return "sick";
  if (energy <= 59) return "tired";
  if (energy <= 79) return "normal";
  return "energetic";
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Local date avoids UTC day drift. */
export function todayDateString(d = new Date()): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

/** Last 7 calendar days ending today, oldest first. */
export function last7Days(d = new Date()): string[] {
  const out: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const x = new Date(d);
    x.setDate(x.getDate() - i);
    out.push(todayDateString(x));
  }
  return out;
}
