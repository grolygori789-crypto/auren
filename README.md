# Auren — GitHub Build 012

Build 12 adds a deliberately isolated experience-polish layer: quieter spatial page transitions, enhanced optical glass refraction around the existing Auren Core renderer, semantic micro-responses after meaningful state changes, and a calmer Halo resting state with luminous fragments revealed only when they communicate change.

The stable Body Intelligence, storage, localization, crop editor, Core Canvas physics and accepted metric-card optical alignment remain untouched.

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
- Rhythm, Signals, Archive and You navigation foundations.
- Native English and Thai locale catalogs.
- Five curated Auren Atmospheres: Pearl Dawn, Mineral Mist, Rose Veil, Sage Haze and Quiet Dusk.
- No account required in V1 foundation.
- Reduced Motion support.
- Installable/offline PWA shell with release-aware cache identity derived from the runtime build source.
- Optional Build 12 experience layer that can fail independently without blocking the stable app runtime.

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
│   │   └── experience.css
│   └── js/
│       ├── app.js
│       ├── config/
│       ├── core/
│       ├── experience/
│       ├── i18n/
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
