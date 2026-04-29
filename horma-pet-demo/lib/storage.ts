"use client";

import type { ActionEvent, ActionType, AppState, CyclePhase, DayLog } from "./types";
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
  const next: DayLog = existing
    ? { ...migrateDayLog(existing), phase, actions: [] }
    : { date, phase, actions: [] };
  return {
    ...state,
    logs: { ...state.logs, [date]: next },
  };
}

export function setPhase(state: AppState, phase: CyclePhase): AppState {
  const s = { ...state, phase };
  return ensureTodayLog(s, phase);
}

function idForEvent(): string {
  const anyCrypto = (globalThis as unknown as { crypto?: Crypto }).crypto;
  if (anyCrypto?.randomUUID) return anyCrypto.randomUUID();
  return `evt_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function migrateDayLog(log: DayLog): DayLog {
  if (Array.isArray(log.actions)) return log;
  const actions: ActionEvent[] = [];
  const foodCount = log.foodCount ?? 0;
  const workoutCount = log.workoutCount ?? 0;

  for (let i = 0; i < foodCount; i++) {
    actions.push({
      id: idForEvent(),
      type: "food",
      label: "Logged food",
      delta: 8,
      at: new Date().toISOString(),
    });
  }

  for (let i = 0; i < workoutCount; i++) {
    actions.push({
      id: idForEvent(),
      type: "workout",
      label: "Logged workout",
      delta: 10,
      at: new Date().toISOString(),
    });
  }

  return { ...log, actions, foodCount: undefined, workoutCount: undefined };
}

export function migrateAllLogs(state: AppState): AppState {
  const nextLogs: Record<string, DayLog> = {};
  let changed = false;

  for (const [date, log] of Object.entries(state.logs)) {
    const migrated = migrateDayLog(log);
    nextLogs[date] = migrated;
    if (migrated !== log) changed = true;
  }

  if (!changed) return state;
  return { ...state, logs: nextLogs };
}

export function logTodayAction(
  state: AppState,
  kind: ActionType,
  payload: { label: string; delta: number }
): AppState {
  const date = todayDateString();
  const s0 = ensureTodayLog(state, state.phase);
  const log0 = s0.logs[date];
  if (!log0) return s0;

  const log = migrateDayLog(log0);
  const event: ActionEvent = {
    id: idForEvent(),
    type: kind,
    label: payload.label,
    delta: payload.delta,
    at: new Date().toISOString(),
  };
  const nextLog: DayLog = { ...log, actions: [...log.actions, event] };
  return { ...s0, logs: { ...s0.logs, [date]: nextLog } };
}

export function incrementTodayAction(state: AppState, kind: ActionType): AppState {
  const payload =
    kind === "food"
      ? { label: "Logged food", delta: 8 }
      : kind === "workout"
        ? { label: "Logged workout", delta: 10 }
        : kind === "care"
          ? { label: "Care action", delta: 4 }
          : { label: "Completed a task", delta: -10 };
  return logTodayAction(state, kind, payload);
}

