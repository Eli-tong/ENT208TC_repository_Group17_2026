export type CyclePhase = "Menstrual" | "Follicular" | "Ovulation" | "Luteal";

export type PetMood = "sick" | "tired" | "normal" | "energetic";

export type ActionType = "food" | "workout" | "task" | "care";

export interface ActionEvent {
  id: string;
  type: ActionType;
  label: string;
  /** Positive restores energy, negative spends energy. */
  delta: number;
  /** ISO timestamp */
  at: string;
}

export interface DayLog {
  /** YYYY-MM-DD */
  date: string;
  phase: CyclePhase;
  /**
   * Event stream for the day. This powers Trends and keeps labels/deltas for
   * more personalized insight cards.
   */
  actions: ActionEvent[];
  /** Back-compat for older local demo state. */
  foodCount?: number;
  /** Back-compat for older local demo state. */
  workoutCount?: number;
}

export interface AppState {
  /** Current selected cycle phase (demo: applies to "today") */
  phase: CyclePhase;
  /** Per-day logs keyed by date string */
  logs: Record<string, DayLog>;
}
