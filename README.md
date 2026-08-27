# Auren — GitHub Build 025

Build 25 final-polishes the Daily Check-in sheet after physical-device review. It corrects the slider color semantics so positive observations no longer drift into warning red at higher values, while Stress retains a distinct calm-to-attention path. It also gives the Daily Check-in sheet more breathing room from the viewport edges and refines internal spacing so the experience feels quieter and more premium. This build upgrades only the interactive Daily Check-in sheet and leaves data, logic, thresholds and read-only scales unchanged.

# AUREN

**Personal Health Intelligence**  
**Your body, understood.**

Auren is a mobile-first premium wellness product by **Benedict Interactive**. It is designed to help people understand patterns between daily life and their own reported state through calm, explainable, privacy-conscious personal intelligence.

> **Runtime status:** Foundation implementation

## Canonical project source

Before product, design, engineering, marketing, QA or architecture work:

1. Read [`docs/product/AUREN_MASTER_PLAN.md`](docs/product/AUREN_MASTER_PLAN.md).
2. For a new ChatGPT room or handoff, also read [`docs/handoff/AUREN_ROOM_MIGRATION_PROMPT.md`](docs/handoff/AUREN_ROOM_MIGRATION_PROMPT.md).
3. Inspect the current repository HEAD before implementation work.

The Master Plan is the canonical operating foundation. Current production/live implementation outranks it only where the Master Plan explicitly defines that conflict order.

## Current foundation runtime

The foundation runtime establishes the first real Auren application shell:

- Signature Opening with the living Auren Core.
- First-launch opening of about 4 seconds; normal reload launch is compressed.
- Today shell with truthful no-data state.
- Daily Check-in for self-reported sleep, energy, stress, mood and movement.
- Local IndexedDB persistence for daily observations.
- Rhythm V1 Personal Pattern Intelligence and Signals V1 Relationship Intelligence, both gated by evidence depth.
- Archive and You navigation foundations.
- Native English and Thai locale support.
- Five curated Auren Atmospheres: Pearl Dawn, Mineral Mist, Rose Veil, Sage Haze and Quiet Dusk.
- No account required in V1 foundation.
- Reduced Motion support.
- Installable/offline PWA shell with release-aware cache identity derived from the runtime build source.
- Optional Build 12 experience layer that can fail independently without blocking the stable app runtime.
- Build 13 Living Core Evolution with runtime fallback to the accepted renderer.
- Build 14 local Data Controls for single-day deletion and full on-device erasure.
- Build 16 clean Signature Opening handoff accepted on physical-device review.
- Build 17 isolated Living Rhythm layer with static/performance fallbacks.
- Build 18 Rhythm early-state physical-device polish.
- Build 19 isolated Signals relationship layer with evidence/stability guardrails.
- Build 20 Signals final-state copy/hierarchy polish from physical-device review.
- Build 21 isolated Today Daily State contextual detail interactions.
- Build 25 final Daily Check-in polish with corrected color semantics and improved sheet spacing.

No diagnostic claim or inferred health score is produced in this foundation build. Daily Check-in values are stored as user observations only.

## Runtime map

```text
auren/
├── index.html
├── manifest.webmanifest
├── sw.js
├── assets/
│   └── icons/
├── src/
│   ├── css/
│   │   ├── tokens.css
│   │   ├── app.css
│   │   ├── experience.css
│   │   ├── privacy.css
│   │   ├── rhythm.css
│   │   ├── signals.css
│   │   └── today-detail.css
│   └── js/
│       ├── app.js
│       ├── config/
│       ├── core/
│       ├── experience/
│       ├── i18n/
│       ├── privacy/
│       ├── rhythm/
│       ├── signals/
│       ├── today/
│       └── storage/
└── docs/
```

## Day Zero product constraints retained

- Mobile-first Premium PWA / Web App.
- Web-first, not web-limited.
- No Bluetooth or wearable requirement in V1.
- No diagnosis, pseudo-science, fabricated medical claims or dark patterns.
- Trust → Usability → Clarity → Beauty → Delight.
- Early Access direction: full experience, optional support, premium-ready architecture.

## Local development

ES modules and Service Workers require an HTTP origin. Use any simple static server rather than opening `index.html` through `file://` when testing the complete PWA behavior.

Example:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080/`.

© 2026 Benedict Interactive. All rights reserved.


## Build 4 — Auren Atmospheres

Adds five curated tonal environments across the full UI: Pearl Dawn, Mineral Mist, Rose Veil, Sage Haze, and Quiet Dusk. Atmospheres are persistent local preferences and harmonize gradients, glass surfaces, cards, navigation, accents, and Core tint without adding account requirements.


## Build 5 — Signature Opening

Refines the Auren brand entrance into a deliberate premium sequence: a thinner optical glass rim, champagne-gold-dominant fluid with a restrained pale-aqua undertone, staged AUREN/tagline/studio reveals, and a longer cold-launch hold before the Core morphs into Today. Normal cold launches hold the signature sequence for about 3.7 seconds before transition; first launch holds for about 4.15 seconds. Warm resume does not replay the opening because the document remains active.

## Build 6 — Body Intelligence Foundation

Adds Body Profile, adult body-context reference logic, age guardrails, explainable evidence, Auren Halo state logic and One Useful Move without exposing fabricated health precision.

## Build 7 — Luxe Core, Instrument Halo & Profile Identity

Refines the live product after physical-device review:

- Auren Core glass is materially clearer and thinner: rim strokes, lower refraction and perimeter tint are reduced while specular highlights and contact shadow preserve depth.
- Auren Halo is redesigned from a heavy segmented progress ring into a fine instrument-like double orbit with restrained luminous fragments and four state nodes.
- Daily observations render semantic states (for example Excellent, Calm or High stress) with the raw 1–5 observation retained only as quiet provenance. Stress direction is not treated like positive metrics.
- The post-check-in message is written as human product language rather than database status.
- Users can add, change or remove a profile photo. The image is center-cropped and compressed locally, then stored in the existing local IndexedDB profile record. It is not analyzed and is not uploaded by this build.
- The chosen profile photo appears in the top-right identity control and on the You screen.

Build 7 keeps the existing 3.7–4.15 second Signature Opening, five Auren Atmospheres, Body Intelligence safety model and local-first architecture.


## Build 8 — Personal Presence & Living Core

Build 8 focuses on daily presence rather than feature count:

- Living Core motion is materially more perceptible at idle while remaining calm and physically weighted. A subtle mineral-aqua vein circulates inside the champagne-dominant fluid, and Core reactions are briefly amplified after check-in/profile updates.
- Profile identity now supports a local display name. Today greets the user by name when one is set, while remaining neutral when no name exists.
- Profile photo selection now opens an on-device circular crop editor with drag positioning, zoom control, reset, cancel and final preview before saving. The cropped photo remains local to the device.
- Post-check-in hierarchy is quieter: the edit-check-in action is secondary, semantic state cards are more legible on small screens, and One Useful Move is surfaced before deeper Halo explanation.
- Auren Halo is further refined into a finer instrument with subtle scale ticks, hairline orbits, shorter luminous evidence fragments and quieter state nodes.
- English and Thai share feature parity and preserve native copy rather than literal translation.

Build 8 keeps the existing Signature Opening timing, five Auren Atmospheres, Body Intelligence guardrails and local-first PWA architecture.

## Build 9 — Contextual Intelligence & Premium UX

Build 9 turns several foundation features into a coherent personal-intelligence system:

- Locks page-level pinch zoom so the installed PWA behaves like an app; the profile crop editor still supports deliberate pinch-to-zoom inside its own viewport.
- Removes decorative crop reflections that could look baked into the photo. The saved image contains image pixels only.
- Replaces the wide gauge-like Halo with four close, soft semantic light fragments: Body Context, Daily State, Movement and Personal Trend.
- Adds `Sex used for health calculations` as a calculation-only profile field, separate from identity or avatar appearance.
- Adds training type, training frequency, richer goals, optional waist circumference and optional measured body-fat percentage.
- Reworks Body Intelligence so BMI remains a general screening reference rather than an automatic weight-loss instruction. Resistance/athletic context can reduce confidence in a BMI-only conclusion without inventing a special athlete BMI threshold.
- Adds weight-history capture when Body Profile weight changes.
- Expands Archive into `Portraits / Calendar`, with daily detail, weight-update markers and conservative monthly summaries.
- Adds a branded neutral Auren Orb / initial fallback when no profile photo is used.
- Adds field-level explainability sheets plus a central `How Auren works` guide covering Today, Body Context, Halo, Rhythm, Signals, Archive, Atmospheres, identity, evidence and privacy.
- Increases Living Core motion so the fluid reads as alive within roughly a second while remaining calm and physically weighted.
- Further thins the glass rim so the sphere is defined more by refraction and highlights than by an outline.

Build 9 preserves local-first storage, EN/TH parity, the five Auren Atmospheres, the Signature Opening, and the rule that Auren does not diagnose disease or fabricate precision.


## Build 011 update
- Fixed optical centering for the Sleep, Energy, Stress, Mood, and Movement symbols in the daily state cards.
- Added per-icon alignment offsets so each symbol appears visually centered, not only mathematically centered.
- Preserved the premium card treatment while improving polish on real mobile screens.

## Build 12 — Quiet Spatial Polish

Build 12 intentionally avoids invasive changes to systems already accepted in production:

- Adds restrained spatial page transitions with subtle depth and blur recovery.
- Adds a lightweight optical refraction layer over the existing Core Canvas instead of rewriting Core physics.
- Makes the Halo effectively disappear at rest, removing marker-like stray lines from the hero composition.
- Reveals soft semantic Halo fragments briefly after meaningful check-in/profile changes or direct Core interaction.
- Adds a short state-copy micro-transition when Today meaning changes.
- Keeps Reduced Motion as a first-class fallback.
- Loads the entire Build 12 experience layer non-blockingly. If the optional enhancement fails to load, the stable Auren runtime continues unchanged.
- Advances runtime/cache identity to Build 12 while preserving data schema version 4.

Regression policy for this and future upgrades: stable production systems are protected by default; meaningful-risk changes require an explicit rollback/fallback path and should be isolated or redesigned rather than shipped as invasive rewrites.

## Build 13 — Living Core Evolution

Build 13 concentrates the upgrade on the Today Core rather than broadening feature scope:

- Preserves the accepted Signature Opening on the previous renderer.
- Adds independent internal circulation so the liquid no longer reads as one repeating slosh pattern.
- Adds restrained champagne-gold, mineral-aqua and pearl material layers inside one coherent liquid body.
- Adds subtle micro-undulation at the fluid surface and a drifting mineral vein for depth.
- Uses existing semantic Halo state as a visual input without changing Body Intelligence logic or storing new data.
- Attention states shift slightly cooler, quieter and less luminous; positive states become subtly warmer/clearer. No state turns muddy, grey or punitive.
- Existing check-in/profile Core reactions now also energize the inner flow briefly before settling.
- Keeps Reduced Motion behavior.
- Includes two rollback paths: exception fallback to the accepted renderer and automatic performance fallback after sustained expensive render frames.
- Advances runtime/cache identity to Build 13 while preserving data schema version 4.

## Build 14 — Privacy & Data Controls

Build 14 adds explicit user control over locally stored Auren data while keeping the accepted runtime isolated from destructive-operation logic:

- Adds `Data controls` on the You screen with native English and Thai copy.
- Allows deleting today's check-in without touching the profile or other days.
- Adds `Delete this day` to Daily State Detail when that date contains a check-in.
- Keeps weight-only Archive entries untouched by single-check-in deletion to avoid silently deleting a different kind of evidence.
- Adds `Erase all local data` with two deliberate confirmation stages.
- Full erase deletes the local `auren` IndexedDB database and Auren-prefixed local preferences on that device. App assets/service-worker caches are not treated as user data.
- Reloads after successful destructive actions so Today, Halo, Archive and longitudinal summaries rebuild from the remaining source data instead of maintaining stale in-memory state.
- Does not change data schema version 4.
- Keeps `app.js`, Body Intelligence, Build 13 Core rendering and accepted layout code unchanged.
- Isolates the feature in `src/js/privacy/` and `src/css/privacy.css`; the core runtime remains available if the UI enhancement fails to initialize.

Regression/rollback boundary: removing the Build 14 privacy-module import and its Service Worker assets returns the runtime to the accepted Build 13 behavior without modifying stored records.

## Build 15 — Seamless Launch & In-place Data Refresh

Build 15 is a regression-focused transition repair:

- Prevents single check-in deletion from replaying the Auren Signature Opening.
- Refreshes Today, Halo and Archive directly from IndexedDB after a single deletion while preserving the active primary screen and Archive mode.
- Keeps `Erase all local data` as a true fresh restart because preferences and identity are intentionally removed.
- Guards the cold-launch Core handoff so the Opening Core and Today Core are not visible in the same rendered frame.
- Hides the outgoing Opening Core before Today Core is revealed in the same handoff task, removing the smaller/lower ghost reported on physical devices.
- Aligns the PWA `background_color` and `theme_color` with Pearl Dawn (`#f3e6da`) to reduce the visual jump from the Android system splash. Android may still show the installed app icon during its OS-controlled splash.
- Leaves Living Core physics/material, Body Intelligence, local schema version 4, check-in/profile storage logic and Signature Opening timing unchanged.
- The data-control refresh bridge has a visible fallback if an in-place refresh cannot complete; it never silently reloads a single deletion into the Signature Opening.

Rollback baseline remains Build 13 for the broader Build 14/15 data-control series until physical-device acceptance is confirmed.


## Build 16 — Clean Signature Handoff

Build 16 is a narrow physical-device launch repair layered over Build 15:

- Removes the 790 ms Opening-Core-to-Today-Core morph that could read as a frozen standalone orb after the animated logo sequence.
- Fades the Opening Core and AUREN identity together instead of leaving an orb-only handoff phase.
- Reveals the already-running Today Core only while the opaque opening background still covers the app, waits two paint frames, then dissolves the background into the complete Today screen.
- Keeps the accepted first-launch and repeat-launch hold timing unchanged.
- Does not modify Living Core physics/material, Body Intelligence, check-in data, profile data, local schema version 4, layout, localization or Build 15 in-place deletion behavior.
- Ships as an isolated fail-open launch guard. If the guard cannot load, startup falls back to Build 15 behavior rather than blocking the app.

Rollback: remove the Build 16 launch-handoff import and Service Worker asset to return to Build 15. Build 13 remains the broader known-good rollback baseline for the Build 14+ data-control series until physical-device acceptance is complete.

## Build 17 — Rhythm V1 / Living Rhythm

Build 17 turns longitudinal check-in history into a calm, explainable pattern surface without changing the accepted Today or Core systems:

- Replaces the Rhythm placeholder at runtime with an isolated `src/js/rhythm/rhythm.js` enhancement; if it cannot load, the Build 16 placeholder remains available.
- Adds selectable 7 / 14 / 30-day windows using only locally stored check-ins.
- Introduces the Living Rhythm ribbon: a Canvas2D temporal trace with restrained biological motion, internal light movement and touch/keyboard day inspection.
- The ribbon is not an ECG, pulse measurement or physiological simulation. Presentation motion never changes the underlying data and does not claim sensor input.
- Builds the visual shape from Sleep, Energy, Mood, Movement and inverse Stress direction so the vertical language stays internally coherent. No composite health score is displayed or persisted.
- Adds conservative personal-pattern states: learning, forming, relatively steady, still changing, or a recent directional change when enough observations exist.
- Requires at least six check-ins before describing an earlier-vs-later directional change and keeps small changes below a deliberate threshold out of the headline.
- Adds Personal Baseline rows for the five observations without population ranking or moralized targets.
- Adds continuity and qualitative Confidence based on the amount of real history supporting the selected view.
- Adds `Why this?` evidence explaining Observed / Calculated / Inferred provenance and limitations, including the fact that Rhythm does not prove cause and effect.
- Supports native English and Thai copy inside the isolated Rhythm module, Reduced Motion, keyboard inspection and a runtime performance fallback that removes expensive glow/motion before affecting the stable app.
- Does not change the IndexedDB model or data schema version 4.
- Does not modify `app.js`, Living Core physics, Body Intelligence, Signature Opening, Data Controls, Archive logic or stable Today layout.

Rollback: remove the Build 17 Rhythm import plus `src/js/rhythm/rhythm.js` / `src/css/rhythm.css` from the Service Worker. Build 16 remains the immediate known-good production baseline.

## Build 18 — Rhythm Early-State Polish

Build 18 responds directly to physical-device review of Rhythm with sparse history:

- Introduces three explicit maturity states for the selected Rhythm window: `Early observations` (1–3 check-ins), `Baseline emerging` (4–5), and `Personal baseline` (6+).
- Stops calling a single recorded day a “typical level” or personal baseline. One day is presented as an observation, not a pattern.
- Makes the Living Rhythm hero adapt its vertical footprint to evidence depth so one or two observations do not sit inside an oversized empty visualization.
- Adds a restrained temporal scaffold and start/today anchors so sparse data has clear time context without inventing missing values.
- Uses a softly pulsing recorded point for one-day history and a provisional dashed connector for two-to-three recorded days. The mature ribbon treatment appears only as continuity develops.
- Changes interaction guidance from “Tap the ribbon” to point-specific wording while no real ribbon exists yet.
- Fixes English singular/plural copy (`1 check-in`, not `1 check-ins`).
- Refines Continuity into a compact `recorded / window` instrument such as `1 / 7`, avoiding a large score-like standalone number.
- Keeps baseline tracks descriptive and visually neutral; Stress direction remains semantically distinct and no health score is introduced.
- Keeps 7 / 14 / 30-day windows, evidence sheets, EN/TH parity, keyboard access, Reduced Motion, and performance fallback.
- Does not modify `app.js`, Living Core, Body Intelligence, Signature Opening, Archive, Data Controls, IndexedDB structure, or data schema version 4.

Rollback: remove the Build 18 Rhythm files and restore the Build 17 versions of `src/js/rhythm/rhythm.js` and `src/css/rhythm.css`. Build 16 remains the broader pre-Rhythm production baseline.

## Build 19 — Signals V1 / Relationship Intelligence

Build 19 turns the existing Signals placeholder into a calm, evidence-gated relationship surface without changing stored health data or the accepted Today/Rhythm systems:

- Replaces the Signals placeholder at runtime with an isolated `src/js/signals/signals.js` enhancement; if it cannot load, the existing placeholder remains available.
- Adds selectable 14 / 30-day evidence windows using only locally stored daily check-ins.
- Compares all ten pairings across Sleep, Energy, Stress, Mood and Movement using rank-based association appropriate to the ordinal 1–5 observations.
- Requires at least eight paired days before any relationship can surface. Pairs also need enough variation in both observations and a conservative strength threshold; larger samples use a stability check to prevent a relationship that reverses direction across the window from being promoted.
- Surfaces at most the strongest primary relationship plus one secondary relationship. Weaker pairs stay intentionally quiet.
- Never displays a numerical correlation coefficient, composite health score, causal claim or medical conclusion.
- Adds a living Canvas2D Evidence Field: five restrained observation nodes remain unconnected while evidence is insufficient; earned relationships appear as thin champagne/mineral filaments with subtle internal light motion. The motion is presentation, not physiology or sensor data.
- Adds explicit sparse-history states including one-day and pre-threshold copy so the page remains intentional before relationship inference is possible.
- Adds qualitative Confidence, evidence depth, `Why this?` provenance, minimum-evidence explanation and limitations in native English and Thai.
- Supports Reduced Motion and a runtime performance fallback that removes expensive glow/motion before affecting the stable app.
- Does not modify `app.js`, Living Core, Body Intelligence, Rhythm analysis, Signature Opening, Archive, Data Controls, IndexedDB structure, or data schema version 4.

Rollback: remove the Build 19 Signals import plus `src/js/signals/signals.js` / `src/css/signals.css` from the Service Worker. Build 18 remains the immediate known-good production baseline.

## Build 20 — Signals Final Polish

Build 20 closes the initial Signals V1 surface after physical-device review without changing the accepted relationship engine:

- Fixes the secondary card so it never says `Another relationship worth watching` unless a real second relationship has passed the same evidence gate.
- Uses `No secondary signal yet` while no second relationship exists, with separate copy for pre-threshold listening and post-threshold quiet states.
- Keeps the secondary card visually restrained but readable instead of making an evidence-empty state look disabled.
- Preserves the 8 paired-day minimum, variation checks, strength threshold, stability guard, primary/secondary ranking, no-causation language and qualitative confidence behavior exactly as in Build 19.
- Preserves EN/TH meaning parity, 14/30-day evidence windows, Reduced Motion and the Canvas2D Evidence Field.
- Does not modify `app.js`, Today, Living Core, Body Intelligence, Rhythm, Archive, Data Controls, IndexedDB structure, relationship math or data schema version 4.

Rollback: restore the Build 19 versions of `src/js/signals/signals.js` and `src/css/signals.css` and return the runtime/cache marker to Build 19. Build 19 remains the immediate rollback baseline.

## Build 21 — Today Deep Interaction

Build 21 deepens the accepted Today experience without changing health intelligence, storage or the five-card layout:

- Makes Sleep, Energy, Stress, Mood and Movement Daily State cards keyboard/touch interactive while preserving their accepted 3+2 visual composition and optical icon alignment.
- Opens an isolated premium contextual sheet in place rather than navigating away from Today.
- Shows the exact self-reported 1–5 observation, the same qualitative label already used by Today, a restrained five-position input rail, and clear Observed provenance from today's check-in.
- Adds short metric-specific copy describing only what the user reported. Stress keeps inverse semantic direction: higher stress is attention and is never framed as a positive score.
- Explains how Auren uses the observation as one part of Daily State and later personal history without introducing a new inference, health score, diagnosis or population comparison.
- Adds subtle press/material motion and value/label reveal using the Web Animations API where available, with Reduced Motion and CSS fallbacks.
- Adds touch, Enter/Space, Escape, backdrop-close, focus restoration and screen-reader labels without changing the original check-in workflow.
- Ships as an isolated fail-open module in `src/js/today/metric-detail.js` plus `src/css/today-detail.css`. If either enhancement cannot initialize, Build 20 Today remains usable exactly as before.
- Does not modify `app.js`, Living Core, Halo, Body Intelligence, Rhythm, Signals, Archive, Data Controls, IndexedDB structure or data schema version 4.

Rollback: remove the Build 21 Today-detail import and Service Worker assets to return immediately to Build 20 behavior. Build 20 remains the known-good production baseline for this interaction layer.


## Build 22 scope

This build intentionally upgrades **only the interactive Daily Check-in sliders**. It does **not** recolor the read-only bars used in Rhythm, Signals or Today detail views.

### What changes

- Adds a dedicated visual-polish module for the Daily Check-in sheet.
- Detects the check-in sheet in-place and upgrades the five range inputs without changing `app.js`.
- Applies subtle dual-tone rails:
  - Sleep / Energy / Mood / Movement: cool mineral-aqua on the low side, warm champagne / rose-amber on the high side.
  - Stress: calm mineral on the low side, muted ember / dusty rose on the high side.
- Keeps the interaction quiet and premium by using low-saturation gradients, pearl midpoint blending and refined thumbs instead of loud blue/red rails.
- Leaves all stored values, health interpretation, Body Intelligence, Today cards, Rhythm baseline rails and Signals visuals unchanged.

### Regression safety

- `app.js` is not modified.
- Build 21 remains the rollback baseline.
- If the visual-polish module or stylesheet fails to load, the existing native sliders continue to work.

### Files changed in Build 22

- `README.md`
- `sw.js`
- `src/js/config/build.js`
- `src/js/today/checkin-slider-polish.js`
- `src/css/today-checkin.css`


## Build 23 — Check-in Slider Binding Hotfix

- Fixes the Build 22 timing/binding defect that left the native gold sliders visually unchanged on physical Android.
- Targets `#checkin-sleep`, `#checkin-energy`, `#checkin-stress`, `#checkin-mood`, and `#checkin-movement` directly rather than inferring the sheet from transient DOM content.
- Re-applies after `#checkinFields` is dynamically rebuilt and when the check-in button is opened.
- Makes the two-tone rail visually distinct enough to read on a real phone while keeping the palette muted and premium.
- Stress keeps its dedicated calm-mineral → muted-attention palette.
- Does not modify `app.js`, stored check-in values, Body Intelligence, Rhythm baseline bars, Signals, Archive, or Today read-only details.
- Build 22 remains functionally safe; Build 21 is the broader rollback baseline.

## Build 24 scope

This build intentionally refines **only the interactive Daily Check-in sliders**. It does **not** recolor read-only bars in Today detail, Rhythm, Signals or Archive.

### What changes

- The **filled portion** of each slider now reflects the current value, not a static dual-tone rail.
- Lower values lean **mineral blue**, midpoint values move through a soft **champagne neutral**, and higher values shift toward a muted **rose-red**.
- The **unfilled track** remains a neutral pearl rail for clarity and restraint.
- The thumb becomes a **smaller pearl capsule** with a subtle gold accent, replacing the heavier gold circular thumb.
- The binding path targets Auren's canonical check-in input IDs and re-applies on dynamic re-render so the styling persists when the check-in sheet is opened.

### Regression safety

- `app.js` is not modified.
- Stored data, thresholds, Body Intelligence, Today cards, Rhythm, Signals and accepted read-only scales remain unchanged.
- If the isolated module or stylesheet fails to load, the native check-in sliders continue to function.

### Files changed in Build 24

- `README.md`
- `sw.js`
- `src/js/config/build.js`
- `src/js/today/checkin-slider-polish.js`
- `src/css/today-checkin.css`

## Build 25 scope

This build intentionally refines **only the interactive Daily Check-in sheet**. It does **not** change Today cards, Today detail, Rhythm, Signals, Archive, Body Intelligence or stored data.

### What changes

- Positive sliders (**Sleep, Energy, Mood, Movement**) now map from **mineral blue → champagne neutral → warm gold**, avoiding warning-like red on high values.
- **Stress** keeps a distinct **calm mineral → champagne neutral → muted rose-red** path because higher stress should read as attention-oriented rather than positive.
- The filled portion remains the only colored portion; the unfilled track stays neutral pearl.
- The Daily Check-in sheet gets more **breathing room** with refined width, side padding, corner radius and bottom-safe spacing.
- Internal spacing is tightened and balanced so the sheet no longer appears to collide with screen edges on mobile.

### Regression safety

- `app.js` is not modified.
- Binding still targets Auren's canonical check-in IDs directly.
- If the isolated module or stylesheet fails, the native check-in controls still function.

### Files changed in Build 25

- `README.md`
- `sw.js`
- `src/js/config/build.js`
- `src/js/today/checkin-slider-polish.js`
- `src/css/today-checkin.css`

