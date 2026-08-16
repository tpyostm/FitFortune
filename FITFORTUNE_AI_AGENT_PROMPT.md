# FITFORTUNE — AI Agent Build Prompt

## 1. Project Overview

Build a **mobile-first web app** called **FITFORTUNE**.

FITFORTUNE is a playful **fortune + exercise** web app.  
Users open a link on mobile, tap a card on the first page, reveal a daily health fortune, do a short exercise, complete a timer, see a congratulation page, and optionally continue to a harder challenge.

This app is for a **presentation-ready MVP** first.  
Do **not** expand the scope unless explicitly requested.

---

## 2. Product Goal

Create a simple but polished interactive experience with this flow:

1. User opens the landing page
2. User taps a fortune card
3. Card flips open with animation
4. User sees today's health fortune and exercise suggestion
5. User starts a **30-second** exercise timer
6. User completes the session
7. User sees a congrats page
8. User can:
   - continue to challenge mode
   - share to friends
   - open LINE OA

---

## 3. Core Product Rules

- App name: **FITFORTUNE**
- Platform: **Web App opened from a mobile link**
- First version theme: **fixed purple theme**
- Language in app UI: **Thai**
- The app must be **mobile-first**
- The app must feel **cute, playful, soft, magical, and lightweight**
- The first page must use **card tap interaction**, not a normal CTA button
- The first page needs a **card opening / flip animation**
- Main timer duration: **30 seconds**
- The “Personal fortune boost” action should go to **Page 5**
- The share feature does **not** need real share verification
- Final production assets may come later, so the app must be able to work with placeholders first

---

## 4. Recommended Tech Stack

Use:

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Supabase**
- **Vercel**

### Notes
- Use **App Router**
- Use clean, readable folder structure
- Use reusable components
- Use mock data first, then connect to Supabase

---

## 5. Scope

### In Scope
- 5-page flow
- card tap interaction
- card flip animation
- daily fortune page
- 30-second exercise timer
- congrats page
- challenge page
- share button
- LINE OA external link
- basic data structure for daily content
- basic session logging

### Out of Scope
Do **not** add:
- authentication
- payment
- leaderboard
- admin dashboard
- real share tracking
- AI-generated fortune logic
- push notifications
- complex gamification
- multilingual system
- unnecessary backend features

If anything is unclear, **ask the user instead of inventing features**.

---

## 6. Page Flow

### Page 1 — Landing / Pick a Card
Purpose: start the experience.

UI requirements:
- App title: **FITFORTUNE**
- Subtitle / short supporting copy in Thai
- One large central fortune card
- No main button required
- User should tap the card itself
- Card should feel interactive and magical

Interaction:
- Tapping the card triggers:
  - slight hover / press feedback
  - glow state
  - flip animation
  - route transition to page 2

---

### Page 2 — Daily Fortune
Purpose: show today’s health fortune and recommended movement.

UI requirements:
- Show today's day label in Thai
- Show a short fortune headline
- Show fortune description
- Show health focus area
- Show recommended exercise
- Show exercise materials
- Show video/material area
- Show a start button

Example content pattern:
- “วันนี้วันเสาร์”
- “ดวงสุขภาพวันนี้”
- short playful fortune message
- short movement recommendation
- short joke/share message

Interaction:
- Start button goes to Page 3

---

### Page 3 — Exercise Timer
Purpose: user performs the movement.

UI requirements:
- 30-second timer
- exercise name
- short instruction
- mascot or exercise illustration
- pause / resume support
- timer progress visualization

Interaction:
- Start automatically or with one tap
- When timer completes, go to Page 4

---

### Page 4 — Congrats
Purpose: celebrate completion and push next action.

UI requirements:
- congratulation message
- cute celebratory mascot
- challenge teaser text
- 3 action buttons:
  1. Personal fortune boost
  2. Share to friends
  3. Add LINE OA

Interaction:
- Personal fortune boost → Page 5
- Share → Web Share API or copy link fallback
- Add LINE OA → external link

---

### Page 5 — Challenge
Purpose: give a harder exercise continuation.

UI requirements:
- challenge title
- harder exercise content
- material section
- optional video/material preview
- start challenge button

Interaction:
- Start challenge → reuse Page 3 timer flow

---

## 7. Routes

Use this route structure:

- `/` → Page 1
- `/today` → Page 2
- `/exercise` → Page 3
- `/complete` → Page 4
- `/challenge` → Page 5

Optional query params:
- `/exercise?mode=main`
- `/exercise?mode=challenge`

---

## 8. Design Direction

### Visual Style
- soft pastel purple
- cute, magical, round, friendly
- clean mobile UI
- minimal but charming
- soft glow and sparkles
- rounded cards and buttons
- kawaii mascot presence

### Theme Colors
Use placeholder theme tokens for now:

- Primary: `#A78BFA`
- Primary dark: `#8B5CF6`
- Light purple: `#E9D5FF`
- Background: `#FAF5FF`
- Accent pink: `#F9A8D4`
- Accent cream: `#FFF7ED`
- Text dark: `#4C1D95`

These can be refactored later.

---

## 9. Data Model

Use mock data first.

### Suggested structure

```ts
type ExerciseMaterial = {
  name: string;
  icon: string;
};

type ExerciseContent = {
  name: string;
  instruction: string;
  durationSec: number;
  materials: ExerciseMaterial[];
  videoUrl?: string;
  illustration?: string;
};

type DailyFortune = {
  dayKey: string;
  dayLabelTh: string;
  fortuneTitle: string;
  fortuneBody: string;
  healthFocusArea: string;
  shareWarningText: string;
  mainExercise: ExerciseContent;
  challengeExercise: ExerciseContent;
};
```

### Suggested future tables
- `fortune_days`
- `session_logs`
- `share_logs`

---

## 10. Components

Create reusable components.

### Shared UI
- `AppHeader`
- `PrimaryButton`
- `SecondaryButton`
- `CardShell`
- `FloatingSparkles`
- `RoundedPanel`
- `TimerCircle`
- `ShareButton`
- `LineButton`

### Feature Components
- `PickCard`
- `CardFlipAnimation`
- `FortuneCardContent`
- `ExerciseInfoCard`
- `MaterialList`
- `ExerciseTimer`
- `CongratsSection`
- `ChallengeSection`
- `MascotDisplay`

---

## 11. Card Animation Requirements

The landing page must use card interaction instead of a normal button.

### Required card states
1. **Default card state**
2. **Selected / glow state**
3. **Mid-flip state**
4. **Opened / revealed state**

### Animation behavior
- slight scale on tap
- outer glow on selection
- 3D flip animation
- smooth transition to the next page
- keep the motion soft and cute, not too dramatic

### Recommended implementation
Use:
- CSS transform / perspective
- Framer Motion if needed
- simple 3D rotation
- do not over-engineer

---

## 12. Placeholder Asset Strategy (Important)

Do **not** block the build waiting for final assets.

Use placeholder assets now so the app can be implemented immediately.  
Replace them later when final assets are ready.

### 12.1 Temporary Assets to Use Now

#### A. Mascot placeholders
Use the existing temporary mascot assets first, if available:

- `mascot-default.png`
- `mascot-thinking.png`
- `mascot-wave.png`
- `mascot-exercise-shoulder.png`
- `mascot-congrats.png`
- `mascot-challenge.png`

If those files are not yet placed in the project, use one of these temporary fallback options:
1. a simple purple circular blob illustration
2. a generic rounded cute ghost/blob SVG
3. a lavender emoji-style placeholder

#### B. Card placeholders
Use:
- `card-back.png` → default mystery card
- `card-glow.png` → selected state
- `card-midflip.png` → transition reference only
- `card-front.png` → revealed state

If real files are not available yet:
- use one rounded rectangle with gradient background
- place a large `?` in the center
- apply glow via CSS
- simulate the flip via transform rather than relying on a sprite sheet

#### C. Exercise placeholders
Before final exercise illustrations arrive, use:
- simple line illustrations
- neutral vector stretch icons
- or a mascot image plus text instruction

#### D. Material placeholders
Use icon libraries first:
- **Lucide**
- **Heroicons**
- or simple local SVG icons

Map like this:
- yoga mat → rectangle/rolled mat icon
- dumbbell → dumbbell icon
- resistance band → loop/band icon
- towel → folded towel icon
- water bottle → bottle icon

#### E. Video / material preview placeholder
Use:
- a rounded rectangle thumbnail block
- play icon in the center
- optional label “คลิปตัวอย่าง”
- static image placeholder for now

#### F. Background decorations
Before final asset pack is ready, use:
- CSS radial gradients
- small sparkles made from SVG
- circles, stars, and blurred glows
- floating soft blobs in purple/pink

---

## 13. Placeholder File Naming Convention

Use this temporary folder structure:

```bash
/public/assets/
  mascot/
    mascot-default.png
    mascot-thinking.png
    mascot-wave.png
    mascot-exercise-shoulder.png
    mascot-congrats.png
    mascot-challenge.png

  cards/
    card-back.png
    card-glow.png
    card-front.png

  exercise/
    exercise-shoulder.png
    exercise-placeholder.png
    challenge-placeholder.png

  icons/
    mat.svg
    dumbbell.svg
    band.svg
    towel.svg
    bottle.svg

  ui/
    video-placeholder.png
    sparkle.svg
```

If the exact files do not exist yet, create UI with fallback blocks and comments for replacement later.

---

## 14. Temporary Asset Mapping Per Page

### Page 1
Use:
- `card-back.png`
- `card-glow.png`
- CSS flip animation
- purple sparkles background

### Page 2
Use:
- `mascot-thinking.png` or `mascot-default.png`
- `exercise-shoulder.png` or `exercise-placeholder.png`
- material icons from SVG/icon library
- `video-placeholder.png`

### Page 3
Use:
- `mascot-exercise-shoulder.png`
- timer circle UI
- short text instruction

### Page 4
Use:
- `mascot-congrats.png` or `mascot-wave.png`

### Page 5
Use:
- `mascot-challenge.png`
- `challenge-placeholder.png`
- same timer route as page 3

---

## 15. Folder Structure

```bash
src/
  app/
    page.tsx
    today/page.tsx
    exercise/page.tsx
    complete/page.tsx
    challenge/page.tsx

  components/
    ui/
      button.tsx
      card-shell.tsx
      timer-circle.tsx
      rounded-panel.tsx
    shared/
      app-header.tsx
      floating-sparkles.tsx
      mascot-display.tsx
      material-list.tsx
    features/
      pick-card.tsx
      card-flip-animation.tsx
      fortune-card-content.tsx
      exercise-info-card.tsx
      exercise-timer.tsx
      congrats-section.tsx
      challenge-section.tsx

  data/
    daily-fortunes.ts

  lib/
    share.ts
    timer.ts
    day.ts
    supabase.ts

  types/
    fortune.ts
```

---

## 16. Development Order

### Phase 1 — Foundation
1. create Next.js project
2. add Tailwind
3. define theme tokens
4. create routes
5. build mobile layout shell

### Phase 2 — Core UI
6. build page 1 with tappable card
7. build card flip interaction
8. build page 2 fortune layout
9. build page 3 timer layout
10. build page 4 congrats layout
11. build page 5 challenge layout

### Phase 3 — Placeholder Integration
12. wire placeholder mascot assets
13. wire placeholder card assets
14. wire material icons
15. add video placeholder block
16. add decorative CSS sparkles

### Phase 4 — Logic
17. connect daily mock content
18. add 30-second timer logic
19. add share fallback logic
20. add LINE OA external action

### Phase 5 — Backend
21. connect Supabase
22. store content
23. log sessions
24. log share clicks if needed

### Phase 6 — Polish
25. improve motion
26. improve spacing
27. improve mobile responsiveness
28. replace placeholders with final assets later

---

## 17. Acceptance Criteria

The app is acceptable for the first rough build if:

- page 1 has a tappable card
- tapping card triggers an opening/flip feeling
- app routes correctly to page 2
- page 2 shows fortune and exercise content
- page 3 runs a 30-second timer
- page 4 shows success state with 3 actions
- page 5 shows a harder challenge
- placeholder assets are enough to demo the full flow
- the app does not wait for final art assets to function

---

## 18. Engineering Guardrails

- Keep code readable
- Keep components reusable
- Do not overcomplicate animation
- Do not add unrequested features
- Use placeholders immediately
- Add TODO comments where final assets will replace temporary ones
- If a requirement is unclear, ask before building more

---

## 19. Final Instruction to AI Agent

Build the **rough working version first** with placeholder assets.  
Do not wait for final illustrations.

Priority order:
1. working flow
2. mobile UI
3. card tap + flip interaction
4. timer logic
5. placeholder assets
6. polish

The result should be a **presentation-ready rough prototype** that can later be upgraded with final visual assets.

---

## 20. Quick Placeholder Summary

Use these temporary replacements now:

- **Mascot** → existing lavender blob mascot PNGs, or simple purple blob SVG
- **Card** → purple mystery card with `?`
- **Materials** → Lucide/Heroicons SVGs
- **Exercise images** → simple placeholder illustration or mascot pose
- **Video** → rounded thumbnail block with play icon
- **Sparkles/background** → CSS gradients + small SVG stars

Do **not** block development because final assets are not ready yet.