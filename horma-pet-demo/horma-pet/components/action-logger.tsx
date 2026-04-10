type Props = {
  onFood: () => void;
  onWorkout: () => void;
};

export function ActionLogger({ onFood, onWorkout }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={onFood}
        className="group rounded-2xl border border-amber-200/90 bg-white/90 px-4 py-4 text-left shadow-sm ring-1 ring-amber-100/50 transition hover:border-amber-300 hover:bg-amber-50/50 hover:shadow-md active:scale-[0.99]"
      >
        <span className="text-lg" aria-hidden>
          🥗
        </span>
        <span className="mt-2 block text-sm font-semibold text-stone-800">Share a snack</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-stone-600">
          Log something gentle and nourishing
          <span className="mt-1 block font-medium text-amber-800/90">+8 cat energy</span>
        </span>
      </button>
      <button
        type="button"
        onClick={onWorkout}
        className="group rounded-2xl border border-teal-200/90 bg-white/90 px-4 py-4 text-left shadow-sm ring-1 ring-teal-100/50 transition hover:border-teal-300 hover:bg-teal-50/40 hover:shadow-md active:scale-[0.99]"
      >
        <span className="text-lg" aria-hidden>
          🧘
        </span>
        <span className="mt-2 block text-sm font-semibold text-stone-800">Stretch together</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-stone-600">
          Log a kind, low-pressure moment of movement
          <span className="mt-1 block font-medium text-teal-800/90">+10 cat energy</span>
        </span>
      </button>
    </div>
  );
}
