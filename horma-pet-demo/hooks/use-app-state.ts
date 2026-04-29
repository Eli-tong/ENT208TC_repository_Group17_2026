"use client";

import { useCallback, useEffect, useState } from "react";
import type { AppState, CyclePhase } from "@/lib/types";
import {
  ensureTodayLog,
  loadState,
  logTodayAction,
  migrateAllLogs,
  saveState,
  setPhase as applyPhase,
} from "@/lib/storage";

export function useAppState() {
  const [state, setState] = useState<AppState | null>(null);

  useEffect(() => {
    const s = migrateAllLogs(loadState());
    setState(ensureTodayLog(s, s.phase));
  }, []);

  useEffect(() => {
    if (state) saveState(state);
  }, [state]);

  const changePhase = useCallback((phase: CyclePhase) => {
    setState((s) => (s ? applyPhase(s, phase) : s));
  }, []);

  const logFood = useCallback((label: string, delta: number) => {
    setState((s) => (s ? logTodayAction(s, "food", { label, delta }) : s));
  }, []);

  const logWorkout = useCallback((label: string, delta: number) => {
    setState((s) => (s ? logTodayAction(s, "workout", { label, delta }) : s));
  }, []);

  const logTask = useCallback((label: string, delta: number) => {
    setState((s) => (s ? logTodayAction(s, "task", { label, delta }) : s));
  }, []);

  const logCare = useCallback((label: string, delta: number) => {
    setState((s) => (s ? logTodayAction(s, "care", { label, delta }) : s));
  }, []);

  return { state, changePhase, logFood, logWorkout, logTask, logCare };
}
