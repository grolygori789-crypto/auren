# AUREN

**Personal Health Intelligence**  
**Your body, understood.**

Auren is a mobile-first premium wellness product by **Benedict Interactive**. It is being designed to help people understand patterns between daily life and their own reported state through calm, explainable, privacy-conscious personal intelligence.

> **Status:** Pre-production / Day Zero Foundation

## Canonical project source

Before product, design, engineering, marketing, QA or architecture work:

1. Read [`docs/product/AUREN_MASTER_PLAN.md`](docs/product/AUREN_MASTER_PLAN.md).
2. For a new ChatGPT room or handoff, also read [`docs/handoff/AUREN_ROOM_MIGRATION_PROMPT.md`](docs/handoff/AUREN_ROOM_MIGRATION_PROMPT.md).
3. Inspect the current repository HEAD before implementation work.

The Master Plan is the canonical operating foundation. Current production/live implementation outranks it only where the Master Plan explicitly defines that conflict order.

## Repository map

```text
auren/
├── README.md
├── LICENSE.md
├── .gitignore
├── .gitattributes
├── .editorconfig
├── docs/
│   ├── product/         # Canonical Master Plan
│   ├── handoff/         # New-room / continuity prompt
│   ├── reference/       # Presentation/reference copies
│   ├── engineering/     # Operating engineering rules
│   ├── design/          # Brand / UX / motion systems
│   ├── architecture/    # App / data architecture
│   └── qa/              # QA and release standards
├── src/
│   ├── css/
│   ├── js/
│   ├── components/
│   └── data/
├── assets/
│   ├── brand/
│   ├── icons/
│   ├── images/
│   ├── motion/
│   └── audio/
├── tests/
└── scripts/
```

Empty foundation folders use a temporary `.gitkeep` only so Git preserves the intended structure. Remove it when the first real file enters that folder.

## Day Zero product constraints

- Mobile-first Premium PWA / Web App.
- Web-first, not web-limited.
- No Bluetooth or wearable requirement in V1.
- No diagnosis, pseudo-science, fabricated medical claims or dark patterns.
- Trust → Usability → Clarity → Beauty → Delight.
- Early Access direction: full experience, optional support, premium-ready architecture.

## Repository discipline

See [`docs/engineering/REPOSITORY_HYGIENE.md`](docs/engineering/REPOSITORY_HYGIENE.md).

© 2026 Benedict Interactive. All rights reserved.
