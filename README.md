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
│   │   └── app.css
│   └── js/
│       ├── app.js
│       ├── config/
│       ├── core/
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
