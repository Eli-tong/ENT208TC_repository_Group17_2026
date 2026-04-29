"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ActionLogger } from "@/components/action-logger";
import { PetCard } from "@/components/pet-card";
import { PhaseSelect } from "@/components/phase-select";
import { RecommendationCard } from "@/components/recommendation-card";
import { useAppState } from "@/hooks/use-app-state";
import { energyForDay, petMoodFromEnergy, todayDateString } from "@/lib/pet-logic";
import type { DayLog } from "@/lib/types";

export default function HomePage() {
  const { state, changePhase, logFood, logWorkout, logTask, logCare } = useAppState();
  const [careFeedback, setCareFeedback] = useState(false);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerCareFeedback = useCallback(() => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    setCareFeedback(true);
    feedbackTimer.current = setTimeout(() => {
      setCareFeedback(false);
      feedbackTimer.current = null;
    }, 900);
  }, []);

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    };
  }, []);

  const handleFood = useCallback((label: string, delta: number) => {
    logFood(label, delta);
    triggerCareFeedback();
  }, [logFood, triggerCareFeedback]);

  const handleWorkout = useCallback((label: string, delta: number) => {
    logWorkout(label, delta);
    triggerCareFeedback();
  }, [logWorkout, triggerCareFeedback]);

  const handleCare = useCallback((label: string, delta: number) => {
    logCare(label, delta);
    triggerCareFeedback();
  }, [logCare, triggerCareFeedback]);

  if (!state) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-2 px-2 text-center">
        <p className="text-sm font-medium text-stone-500">Finding your cat...</p>
      </div>
    );
  }

  const date = todayDateString();
  const log: DayLog = state.logs[date] ?? {
    date,
    phase: state.phase,
    actions: [],
  };
  const energy = energyForDay(log);
  const mood = petMoodFromEnergy(energy);

  return (
    <div className="space-y-5 pb-10 sm:space-y-6 sm:pb-12">
      <div className="rounded-3xl bg-gradient-to-b from-rose-50/90 via-orange-50/35 to-amber-50/20 px-5 py-6 ring-1 ring-rose-100/50 sm:px-6 sm:py-7">
        <p className="text-xs font-semibold uppercase tracking-widest text-rose-700/75">Horma-Pet</p>
        <h1 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-[1.65rem]">
          A soft place for you and your cat
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-600">
          Your virtual cat tags along through your cycle. They pick up on how you're treating yourself-when you log
          something kind, they perk up right beside you. No scores to chase, just a little friend who's glad you
          showed up.
        </p>
      </div>

      <div className="space-y-4 pt-0.5">
        <PhaseSelect value={state.phase} onChange={changePhase} />
        <PetCard energy={energy} mood={mood} phase={state.phase} showSoothed={careFeedback} />
      </div>

      <RecommendationCard phase={state.phase} energy={energy} onAction={handleCare} />

      <section className="space-y-2 pt-1">
        <div>
          <h2 className="text-base font-semibold text-stone-900">Care in one tap</h2>
          <p className="mt-0.5 text-sm text-stone-600">Quick logs-your cat responds on screen.</p>
        </div>
        <ActionLogger onCare={handleCare} onFood={handleFood} onWorkout={handleWorkout} onTask={logTask} />
      </section>
    </div>
  );
}
