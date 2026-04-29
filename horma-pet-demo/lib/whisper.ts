import type { CyclePhase } from "@/lib/types";

export type EnergyBand = "E1" | "E2" | "E3" | "E4";

export type WhisperCTA = {
  label: string;
  delta: number;
};

export type Whisper = {
  eyebrow: string;
  title: string;
  empathy: string;
  science: string;
  priority: string;
  actions: string[];
  nextSteps: WhisperCTA[];
  knowledge: { title: string; body: string };
  redFlags: string[];
};

export function energyBandFromEnergy(energy: number): EnergyBand {
  if (energy <= 39) return "E1";
  if (energy <= 59) return "E2";
  if (energy <= 79) return "E3";
  return "E4";
}

function packKnowledge(phase: CyclePhase): Whisper["knowledge"] {
  switch (phase) {
    case "Menstrual":
      return {
        title: "1-minute science: why cramps can hurt",
        body: "During your period, the uterus contracts to shed its lining. Prostaglandins can increase cramping and sensitivity. Heat and gentle movement often help by relaxing muscle tension and improving blood flow.",
      };
    case "Follicular":
      return {
        title: "1-minute science: the rebuild window",
        body: "After bleeding ends, estrogen tends to rise. Many people feel clearer and more motivated. It's a good time to rebuild routines gently-consistent meals and sleep can make the next phase easier.",
      };
    case "Ovulation":
      return {
        title: "1-minute science: why you may feel brighter",
        body: "Around ovulation, estrogen often peaks. Some people notice more confidence, social energy, and training capacity. It's also a time when you may over-commit-protect tomorrow-you with a quick pause before saying yes.",
      };
    case "Luteal":
      return {
        title: "1-minute science: why PMS feels real",
        body: "In the luteal phase, progesterone rises then falls. That shift can affect sleep, appetite, and mood. You're not being dramatic-your nervous system is working harder, so softness and stable basics matter.",
      };
    default: {
      const _exhaustive: never = phase;
      return _exhaustive;
    }
  }
}

function redFlagsForPhase(phase: CyclePhase): string[] {
  if (phase === "Menstrual") {
    return [
      "Severe pain that disrupts daily life or doesn't improve with typical care",
      "Very heavy bleeding (soaking through pads/tampons frequently) or large clots",
      "Fever, fainting, or new or worsening symptoms",
    ];
  }
  return ["Symptoms that feel unusual for you, worsen over time, or impact daily life"];
}

export function getWhisper(phase: CyclePhase, energy: number): Whisper {
  const band = energyBandFromEnergy(energy);
  const knowledge = packKnowledge(phase);
  const redFlags = redFlagsForPhase(phase);
  const eyebrow = "Whisper from your cat";

  if (phase === "Menstrual") {
    if (band === "E1") {
      return {
        eyebrow,
        title: "Let's make today smaller and warmer",
        empathy: "You look like a little cat curled into a ball. I'll guard your quiet.",
        science: "This is a phase where cramping and fatigue can spike. Your body is doing real work-rest isn't laziness.",
        priority: "Your only job: help your body feel safe.",
        actions: [
          "Heat pad for 15-20 minutes (lower belly or lower back)",
          "Warm drink and a small salty-sweet snack (if it helps nausea)",
          "Gentle stretch (2-3 minutes) or a slow hallway walk",
          "Reduce caffeine if it worsens jitters or cramps",
          "If needed, use pain relief as directed on the label",
        ],
        nextSteps: [
          { label: "Log: Heat pad (15 min)", delta: 5 },
          { label: "Log: Breathing (60 sec)", delta: 4 },
          { label: "Log: Water break", delta: 3 },
        ],
        knowledge,
        redFlags,
      };
    }
    if (band === "E2") {
      return {
        eyebrow,
        title: "We can do the gentle version",
        empathy: "I'm staying close. No heroics required.",
        science: "Energy can be low and focus can wobble during bleeding days. Smaller tasks reduce stress load and help pain feel less sharp.",
        priority: "Keep the essentials; let the rest wait.",
        actions: [
          "Turn big tasks into 25-minute chunks with real breaks",
          "Choose easy protein and carbs (eggs, yogurt, rice, soup)",
          "Light movement once today (walk, yoga, or stretch)",
          "Plan an early wind-down (dim lights 30 minutes earlier)",
        ],
        nextSteps: [
          { label: "Log: Heat pad (15 min)", delta: 5 },
          { label: "Log: Gentle yoga", delta: 7 },
          { label: "Log: Water break", delta: 3 },
        ],
        knowledge,
        redFlags,
      };
    }
    if (band === "E3") {
      return {
        eyebrow,
        title: "You've got some spark-let's not spend it all",
        empathy: "I see you. Strong, but still deserving of softness.",
        science: "Even with decent energy, cramps and inflammation can flare if you push too hard. Moderate pace usually feels best.",
        priority: "Steady beats intense.",
        actions: [
          "Keep workouts low-to-moderate intensity (walk, yoga, light strength)",
          "Add iron-friendly foods (leafy greens, beans, fish) when you can",
          "Pause every hour for 60 seconds of breathing or stretching",
        ],
        nextSteps: [
          { label: "Log: Easy walk", delta: 6 },
          { label: "Log: Leafy greens", delta: 7 },
          { label: "Log: Breathing (60 sec)", delta: 4 },
        ],
        knowledge,
        redFlags,
      };
    }
    return {
      eyebrow,
      title: "High energy-still protect tomorrow-you",
      empathy: "Zoomies are allowed. Just... no midnight chaos, okay?",
      science: "Some people feel surprisingly capable during their period. The main risk is over-doing it and crashing the next day.",
      priority: "Spend energy wisely so you don't pay interest tomorrow.",
      actions: [
        "Choose medium-easy movement, not max intensity",
        "Hydrate and add protein to stabilize energy",
        "Set a bedtime buffer (screens off earlier if possible)",
      ],
      nextSteps: [
        { label: "Log: Water break", delta: 3 },
        { label: "Log: Omega-3 fish", delta: 8 },
        { label: "Log: Breathing (60 sec)", delta: 4 },
      ],
      knowledge,
      redFlags,
    };
  }

  if (phase === "Follicular") {
    if (band === "E1") {
      return {
        eyebrow,
        title: "Let's reboot gently-no shame",
        empathy: "If you're still low, I'm not disappointed. I'm concerned, in a caring way.",
        science: "After your period, energy often rises-but sleep debt, stress, or low iron can keep you drained. Small foundations help most.",
        priority: "Recover first, then build.",
        actions: [
          "Get daylight for 5-10 minutes (even cloudy counts)",
          "Add iron and vitamin C pairing (greens and citrus, beans and tomatoes)",
          "Do a tiny strength check-in (5-10 minutes) if it feels okay",
          "Pick one easy-win task only",
        ],
        nextSteps: [
          { label: "Log: Water break", delta: 3 },
          { label: "Log: Leafy greens", delta: 7 },
          { label: "Log: Breathing (60 sec)", delta: 4 },
        ],
        knowledge,
        redFlags,
      };
    }
    if (band === "E2") {
      return {
        eyebrow,
        title: "A steady rebuild day",
        empathy: "I'm purring at your consistency. Tiny steps count.",
        science: "This phase is often better for focus and habit building. Regular meals and sleep can amplify the natural upswing.",
        priority: "Build a rhythm you can keep.",
        actions: [
          "Choose one deep-work block (25-45 minutes)",
          "Eat a real lunch (protein and fiber helps later cravings)",
          "Move for 10-20 minutes (walk, yoga, or light strength)",
        ],
        nextSteps: [
          { label: "Log: Focus session (30 min)", delta: -10 },
          { label: "Log: Easy walk", delta: 6 },
          { label: "Log: Water break", delta: 3 },
        ],
        knowledge,
        redFlags,
      };
    }
    if (band === "E3") {
      return {
        eyebrow,
        title: "This is your momentum window",
        empathy: "I'm trotting beside you-quiet confidence vibes.",
        science: "As estrogen rises, many people feel more motivated and resilient. It's a great time to set up routines that support the pre-period days.",
        priority: "Invest in future ease.",
        actions: [
          "Do a mid-intensity workout (or a longer walk)",
          "Plan 1-2 key tasks for this phase",
          "Prep one PMS-friendly meal or snack for later this month",
        ],
        nextSteps: [
          { label: "Log: Light strength", delta: 7 },
          { label: "Log: Berries", delta: 6 },
          { label: "Log: Water break", delta: 3 },
        ],
        knowledge,
        redFlags,
      };
    }
    return {
      eyebrow,
      title: "Big energy-make it sustainable",
      empathy: "Your tail is up. I approve.",
      science: "High energy can be productive, but consistency beats a single heroic day. A little recovery keeps your streak alive.",
      priority: "Go hard... with a recovery plan.",
      actions: [
        "Schedule the hardest task early while your brain is sharp",
        "Strength and easy cardio (or pick one) to avoid overload",
        "Leave a 30-minute buffer for decompression",
      ],
      nextSteps: [
        { label: "Log: Focus session (30 min)", delta: -10 },
        { label: "Log: Easy walk", delta: 6 },
        { label: "Log: Breathing (60 sec)", delta: 4 },
      ],
      knowledge,
      redFlags,
    };
  }

  if (phase === "Ovulation") {
    if (band === "E1") {
      return {
        eyebrow,
        title: "If you're low here, let's listen closely",
        empathy: "I'm not judging-just gently checking on you.",
        science: "Many people feel brighter around ovulation. If you don't, it may be stress, sleep, illness, or just your unique pattern.",
        priority: "Stabilize basics: water, food, rest.",
        actions: [
          "Eat something with protein within the next hour",
          "Hydrate (a full glass now, another later)",
          "Do a 5-minute walk or stretch to reduce stress load",
          "Protect bedtime tonight",
        ],
        nextSteps: [
          { label: "Log: Water break", delta: 3 },
          { label: "Log: Berries", delta: 6 },
          { label: "Log: Breathing (60 sec)", delta: 4 },
        ],
        knowledge,
        redFlags,
      };
    }
    if (band === "E2") {
      return {
        eyebrow,
        title: "Good for connection-keep it simple",
        empathy: "Social sparks are cute. Just don't set yourself on fire.",
        science: "This phase can boost confidence and communication. A tiny structure helps you avoid scattered energy.",
        priority: "Connect, then recover.",
        actions: [
          "Do the one important conversation or meeting today",
          "Use a short to-do list (3 items max)",
          "Snack with protein to avoid a crash",
        ],
        nextSteps: [
          { label: "Log: Meetings / social", delta: -12 },
          { label: "Log: Water break", delta: 3 },
          { label: "Log: Breathing (60 sec)", delta: 4 },
        ],
        knowledge,
        redFlags,
      };
    }
    if (band === "E3") {
      return {
        eyebrow,
        title: "Confident cat energy",
        empathy: "Strut a little. I'll pretend I'm not impressed.",
        science: "With hormones often near a high point, many people feel more outward and capable. It's a great day for presenting, negotiating, or showing your work.",
        priority: "Do one thing that helps your future self.",
        actions: [
          "Pick a spotlight task (presentation, outreach, interview prep)",
          "Move your body once to burn stress cleanly",
          "Write down one boundary before you say yes to anything big",
        ],
        nextSteps: [
          { label: "Log: Focus session (30 min)", delta: -10 },
          { label: "Log: Gentle yoga", delta: 7 },
          { label: "Log: Water break", delta: 3 },
        ],
        knowledge,
        redFlags,
      };
    }
    return {
      eyebrow,
      title: "Peak energy-watch the over-promise trap",
      empathy: "Zoomies! But we sleep tonight. Deal?",
      science: "High energy can make everything feel possible. A 24-hour pause can prevent accidental over-commitment.",
      priority: "Pause before promising.",
      actions: [
        "Before agreeing: let me confirm tomorrow (one sentence is enough)",
        "Do a short intense burst (or dance) then cool down",
        "Hydrate-high output needs fluids",
      ],
      nextSteps: [
        { label: "Log: Easy walk", delta: 6 },
        { label: "Log: Water break", delta: 3 },
        { label: "Log: Breathing (60 sec)", delta: 4 },
      ],
      knowledge,
      redFlags,
    };
  }

  if (phase === "Luteal") {
    if (band === "E1") {
      return {
        eyebrow,
        title: "PMS-friendly mode: activated",
        empathy: "Come here. I'll be the weighted blanket today.",
        science: "Hormone shifts can affect sleep, appetite, and mood here. You're not broken-your system is working harder.",
        priority: "Reduce pressure; increase comfort.",
        actions: [
          "Lower salt and alcohol if you feel puffy or moody",
          "Magnesium-friendly foods (dark chocolate, nuts, greens) if they suit you",
          "Gentle movement and early wind-down",
          "Write 3 lines: what I feel / what I need / one tiny step",
        ],
        nextSteps: [
          { label: "Log: Dark chocolate", delta: 7 },
          { label: "Log: Breathing (60 sec)", delta: 4 },
          { label: "Log: Heat pad (15 min)", delta: 5 },
        ],
        knowledge,
        redFlags,
      };
    }
    if (band === "E2") {
      return {
        eyebrow,
        title: "Do the three-things day",
        empathy: "I'm proud of you for showing up, even if you're spicy about it.",
        science: "This phase can bring irritability and fatigue. A shorter list prevents overwhelm and keeps your nervous system calmer.",
        priority: "Only three tasks. Seriously.",
        actions: [
          "Pick 3 must-dos, ignore the rest",
          "Eat steady meals (protein and fiber) to reduce cravings swings",
          "Move gently once (walk, stretch, yoga)",
        ],
        nextSteps: [
          { label: "Log: Easy walk", delta: 6 },
          { label: "Log: Water break", delta: 3 },
          { label: "Log: Breathing (60 sec)", delta: 4 },
        ],
        knowledge,
        redFlags,
      };
    }
    if (band === "E3") {
      return {
        eyebrow,
        title: "Steady now-buffer for the dip",
        empathy: "Let's be smart-cozy. Both can be true.",
        science: "Even with decent energy, it can swing quickly in late luteal days. A small buffer in your schedule can save you tomorrow.",
        priority: "Protect the landing.",
        actions: [
          "Choose moderate movement, not all-out",
          "Add protein at dinner to support sleep stability",
          "Reduce screens a bit earlier tonight",
        ],
        nextSteps: [
          { label: "Log: Light strength", delta: 7 },
          { label: "Log: Water break", delta: 3 },
          { label: "Log: Breathing (60 sec)", delta: 4 },
        ],
        knowledge,
        redFlags,
      };
    }
    return {
      eyebrow,
      title: "High energy... with a short fuse?",
      empathy: "If you feel fiery, I'll be your pause button.",
      science: "Some people get a restless, anxious high in luteal days. Caffeine and conflict can amplify it-channel the energy physically instead.",
      priority: "Release, don't argue.",
      actions: [
        "Move your body to vent (walk, clean, stretch, dance)",
        "Reduce caffeine if you feel wired",
        "Delay hard conversations by 10 minutes and breathe first",
      ],
      nextSteps: [
        { label: "Log: House chore", delta: -8 },
        { label: "Log: Easy walk", delta: 6 },
        { label: "Log: Breathing (60 sec)", delta: 4 },
      ],
      knowledge,
      redFlags,
    };
  }

  return {
    eyebrow,
    title: "I'm here with you",
    empathy: "Whatever today is, we'll take it one paw-step at a time.",
    science: "Your cycle can be different month to month. Tracking patterns can help you predict what you'll need.",
    priority: "Do one supportive thing now.",
    actions: ["Drink water", "Take one slow breath", "Pick the smallest next step"],
    nextSteps: [
      { label: "Log: Water break", delta: 3 },
      { label: "Log: Breathing (60 sec)", delta: 4 },
    ],
    knowledge,
    redFlags,
  };
}
