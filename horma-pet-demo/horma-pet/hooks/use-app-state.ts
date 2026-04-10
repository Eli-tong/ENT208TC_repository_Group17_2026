"use client";

import { useCallback, useEffect, useState } from "react";
import type { AppState, CyclePhase } from "@/lib/types";
import {
  ensureTodayLog,
  incrementTodayAction,
  loadState,
  saveState,
  resetDemoState,
  setPhase as applyPhase,
} from "@/lib/storage";

export function useAppState() {
  const [state, setState] = useState<AppState | null>(null);

  useEffect(() => {
    const s = loadState();
    setState(ensureTodayLog(s, s.phase));
  }, []);

  useEffect(() => {
    if (state) saveState(state);
  }, [state]);

  const changePhase = useCallback((phase: CyclePhase) => {
    setState((s) => (s ? applyPhase(s, phase) : s));
  }, []);

  const logFood = useCallback(() => {
    setState((s) => (s ? incrementTodayAction(s, "food") : s));
  }, []);

  const logWorkout = useCallback(() => {
    setState((s) => (s ? incrementTodayAction(s, "workout") : s));
  }, []);

  const reset = useCallback(() => {
    setState(resetDemoState());
  }, []);

  return { state, changePhase, logFood, logWorkout, resetDemo: reset };
}
