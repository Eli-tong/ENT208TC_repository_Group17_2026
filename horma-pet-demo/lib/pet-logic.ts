import type { CyclePhase, DayLog, PetMood } from "./types";

/** Baseline energy for the day before today's action boosts (build pack + prompt 2 alignment). */
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

const FOOD_BOOST = 8;
const WORKOUT_BOOST = 10;
const MAX_ENERGY = 100;

export function energyForDay(log: DayLog): number {
  const base = baselineEnergyForPhase(log.phase);
  const raw = base + log.foodCount * FOOD_BOOST + log.workoutCount * WORKOUT_BOOST;
  return Math.min(MAX_ENERGY, raw);
}

export function petMoodFromEnergy(energy: number): PetMood {
  if (energy <= 39) return "sick";
  if (energy <= 59) return "tired";
  if (energy <= 79) return "normal";
  return "energetic";
}

export function todayDateString(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

/** Last 7 calendar days ending today, oldest first. */
export function last7Days(d = new Date()): string[] {
  const out: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const x = new Date(d);
    x.setDate(x.getDate() - i);
    out.push(x.toISOString().slice(0, 10));
  }
  return out;
}
