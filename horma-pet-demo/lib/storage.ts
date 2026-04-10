"use client";

import type { ActionType, AppState, CyclePhase, DayLog } from "./types";
import { todayDateString } from "./pet-logic";

const STORAGE_KEY = "horma-pet-state";

const defaultState = (): AppState => ({
  phase: "Follicular",
  logs: {},
});

export function loadState(): AppState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as AppState;
    if (!parsed || typeof parsed !== "object") return defaultState();
    return {
      phase: parsed.phase ?? defaultState().phase,
      logs: parsed.logs && typeof parsed.logs === "object" ? parsed.logs : {},
    };
  } catch {
    return defaultState();
  }
}

export function saveState(state: AppState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function ensureTodayLog(state: AppState, phase: CyclePhase): AppState {
  const date = todayDateString();
  const existing = state.logs[date];
  if (existing && existing.phase === phase) return state;
  // Demo-friendly: when switching phases, clear today’s action counts so
  // the baseline energy is clearly visible (not pinned at 100 from past logs).
  const next: DayLog = existing
    ? { ...existing, phase, foodCount: 0, workoutCount: 0 }
    : { date, phase, foodCount: 0, workoutCount: 0 };
  return {
    ...state,
    logs: { ...state.logs, [date]: next },
  };
}

export function setPhase(state: AppState, phase: CyclePhase): AppState {
  const s = { ...state, phase };
  return ensureTodayLog(s, phase);
}

export function incrementTodayAction(state: AppState, kind: ActionType): AppState {
  const date = todayDateString();
  const s = ensureTodayLog(state, state.phase);
  const log = s.logs[date];
  if (!log) return s;
  const nextLog: DayLog =
    kind === "food"
      ? { ...log, foodCount: log.foodCount + 1 }
      : { ...log, workoutCount: log.workoutCount + 1 };
  return { ...s, logs: { ...s.logs, [date]: nextLog } };
}

export function resetDemoState(): AppState {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
  return defaultState();
}
