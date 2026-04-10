"use client";

import { ActionLogger } from "@/components/action-logger";
import { PetCard } from "@/components/pet-card";
import { PhaseSelect } from "@/components/phase-select";
import { RecommendationCard } from "@/components/recommendation-card";
import { useAppState } from "@/hooks/use-app-state";
import { energyForDay, petMoodFromEnergy, todayDateString } from "@/lib/pet-logic";
import type { DayLog } from "@/lib/types";

export default function HomePage() {
  const { state, changePhase, logFood, logWorkout, resetDemo } = useAppState();

  if (!state) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-2 px-2 text-center">
        <p className="text-sm font-medium text-stone-500">Finding your cat…</p>
      </div>
    );
  }

  const date = todayDateString();
  const log: DayLog = state.logs[date] ?? {
    date,
    phase: state.phase,
    foodCount: 0,
    workoutCount: 0,
  };
  const energy = energyForDay(log);
  const mood = petMoodFromEnergy(energy);

  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-3xl bg-gradient-to-b from-rose-50/90 via-orange-50/35 to-amber-50/20 px-5 py-6 ring-1 ring-rose-100/50 sm:px-6 sm:py-7">
        <p className="text-xs font-semibold uppercase tracking-widest text-rose-700/75">Horma-Pet</p>
        <h1 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-[1.65rem]">
          A soft place for you and your cat
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-600">
          Your virtual cat tags along through your cycle. They pick up on how you’re treating yourself—when you
          log something kind, they perk up right beside you. No scores to chase, just a little friend who’s glad
          you showed up.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <PhaseSelect value={state.phase} onChange={changePhase} />
          </div>
          <div className="pt-6 sm:pt-7">
            <button
              type="button"
              onClick={resetDemo}
              className="rounded-xl border border-stone-200/90 bg-white/70 px-3 py-2 text-xs font-semibold text-stone-700 shadow-sm hover:bg-white hover:text-stone-900 active:scale-[0.99]"
            >
              Reset demo
            </button>
          </div>
        </div>
      </div>

      <PetCard energy={energy} mood={mood} phase={state.phase} />

      <RecommendationCard phase={state.phase} />

      <section className="space-y-3">
        <div>
          <h2 className="text-base font-semibold text-stone-900">Send a little care their way</h2>
          <p className="mt-1 text-sm text-stone-600">
            One tap = a small supportive action. Your cat reflects it right away.
          </p>
        </div>
        <ActionLogger onFood={logFood} onWorkout={logWorkout} />
      </section>
    </div>
  );
}
