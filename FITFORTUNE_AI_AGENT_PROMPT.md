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
- Final purple production assets are now included and must be used before any placeholder fallback

---

## 4. Recommended Tech Stack

Current implementation uses:

- **Next.js App Router** through the existing Vinext-compatible project
- **TypeScript**
- **CSS design tokens** with the existing Tailwind import
- **Browser localStorage** for lightweight session logging
- **OpenAI Sites** for production hosting

### Notes
- Use **App Router**
- Use clean, readable folder structure
- Use reusable components
- Keep the existing mock-data module unless a backend is explicitly requested later

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
- The fortune card remains the primary tap target
- A rounded bottom CTA matching the reference layout may trigger the same card-flip action
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
Use the current soft-purple production palette:

- Primary: `#A855F7`
- Primary dark: `#7C3AED`
- Button light: `#BD7CF0`
- Button dark: `#8C4FBE`
- Light purple: `#F3E8FF`
- Background: `#EEE3F9`
- Panel line: `#C9A3E8`
- Accent pink: `#F9A8D4`
- Accent yellow: `#FFD95F`
- Text dark: `#48135F`

The earlier cream/gold draft is a positioning reference only. Do not restore its palette.

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

## 12. Production Asset Strategy (Updated)

Production assets now exist for cards, mascot poses, backgrounds, effects, and fonts. Use those files directly. Placeholder rules below are retained only as a fallback for a future missing asset and do not override the production mapping in Section 21.

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

Maintain the working five-page flow and use the supplied production assets. Do not recolor the purple artwork to gold or brown.

Priority order:
1. working flow
2. mobile UI and reference-position fidelity
3. supplied purple production assets
4. card tap + flip interaction
5. timer logic
6. polish

The result should be a **presentation-ready rough prototype** that can later be upgraded with final visual assets.

---

## 20. Current Production Summary

- **Font** → Arabica regular and italic, loaded locally with `@font-face`
- **Mascot** → supplied purple mascot and Post pose PNGs
- **Card** → supplied purple mystery-card PNGs with CSS flip animation
- **Background** → supplied `BG1.png`, `BG2.png`, and `BG3.png`
- **Effects** → supplied magical orbit and sparkle overlays
- **Materials** → lightweight local UI symbols until dedicated material artwork is supplied
- **Video** → rounded preview panel using the matching purple mascot pose

Do not apply hue rotation, sepia, or gold filters to production artwork.

---

## 21. Implemented Visual System — 2026-08-16

This section records the latest implemented state and overrides older placeholder guidance where there is a conflict.

### 21.1 Reference Usage

- The five-page draft image is used for **layout, scale, grouping, and element positioning only**.
- The active app palette is **soft pastel purple**, based on the supplied BG, Effect, Card, Mascot, and Post files.
- Keep the mobile canvas close to `390px` wide and preserve the bottom-action placement shown in the draft.

### 21.2 Font

All app text uses the local **Arabica** family with Thai-safe fallbacks.

```text
/public/assets/fonts/Arabica.otf
/public/assets/fonts/Arabica-italic.otf
/public/assets/fonts/Arabica.ttf
/public/assets/fonts/Arabica-Italic.ttf
```

- Regular and italic faces are declared with `@font-face`.
- `font-display: swap` is required.
- The font applies globally, including Thai body copy, headings, labels, and buttons.

### 21.3 Background Mapping

```text
/public/assets/backgrounds/BG1.png
/public/assets/backgrounds/BG2.png
/public/assets/backgrounds/BG3.png
```

- Page 1 `/` → `BG1.png`
- Page 2 `/today` → `BG2.png`
- Page 3 `/exercise` → `BG3.png`
- Page 4 `/complete` → `BG1.png`
- Page 5 `/challenge` → `BG3.png`

Backgrounds use cover sizing and centered positioning with only a very light translucent overlay for text readability.

### 21.4 Effect Mapping

```text
/public/assets/effects/Effect1.png
/public/assets/effects/Effect2.png
```

- `Effect1.png` is the magical orbit placed behind the central fortune card on Page 1.
- `Effect2.png` is a low-opacity sparkle overlay used decoratively across the five-page flow.
- Effects must not intercept pointer events or cover readable content.

### 21.5 Post / Pose Mapping

```text
/public/assets/poses/Post1.png
/public/assets/poses/Post2.png
/public/assets/poses/Post3.png
/public/assets/poses/Post4.png
/public/assets/poses/Post5.png
```

- `Post1.png` → available as the neutral/default production pose
- `Post2.png` → Page 2 shoulder movement, video preview, and Page 3 primary pose
- `Post2.png`, `Post3.png`, `Post4.png` → Page 3 three-step movement sequence
- `Post5.png` → Page 4 congratulation pose
- Existing `/public/assets/mascot/Mascot6.png` → Page 5 plank challenge pose

### 21.6 Card and Color Rules

- Use the original purple card assets in `/public/assets/cards/` without color filters.
- Retain the stacked-card placement, central tappable card, glow state, flip animation, and bottom pill CTA from the reference layout.
- Panels are translucent white/lavender with purple borders and soft blur.
- Primary buttons use a lilac-to-purple raised gradient with white text.
- Small warm-yellow sparkles are allowed as accents, but purple remains dominant.

### 21.7 Page Positioning

- Page 1: title at top, central stacked card and orbit, bottom pill CTA.
- Page 2: fortune heading, focus word, shoulder pose, task panel, materials/video panel, bottom CTA.
- Page 3: circular timer, movement pose, three instruction cards, bottom pause/start control.
- Page 4: congratulation heading, large `Post5` mascot, message panel, three action cards.
- Page 5: challenge heading, plank preview, materials, benefits, bottom CTA.

### 21.8 Social Preview

- The purple social card is stored at `/public/og-v3.png`.
- Open Graph and X metadata use this image with the exact text `FITFORTUNE` and `เปิดดวง ฟิตสุขภาพ`.

---

## 22. Page 1 Copy and Focus Update — 2026-08-17

- Main headline: `ดวงวันนี้` / `จะดีไหมนะ?`
- Supporting copy: `เปิดไพ่รับคำแนะนำดีๆ` / `เพื่อสุขภาพคุณวันนี้`
- Remove the separate bottom CTA button completely.
- The fortune card itself is the only interactive opening control.
- Enlarge and center the stacked card, orbit, pedestal, and glow so the opening target is immediately obvious on first load.
- Show a small non-button cue beneath the card: `แตะไพ่เพื่อเปิดดวง`.
- Tapping the card retains the glow, flip animation, and transition to `/today`.

---

## 23. Page 2 Content and Balance Update — 2026-08-17

- Lock the displayed day label to `วันเสาร์`.
- Display the focus area as `“ไหล่”` and add more vertical space after `ดวงจะหนักที่`.
- Change the task second line from `พร้อมแชร์ให้เพื่อน 5 คน` to `เพื่อแก้เคล็ด`.
- Replace the equipment recommendations with three supplied production icons:
  - `/public/assets/recommendations/Rec1.png` → `ร่างกาย`
  - `/public/assets/recommendations/Rec2.png` → `หัวใจ`
  - `/public/assets/recommendations/Rec3.png` → `วิญญาณ`
- Change the recommendation heading to `คำแนะนำ 3 ด้าน`.
- Simplify the video text to `ท่าหมุนไหล่คลายปวดด` and scale it to fill the remaining text area cleanly.
- Move the `เริ่มเลย!` button upward from the bottom edge for better visual balance.

---

## 24. Page 3 Timer Control Position Update — 2026-08-17

- Move the timer control group upward by a base `72px`, plus the viewport height above the `812px` reference canvas, so the gap below the exercise instructions stays approximately `38px` on taller mobile screens.
- Apply the same position to all timer states: `เริ่มจับเวลา`, `หยุดชั่วคราว`, and `ทำต่อ`.
- Keep the existing timer logic, button size, copy, and visual style unchanged.
