# Horma-Pet MVP Build Pack for Vibe Coding + Codex

## Goal

Build a **fast, presentable MVP demo** of **Horma-Pet**: a mobile-first, gamified virtual pet wellness app for female university students experiencing hormone-cycle-related low-energy phases.

The MVP should be demoable in the shortest possible time. It does **not** need full medical accuracy or production-grade infrastructure. It should feel coherent, clickable, visually clear, and aligned with the project brief.

---

## 1) MVP Definition

### Core product idea
A user logs simple supportive actions such as:
- anti-inflammatory food
- soothing / targeted workout

The app maps a simple cycle phase to a default pet energy state.  
When the user logs supportive actions, the pet visibly improves.  
The user can also view a simple 7-day trend summary.

### MVP must-have screens
1. **Home / Pet Dashboard**
   - pet visual state
   - current cycle phase
   - energy summary
   - suggested actions
   - quick log buttons

2. **Action Logging**
   - one-tap logging for:
     - anti-inflammatory food
     - targeted workout
   - instant visual feedback

3. **Trend Panel**
   - 7-day summary
   - daily action count
   - pet state snapshot / energy trend

4. **Cycle Settings / Simple Onboarding**
   - choose or simulate current cycle phase
   - no complex biological input

---

## 2) Recommended Build Strategy

### Best choice for speed
Use:
- **Next.js + TypeScript**
- **Tailwind CSS**
- **Local state + localStorage**
- **No real backend in v1 unless required for team split**
- Optional lightweight API routes only if needed

### Why this stack
For a class demo, this is faster than full mobile + backend.  
You get:
- fast UI iteration
- easy deployment
- easy Codex prompting
- easy demo
- enough realism to look like a product

### Important strategic decision
If the team needs “backend implementation” for evidence, build:
- a lightweight mock backend layer
- utility functions / API route stubs
- local JSON / localStorage persistence

This gives you:
- demoability
- code to explain
- less risk than building a full database-backed product in the first sprint

---

## 3) Demo Scope You Should Actually Build

### Keep these features
- select cycle phase
- pet state changes based on phase + logged actions
- one-tap food/workout logging
- daily recommendation card
- 7-day trend view
- polished UI with simple animations

### Do NOT build yet
- sign-in / auth
- real health data sync
- push notifications
- real AI recommendation engine
- complex analytics
- social/community features
- full database unless absolutely necessary

---

## 4) Product Logic for MVP

## Cycle phases
Use a simplified model:
- **Menstrual**
- **Follicular**
- **Ovulation**
- **Luteal**

## Baseline pet energy by phase
- Menstrual -> tired
- Follicular -> normal
- Ovulation -> energetic
- Luteal -> normal or slightly tired

## Supportive actions
### Food examples
- berries
- yogurt
- nuts
- warm soup
- green vegetables

### Workout examples
- stretching
- light yoga
- short walk
- breathing exercise

## Pet state logic
Each day:
- phase sets default baseline energy
- each logged action gives a recovery boost
- more supportive actions = healthier-looking pet

### Example scoring model
- tired baseline = 40
- normal baseline = 60
- energetic baseline = 80
- each food log = +8
- each workout log = +10
- cap at 100

### Visual state thresholds
- 0–39 -> sick
- 40–59 -> tired
- 60–79 -> normal
- 80–100 -> energetic

This is simple, explainable, and enough for demo purposes.

---

## 5) UI Direction

### Visual tone
- soft
- friendly
- cute but not childish
- emotionally supportive
- clean, mobile-first

### UI keywords for Codex
Use phrases like:
- pastel gradient cards
- soft rounded corners
- minimal but warm interface
- animated virtual pet
- mobile app dashboard feel
- calming wellness aesthetic

### Suggested sections on Home
- header: app name + current phase
- hero pet card
- “How is your pet today?”
- quick action buttons
- recommendation card
- 7-day trend preview

---

## 6) Suggested File Structure

```text
horma-pet/
  app/
    page.tsx
    trends/page.tsx
    settings/page.tsx
    globals.css
    layout.tsx
  components/
    pet-card.tsx
    action-logger.tsx
    recommendation-card.tsx
    trend-chart.tsx
    phase-selector.tsx
    stat-chip.tsx
  lib/
    pet-logic.ts
    storage.ts
    mock-data.ts
    types.ts
  public/
    pet/
  README.md
```

---

## 7) Codex Workflow: Best Practical Sequence

Do **not** ask Codex to build everything in one vague shot.  
Use a staged sequence.

---

## Prompt 1 — Project setup

```md
You are helping me build a fast MVP demo for a product called Horma-Pet.

Goal:
Create a mobile-first Next.js + TypeScript + Tailwind app prototype that demonstrates a gamified virtual pet wellness product.

Product concept:
Horma-Pet helps female university students maintain supportive habits during hormone-cycle-related low-energy phases. The app uses a virtual pet whose energy state reflects the user’s cycle phase and logged behaviors.

MVP requirements:
- Home dashboard with pet state
- Phase selector (Menstrual, Follicular, Ovulation, Luteal)
- One-tap logging for anti-inflammatory food and targeted workout
- Pet state updates immediately after actions are logged
- Recommendation card based on low-energy phases
- 7-day trend page
- Use local state/localStorage only
- Make the UI polished and demo-friendly
- No auth
- No real backend unless needed for simple mock API routes

Your task now:
Initialize the project structure and generate the first version of the app shell, file structure, and core reusable components.
Please keep the code simple, clean, and easy to explain in a demo.
```

---

## Prompt 2 — Core product logic

```md
Now implement the core product logic for Horma-Pet.

Requirements:
- Create a simple cycle-phase model:
  - Menstrual -> baseline energy 40
  - Follicular -> baseline energy 60
  - Ovulation -> baseline energy 80
  - Luteal -> baseline energy 55
- Logging food adds +8 energy
- Logging workout adds +10 energy
- Energy is capped at 100
- Pet state thresholds:
  - 0–39 sick
  - 40–59 tired
  - 60–79 normal
  - 80–100 energetic
- Persist daily logs and current phase in localStorage
- Make the logic modular in lib/pet-logic.ts and lib/storage.ts

Please write clean utility functions and keep everything easy to read and explain.
```

---

## Prompt 3 — Home screen polish

```md
Now improve the home screen UX/UI.

Requirements:
- Build a polished mobile-first home dashboard
- Add a visually strong pet card showing:
  - current pet state
  - current energy
  - current cycle phase
- Add one-tap action buttons for:
  - anti-inflammatory food
  - targeted workout
- Add immediate feedback after logging
- Add a recommendation card for low-energy phases
- Add friendly empty states and microcopy
- Use a soft, calming, gamified visual design
- Keep it realistic for a university class project demo

Do not overcomplicate. Optimize for demo quality and clarity.
```

---

## Prompt 4 — Trend page

```md
Create a 7-day trend page for Horma-Pet.

Requirements:
- Show the most recent 7 days
- Display:
  - day
  - cycle phase
  - food/workout actions logged
  - pet energy / pet state
- Use a clean card-based or chart-based layout
- Make the trend easy to understand at a glance
- Include a short explanation that helps users see the relationship between actions and pet condition

Keep it simple and polished. No external database required.
```

---

## Prompt 5 — Demo finishing pass

```md
We are preparing a class demo and need the product to feel more complete.

Please do a finishing pass on the Horma-Pet MVP:
- improve spacing, hierarchy, and typography
- make the pet card more visually appealing
- improve button labels and helper text
- ensure the UI looks coherent across Home / Trends / Settings
- add a small onboarding/settings flow to select or change cycle phase
- add a few high-quality mock data defaults so the trend page looks meaningful in the demo
- keep the code clean and explainable
- do not introduce unnecessary complexity

The goal is a presentable demo, not a production app.
```

---

## 8) Optional Prompt for “Backend Evidence”

If you need some backend evidence for the module:

```md
Please add a lightweight mock backend layer to this project.

Requirements:
- Add simple Next.js API routes for:
  - get current user state
  - log action
  - get 7-day trend
- It is acceptable to use mock data or local JSON logic
- The purpose is to demonstrate backend structure and request flow
- Keep the implementation simple, modular, and easy to explain
- Do not introduce a real database unless absolutely necessary
```

---

## 9) Optional Prompt for README

```md
Please write a clean README for the Horma-Pet MVP project.

Include:
- project overview
- problem statement
- target users
- key features
- tech stack
- file structure
- how the pet logic works
- how to run locally
- demo notes
- current limitations

Keep it professional and suitable for a university project repository.
```

---

## 10) What You Should Say in the Demo

Use this logic in your explanation:

### Product
“Horma-Pet is a low-effort, gamified wellness companion for female university students during hormone-cycle-related low-energy phases.”

### Core mechanism
“The pet acts as a visual behavioral mirror. The user’s cycle phase sets the baseline energy, and supportive actions improve the pet’s condition.”

### Why this MVP works
“We focused on the shortest path to validating the idea: simple cycle mapping, one-tap logging, immediate pet feedback, and a 7-day trend panel.”

### Why the scope is limited
“This MVP prioritizes behavior support and emotional engagement rather than medical accuracy or full health tracking.”

---

## 11) What Counts as a Good First Demo

A good v1 demo should let a user:
1. choose a cycle phase
2. see the pet state change
3. log food or workout with one tap
4. see the pet recover
5. open a trend page with believable history

If these five things work smoothly, the demo is already strong enough for an early checkpoint.

---

## 12) Fastest Execution Plan

### Day 1
- initialize project
- generate shell
- build home screen
- implement pet logic

### Day 2
- add local persistence
- add trend page
- polish styling

### Day 3
- add settings/onboarding
- add mock backend if needed
- write README
- rehearse demo

---

## 13) Final Advice for Vibe Coding

### Do
- keep prompts concrete
- ask for modular code
- ask for readable code
- iterate screen by screen
- stop Codex from overengineering

### Don’t
- ask for full production architecture too early
- add too many features
- build auth/database first
- let Codex invent unnecessary complexity

### Golden rule
**A polished small demo beats a broken ambitious app.**
