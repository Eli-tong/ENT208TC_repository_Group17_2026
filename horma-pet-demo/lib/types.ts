export type CyclePhase = "Menstrual" | "Follicular" | "Ovulation" | "Luteal";

export type PetMood = "sick" | "tired" | "normal" | "energetic";

export type ActionType = "food" | "workout";

export interface DayLog {
  /** YYYY-MM-DD */
  date: string;
  phase: CyclePhase;
  foodCount: number;
  workoutCount: number;
}

export interface AppState {
  /** Current selected cycle phase (demo: applies to "today") */
  phase: CyclePhase;
  /** Per-day logs keyed by date string */
  logs: Record<string, DayLog>;
}
