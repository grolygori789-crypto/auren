# AUREN

**Personal Health Intelligence**  
**Your body, understood.**

Auren is a mobile-first premium wellbeing PWA by **Benedict Interactive**.

> **Data → Pattern → Meaning → One useful decision**

## Current hardening generation

- **Current production: Build 53**
- Build 52 — Trust & Accessibility Hardening
- Build 53 — PWA / Offline Hardening
- APP_VERSION `0.1.0`
- DATA_SCHEMA_VERSION `4`
- Legal Version `1.0.0`

Verified production HEAD: `39015d7b0a46f82d62989bfd08c4927561ebaadc`

Build 50 remains the physically accepted Core rollback anchor. Build 51 established the protected Today Signature Core direction. Build 53 has passed the tested online and offline PWA flows on P’Benz’s device.

Always inspect actual repository HEAD and `src/js/config/build.js` before assuming a package was uploaded.

## Auren 1 surfaces

- Signature Opening + Auren Core
- Today / Daily State / Halo
- Daily Check-in
- Body Context / Body Intelligence
- One Useful Move
- Rhythm
- Signals
- Archive / Health Memory
- You / Identity / Atmospheres
- Privacy / Data Controls
- Legal Center
- Help / Feedback / optional Support
- English + Thai
- Reduced Motion
- installable/offline PWA

## Product boundaries

Auren is wellbeing/personal intelligence, not medical care.

It does not diagnose, fabricate biomarkers, use guilt streaks, turn self-reports into a health score, treat BMI alone as a weight-loss instruction, infer health from profile photos, or claim that correlation proves causation.

## Local-first V1

No account is required. Ordinary profile and Check-in history is stored locally in browser/device storage.

## Canonical sources

Before product/design/engineering/QA work:

1. Read [`docs/product/AUREN_MASTER_PLAN.md`](docs/product/AUREN_MASTER_PLAN.md).
2. Read [`docs/handoff/AUREN_ROOM_MIGRATION_PROMPT.md`](docs/handoff/AUREN_ROOM_MIGRATION_PROMPT.md).
3. Inspect current repository HEAD.
4. Inspect `src/js/config/build.js`.
5. Inspect `sw.js`.
6. Inspect the implementation being changed.

Current production wins if newer than documentation.

## QA status

Full-System QA Wave 1 found no Critical static/data-loss/startup blocker in reviewed paths.

The current hardening cycle closes:
- Halo recent-continuity truth,
- Goal/Privacy copy accuracy,
- EN/TH accessibility labels,
- base modal focus containment,
- navigation-only offline fallback.

Post-Wave-1-hardening operational readiness estimate:

> **91% ±3%**

Wave 1 runtime hardening has passed tested mobile/PWA physical flows. Longitudinal evidence and final RC regression remain open gates.

## Longitudinal gates

Rhythm:
- 1–3 Check-ins: early observations
- 4–5: baseline emerging
- 6+: personal baseline

Signals:
- minimum 8 paired days before a relationship can qualify
- variation, strength and stability gates still apply

Archive:
- monthly intelligence remains conservative
- weight-only history never becomes Daily State

## Development / packaging

Runtime change:
- increment Build
- synchronize Build/cache/SW
- preserve Schema unless data model changes

Docs-only:
- no Build bump

GitHub delivery:
- canonical repo-relative paths
- Update Only ZIP = exact changed files
- ZIP root = repo root
- no wrapper
- Commit name <=50 characters

## Local development

Use HTTP, not `file://`, for ES modules and Service Worker behavior.

```bash
python -m http.server 8080
```

© 2026 Benedict Interactive. All rights reserved.
