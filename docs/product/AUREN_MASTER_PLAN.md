# A U R E N

> **Your body, understood.**

**MASTER PLAN · CANONICAL CONTINUATION EDITION · Revision 3.0**  
Product · Design · Engineering · Intelligence · Trust · Privacy · Growth · QA · Handoff  
Benedict Interactive · 28 August 2026

Status: **Canonical operating source of truth for continued Auren development**

---

# 0. Executive Continuity Card — อ่านส่วนนี้ก่อนทุกอย่าง

Auren คือ **Personal Health Intelligence** ไม่ใช่ health tracker ที่เอากราฟสวยๆ มาห่อข้อมูลเดิม จุดหมายคือทำให้ผู้ใช้เข้าใจความสัมพันธ์ระหว่างชีวิต บริบทของร่างกาย ภาวะประจำวัน และแนวโน้มของตัวเอง แล้วเปลี่ยนข้อมูลให้เป็นความหมายที่เชื่อถือได้และการตัดสินใจที่มีประโยชน์หนึ่งอย่าง

**Product:** AUREN  
**Category:** Personal Health Intelligence  
**Primary tagline:** **Your body, understood.**  
**Studio:** Benedict Interactive  
**Initial platform:** Mobile-first Premium PWA / Web App  
**Primary promise:** **Data → Pattern → Meaning → One useful decision**

## Current production baseline at this revision

Repository: `grolygori789-crypto/auren`  
Branch: `main`  
Verified HEAD at document creation: `b1af5d2b4c8c4ba89f58f9c1143ff7745967658a`  
Runtime: **Build 29**  
Data schema marker: **4**  
Physical-device status: **Build 29 accepted by P’Benz**  
Next runtime batch: **Build 30** unless a newer repo HEAD has already advanced it

Important known-good anchors:
- **Build 16** — accepted clean Signature Opening handoff
- **Build 20** — Signals V1 physically reviewed / provisional production acceptance
- **Build 21** — Today metric detail interaction foundation
- **Build 25** — Daily Check-in slider semantics + spacing physically accepted
- **Build 27** — recovery from rejected Build 26 startup regression; physically accepted
- **Build 29** — current Archive / Daily Health Memory baseline; physically accepted

Critical warning:
- **Build 26 is rejected. Do not re-enable its runtime approach.**
- `src/js/today/checkin-guidance.js` may still exist as an **orphaned, unreferenced file** from Build 26. It must remain unimported/un-cached until deliberately redesigned or removed in a safe hygiene batch.

Current planned continuation if P’Benz gives no newer explicit direction:
1. **Build 30 — You / Settings Final Polish**
2. **Build 31+ — Full-System QA & Production Hardening**
3. Longitudinal QA once real history is sufficient for Rhythm / Signals / Archive maturity states
4. Revisit the shared Daily Check-in scale explainer only with an **on-demand, non-startup, fail-open** design

This document is deliberately complete enough that a new room should not need to ask historical questions before continuing.

---

# 1. Authority — Full Authorized DEV 100%

In Auren, “บิ๊ว” acts as **Full Authorized DEV 100%**, equivalent in operating responsibility to:
- Founder-Operator
- Product Owner
- Principal Product Designer
- CTO / Technical Lead
- Trust & Privacy Lead
- Growth / Packaging Lead
- Release / QA Lead

P’Benz remains the legal owner of the project and IP, proposes ideas, identifies defects, sets explicit constraints, and is the primary physical-device acceptance tester. Product/design/engineering choices inside the agreed North Star are delegated to บิ๊ว.

Rules:
- Do not follow an idea automatically merely because P’Benz proposed it. If a better product path exists, choose it and explain briefly.
- Do not ask P’Benz to restate information recoverable from this Master Plan, the Migration Prompt, current production, repo history, approved assets, or the current conversation.
- Ask only when information is genuinely new/unrecoverable, a credential/consent is required, or an irreversible external action needs explicit owner approval.
- **Product authority does not equal remote-write authority.** Default GitHub workflow is to prepare canonical files/packages for P’Benz to upload manually. Do not push/write remotely unless P’Benz explicitly instructs it in the current turn.

---

# 2. Source of Truth & Conflict Order

Canonical sources:
1. `docs/product/AUREN_MASTER_PLAN.md`
2. `docs/handoff/AUREN_ROOM_MIGRATION_PROMPT.md`
3. Current production in `grolygori789-crypto/auren` branch `main`
4. Approved product assets and physical-device screenshots
5. Repository history / README release notes
6. Older chat context

Conflict order:

> **latest explicit instruction from P’Benz → current production/live implementation → Master Plan → approved assets → repo/history → older chat context**

Before any substantial implementation:
1. Read the Master Plan and Migration Prompt.
2. Inspect current repo HEAD.
3. Inspect `src/js/config/build.js`.
4. Inspect Service Worker/cache identity.
5. Inspect data schema/storage if relevant.
6. Inspect the current implementation of the surface being changed.
7. Establish a known-good baseline.
8. Define a narrow changed-file allowlist.
9. Define rollback/fallback for meaningful-risk changes.
10. Implement surgically.
11. Perform scoped regression QA.
12. Package canonical repo-relative files.
13. Send clickable file links and a **Commit name <=50 characters in a code block**.

---

# 3. North Star & Product Promise

Auren helps users understand:
- what they can observe today,
- how today compares with their own recent history,
- what relationships may be emerging,
- what context changes the meaning of a number,
- and whether one small action is justified — or whether nothing needs changing.

The core emotional and functional outcome is two simultaneous thoughts:

> **“I understand myself better.”**  
> **“Why does this feel so unusually considered and expensive?”**

Early-access emotional target:
> **“This feels like a billion-dollar premium app, and I somehow got special access to it.”**

Premium must come from restraint, hierarchy, material detail, coherence, responsiveness, trust, and polished interaction — never from visual clutter.

---

# 4. What Auren Is Not

Auren is not:
- a medical diagnosis app
- a doctor replacement
- a fitness-bro tracker
- a calorie/macros diary
- a guilt streak app
- a habit-addiction machine
- a generic wellness dashboard
- an AI chatbot where “AI” is the hero
- a pseudo-scientific health score
- a body-shaming weight-loss funnel
- a social feed
- a wearable-dependent product in V1

Default rule: **Auren should feel smarter because it understands context better, not because it has more menus.**

---

# 5. Product Principles — Non-Negotiable

| Principle | Operating rule |
|---|---|
| Trust before intelligence | If it appears smarter but becomes less believable, it is worse. |
| Usability before spectacle | Beautiful but harder to use = fail. |
| Complex underneath, calm on surface | Internal logic can be rich; UI must remain quiet. |
| Evidence before claims | Important meaning must have a traceable basis. |
| Personal baseline first | Compare users with themselves before population judgment. |
| Context before judgment | Never let one metric define the person. |
| Progressive disclosure | Explain deeply on demand, not by crowding the main surface. |
| No fake precision | No invented 92/100 health score. |
| No addiction mechanics | No guilt streaks, shame, scarcity, or nag loops. |
| Privacy as a product feature | Local-first where reasonable; consent before expansion. |
| Motion must communicate | Motion should explain state/material/transition. |
| Ship narrow, polish deeply | Fewer finished systems beat many half-finished features. |
| Visual meaning over decoration | If an element cannot explain its purpose, it should not dominate. |
| Stable production is protected | Do not touch accepted systems without a real reason. |

---

# 6. Brand & Visual DNA

Auren = **quiet luxury + intelligent wellness + biological calm**.

Primary visual language:
- warm pearl / ivory / cream
- champagne gold
- pale mineral aqua
- charcoal / warm graphite text
- controlled sage, rose, dusk accents only with semantic reason
- translucent glass
- large breathing room
- editorial typography
- extremely restrained borders and shadows
- quiet depth, not neon glow

Avoid:
- hospital dashboards
- crypto / sci-fi orb aesthetics
- neon HUDs
- generic pastel wellness
- excessive gradients
- ornamental glass for its own sake
- dense card grids
- “premium” effects that compete with information

## Auren Atmospheres — Locked curated system

1. **Pearl Dawn** — ivory / champagne / blush
2. **Mineral Mist** — pearl / pale aqua / cool blue-grey
3. **Rose Veil** — warm cream / nude rose / dusty blush
4. **Sage Haze** — ivory / pale sage / mineral green
5. **Quiet Dusk** — champagne / mauve-grey / blue-grey

Atmospheres should influence background, glass, nav, accents, Core reflection/tint and supporting material language coherently, not merely repaint one background.

---

# 7. Runtime & Architecture Direction

Current direction is web-first, not web-limited:
- semantic HTML
- componentized CSS
- ES modules / vanilla JS while maintainable
- Canvas2D for the Living Core and evidence visuals where robust
- SVG for semantic instruments/icons
- IndexedDB for longitudinal local data
- Service Worker + PWA cache discipline
- no backend unless user value justifies it

Current important runtime modules include:
- `src/js/app.js` — core product shell and base rendering
- `src/js/config/build.js` — runtime build/cache source of truth
- `src/js/core/orb.js` — Core renderer
- `src/js/experience/launch-handoff.js`
- `src/js/experience/polish.js`
- `src/js/privacy/data-controls.js`
- `src/js/rhythm/rhythm.js`
- `src/js/signals/signals.js`
- `src/js/today/metric-detail.js`
- `src/js/today/checkin-slider-polish.js`
- `src/js/archive/archive-polish.js`

At Build 29, Archive polish is intentionally lazy-loaded only when Archive is opened. This is a deliberate regression-safety pattern after the Build 26 startup failure.

Do not avoid `app.js` dogmatically. Isolated enhancement is preferred when it reduces risk, but if a core correctness issue truly belongs in `app.js`, modify it with an explicit risk plan and regression tests rather than building fragile DOM hacks around it.

---

# 8. Startup Safety — Protected Zone

The startup path is a **high-risk protected zone**.

Build 26 proved that a small “guidance” feature can become unacceptable if it is coupled into startup and blocks Opening/Core initialization.

Permanent rules:
- Optional micro-features must not get startup authority.
- A help/info/guidance layer should load on demand or after the app is confirmed ready.
- Cosmetic/enhancement modules should fail open.
- A feature that is not needed to render Today must not be able to block Today.
- Before touching Opening/Core/startup, establish the exact known-good launch behavior and rollback package.
- Physical launch verification is required after any startup-adjacent change.

Rejected implementation:
- Build 26 Daily Check-in guidance startup coupling.

Accepted recovery:
- Build 27 removed that runtime coupling and restored Build 25 Daily Check-in runtime.

---

# 9. Auren Core — Signature Object

The Auren Core is a transparent glass orb containing a living, calm biomaterial / liquid-light body.

Locked visual direction:
- glass rim is extremely thin and translucent
- define glass through refraction/highlight/contact shadow, not thick outline
- internal material is roughly **75–80% champagne gold** with **20–25% pale/mineral aqua undertone**
- aqua must remain perceptible through depth/refraction
- gentle asymmetry keeps it biological, not logo-perfect
- motion must feel weighted and physically coherent

Living motion:
- readable as alive within roughly 1–2 seconds
- gentle circulation + inertia + surface movement
- event response after check-in/profile/state changes, then settle
- never screensaver-like
- Reduced Motion fallback required

Current renderer strategy:
- Canvas2D is the robust baseline
- heavy WebGL/Three.js is not justified unless a specific product benefit exceeds compatibility and regression cost
- headless environments may lack WebGL2; never make full product survival depend on it

---

# 10. Signature Opening — Accepted Behavior

Accepted feeling:
- intentional, branded, premium
- roughly 3–4 seconds of identity on cold launch
- AUREN → `Your body, understood.` → understated `By Benedict Interactive`
- warm resume should not replay unnecessarily

Build 16 fixed the “frozen standalone orb” handoff by fading the branded opening as a unit, pre-running Today Core behind the opaque opening, then revealing the complete app.

**Do not redesign the opening casually. Build 16 behavior is known-good.**

If changed later:
- preserve a fallback
- compare before/after on real device
- verify Core appears and Today becomes interactive
- ensure no ghost/double orb
- ensure Opening cannot remain stuck indefinitely

---

# 11. Halo — Semantic Instrument, Not Decoration

Halo represents evidence dimensions around the Core:
1. **Body Context**
2. **Daily State**
3. **Movement / Training**
4. **Personal Trend**

Rules:
- hairline / luminous fragments
- close to the Core
- soft endpoints
- missing evidence = faint/incomplete
- never complete the ring merely for symmetry
- no loading/progress-ring look
- semantic meaning outranks visual symmetry
- `Why this?` must explain every dimension

Resting-state Halo should stay quiet. It may reveal meaning after relevant interaction/state change, but must not clutter the hero.

---

# 12. Today — Core Loop

> **CHECK IN → CORE REACTS → STATE REVEAL → EVIDENCE → ONE USEFUL MOVE → CONTINUITY**

Today should answer quickly:
1. How do I seem today based on what I reported?
2. What did Auren notice?
3. What evidence did it use?
4. What one move is justified — or is no change needed?

Today is not a generic dashboard. Avoid turning every card into a navigation tile.

---

# 13. Daily Check-in — Locked Interaction Contract

Daily observations:
- Sleep
- Energy
- Stress
- Mood
- Movement

## Record model

**One calendar day = one Daily Check-in record.**

Current behavior is correct and should remain:
- first save creates the day record
- additional saves on the same day **update/overwrite the same `localDate` record**
- user may edit today multiple times if needed
- do not create multiple daily records for morning/afternoon/evening in V1
- after the day has passed, Archive is the historical snapshot; routine retroactive editing is not part of normal V1 behavior

Do **not** lock the check-in after the first save. Users must be able to correct accidental or changed observations during the same day.

If intraday moments are ever needed, create a separate future concept (e.g. Moments) rather than corrupting the Daily Check-in model.

## Slider visual semantics — physically accepted Build 25

Filled portion only is colored; unfilled track stays neutral pearl.

Positive-direction metrics:
- **Sleep:** mineral blue → champagne → warm gold
- **Energy:** mineral blue → champagne → warm gold
- **Mood:** mineral blue → champagne → warm gold
- **Movement:** mineral blue → champagne → warm gold

Attention-direction metric:
- **Stress:** calm mineral blue → champagne → muted rose-red

Red is reserved for attention meaning, not generic “high value”.

Thumb:
- small pearl capsule
- subtle gold accent
- visually precise, not a bulky gold circle

Sheet:
- breathing room from viewport edges
- generous but controlled internal spacing
- safe-area-aware
- physically accepted at Build 25

## Daily Check-in guidance — approved concept, rejected implementation

Approved product concept:
- one small shared info affordance / `How to rate`
- **not** five info icons beside each metric
- use meaning-based endpoints rather than merely Low/High when helpful
- explain that observations are not health scores
- explain Stress direction explicitly
- explain Movement as descriptive; more is not automatically better

Rejected technical implementation:
- Build 26 coupled the guidance enhancement into startup and caused a launch-blocking regression.

Future implementation rule:
- on-demand only after check-in UI exists
- must not run during startup
- fail-open
- preferably loaded after explicit tap/open action
- keep Build 25 slider visuals byte-stable unless change is necessary

---

# 14. Daily State Cards & Today Metric Details

Accepted five-card composition:
- mobile layout = **3 + 2 centered**
- semantic icon + restrained accent
- no full-card saturated coloring
- icon optical centering matters more than mathematical centering
- Stress high must read as attention

Build 21 metric detail interaction:
- Daily State cards can be touched/keyboard-opened after check-in
- detail remains in place rather than dashboard navigation
- shows exact self-reported value
- semantic level
- `Observed` provenance
- scale context
- concise meaning
- how Auren uses it
- limitation

This interaction must remain an explanation of what the user reported, not a new inference or diagnosis.

---

# 15. One Useful Move

The main post-check-in reward is **meaning/action**, not `Edit`.

Auren can recommend a restrained action such as:
- protect recovery
- create a quieter block of time
- add easy movement
- pace energy deliberately
- maintain what is working

Auren must be comfortable saying:
> **No change needs to be chased today.**

Never manufacture a recommendation merely to appear useful.

---

# 16. Body Intelligence — Contextual, Not Weight Judgment

Primary guardrail:

> **Never reduce Auren to height + weight → BMI → overweight → lose weight.**

BMI is a general screening reference and cannot distinguish fat mass, muscle, bone, distribution, fitness, or overall health.

Core body profile context:
- Age
- Height
- Current weight
- General activity
- Training type
- Training frequency
- Goal

Calculation-only physiological reference:
- sex-for-calculation is separate from gender identity/avatar
- adult BMI cutoffs do not change by male/female
- some references such as waist can differ
- youth BMI requires age/sex-specific growth references

Choices should support:
- Male reference
- Female reference
- Prefer not to use sex-specific estimates
- Not represented / non-sex-specific interpretation

Optional evidence:
- Waist circumference
- Measured body-fat %

Rules:
- never estimate body fat from profile photo
- no face recognition
- measured body fat is supporting evidence, not absolute truth
- waist is context, not diagnosis

Training contexts:
- none / little structured exercise
- general activity / walking
- cardio / endurance
- mixed
- resistance / weight training
- athletic / sports

Training reduces confidence in BMI-only judgment where appropriate; it does not create an invented athlete cutoff or automatically make high BMI healthy.

Goals:
- understand my body
- maintain
- reduce body fat / weight
- gain weight
- build muscle
- improve fitness
- general wellbeing
- not sure

Auren must allow **maintain** as a positive outcome.

## Adult general references currently used

BMI:
- <18.5
- 18.5–24.9
- 25.0–29.9
- >=30

Waist reference V1 when physiological reference is selected:
- male >102 cm
- female >88 cm

These are general references with population/context limitations, not diagnoses.

## Youth guardrail

Under 20:
- do not apply adult BMI categories
- youth interpretation needs age- and sex-specific growth references
- if the reference engine is incomplete, return limited/insufficient interpretation honestly

---

# 17. Body Context Card — Accepted Hierarchy

Primary row:
- BMI
- Training
- Waist

Secondary metadata:
- Confidence

Confidence is not a fourth body metric. Keep it visually secondary as badge/footer/meta information.

Long training text must wrap without breaking EN/TH layout.

---

# 18. Trust Architecture

Provenance layers:
- **Observed** — directly supplied by user
- **Calculated** — deterministic calculation/transformation
- **Inferred** — contextual interpretation

Confidence is qualitative:
- Low
- Moderate
- High
- Limited

Confidence means “how much usable context supports this interpretation,” not “certainty that the user is healthy.”

Every meaningful interpretation should be able to answer `Why this?` with:
- inputs/evidence
- provenance
- sample size / continuity
- confidence
- limitation

Positive language such as `Excellent` is allowed only as a description of available context, never as a medical claim.

---

# 19. Explainability & Guidance System

Three layers:
1. inline helper — one or two lines
2. contextual info / `Why this?` / `How Auren uses this`
3. central `How Auren Works`

Important options should answer:
- why Auren asks
- how it changes interpretation
- what it does not mean
- limitation
- privacy implication if relevant

Guidance must be useful without making the main UI feel like a manual.

Build 26 lesson permanently modifies this system: **help content must never have the authority to break startup.**

---

# 20. Rhythm V1 — Personal Pattern Intelligence

Current accepted/provisional production state from Builds 17–18:
- selectable 7 / 14 / 30-day windows
- Living Rhythm Canvas2D trace
- no ECG/pulse claim
- uses Sleep, Energy, Mood, Movement and inverse Stress direction for coherent visual language
- no composite health score
- evidence-gated trend language
- personal baseline rows
- continuity and qualitative Confidence
- `Why this?` evidence and limitations
- Reduced Motion + performance fallback

Sparse-state maturity:
- **1–3 check-ins:** Early observations
- **4–5:** Baseline emerging
- **6+:** Personal baseline

One day is not a “typical level”.

Two or three days can show provisional connection; mature ribbon language should wait for actual continuity.

Directional comparisons require enough real observations; current foundation uses at least six check-ins and deliberate change thresholds.

## Remaining Rhythm work

Rhythm is **provisionally accepted**, not fully longitudinally validated. When real data accumulates, QA must verify:
- 6+ check-ins
- gaps/missing days
- 14/30-day windows
- true stable periods
- changing periods
- directional change copy
- EN/TH
- no accidental score psychology

Do not manufacture test-history claims as if they were real user history.

---

# 21. Signals V1 — Relationship Intelligence

Current accepted/provisional production state from Builds 19–20:
- 14 / 30-day windows
- compares ten pairings across the five daily observations
- rank-based relationship approach suitable for ordinal 1–5 data
- minimum **8 paired days** before surfacing a relationship
- enough variation required
- conservative strength gate
- additional stability/reversal guard at larger samples
- maximum strongest primary + one secondary relationship
- no numerical correlation coefficient in UI
- no causation claim
- no health score
- Living Evidence Field uses quiet nodes and earned filaments only when evidence qualifies
- `No secondary signal yet` unless a real second relationship passes evidence gates

## Remaining Signals work

Signals is **provisionally accepted**, pending real longitudinal validation of:
- 8+ paired days
- low-variation pairs
- strong-but-unstable pairs
- reversed relationships across time
- no-signal state after enough evidence
- secondary-signal qualification
- EN/TH copy
- performance/reduced-motion fallbacks

---

# 22. Archive — Health Memory

Archive lives inside one primary nav tab and has two internal views:
1. **Portraits**
2. **Calendar**

Purpose:
> **Auren remembers your health story without turning it into a scoreboard.**

No streaks. No guilt. Empty days mean no data.

## Current accepted Build 28–29 behavior

Build 28:
- Archive polish lazy-loads only after Archive navigation
- Portraits become a richer Health Memory surface
- weight-only dates are explicit records, not silently dropped
- check-in + weight keeps Daily State primary, weight secondary
- Calendar supports restrained weight markers
- monthly intelligence remains conservative
- monthly directional comparison requires at least 6 check-ins with at least 3 days per comparison side
- material threshold required before surfacing a monthly change
- no fake percentages
- Daily Health Memory detail uses editorial five-row metrics with provenance + raw 1–5 value
- weight-only detail explicitly refuses to infer daily state

Build 29 physical acceptance:
- adds premium top-right close X
- X stays available in the scrolling detail sheet
- bottom close action is localized `Close` / `ปิด`
- reuses canonical close handler
- preserves Delete-this-day privacy behavior

## Archive interpretation rules

Weight-only date:
- show it as recorded context
- do not label daily state
- do not imply good/bad from one weight value

Monthly summary:
- descriptive before inferential
- expose evidence depth
- no pseudo precision
- no “improvement percent” without justified basis
- if nothing earns a headline, say so

Archive current status: **physically accepted at Build 29 with current available data**, while long-history monthly behavior still needs future longitudinal QA.

---

# 23. You / Identity / Settings

Current capabilities:
- Display Name
- personalized greeting
- profile photo upload
- local crop / pan / pinch zoom / zoom slider
- change / reset / remove / save
- local compression/resize
- no photo analysis
- neutral fallback: photo → initial/monogram → Auren Orb mark
- Body Profile entry
- How Auren Works
- EN/TH
- Auren Atmospheres
- Data & Privacy controls
- motion/system note
- no account required
- About/build information

## Planned Build 30 — You / Settings Final Polish

Goals:
- make You feel like a premium control room, not a settings dump
- strengthen hierarchy between Identity, Body Context, Appearance, Privacy, Explainability and product About
- reduce visual repetition
- verify EN/TH wrapping and interaction clarity
- preserve local-first simplicity
- do not add account/cloud merely because settings pages usually have them
- review whether the deferred Daily Check-in `How to rate` explainer belongs as a safe on-demand help entry, but do not re-enable Build 26 architecture
- avoid startup changes unless absolutely necessary

Build 30 is the preferred next runtime batch after this Revision 3.0, subject to newer explicit instruction/current repo.

---

# 24. Privacy & Data Lifecycle

Current local-first architecture:
- IndexedDB database: `auren`
- `checkins` store
- `profile` store
- lightweight local preferences
- schema marker: **4**
- no required account
- no required cloud sync
- profile photo remains local by default

Accepted deletion behavior:
- delete today → refresh Today/Halo/Archive in place, **no Signature Opening replay**
- delete an Archive check-in → refresh Archive and remain in the experience
- weight-only evidence remains independent from deleting a check-in
- erase all local data → fresh restart is intentional
- full erase uses deliberate confirmation

Future privacy maturity:
- export local data
- optional backup/import if justified
- clear consent before cloud migration
- keep deletion/export semantics understandable

Never call asset/service-worker cache “user health data”.

---

# 25. Localization — EN + TH Native First

English and Thai are first-class.

Canonical truth = **meaning/intent**, not an English sentence.

Rules:
- Meaning parity, not word parity
- natural international English
- natural Thai, not literal English structure
- health wording calm and non-alarmist
- semantic i18n keys where practical
- no raw/missing keys
- no mixed-language UI
- locale-aware dates/numbers/units
- QA both languages on real mobile widths
- never shrink Thai text to unreadable sizes just to make layout fit

Any missing key, mixed-language state, or misleading health translation can be a release blocker.

---

# 26. Native App Feel, Accessibility & Motion

PWA should feel native without sacrificing access:
- page-level accidental pinch/browser scaling is locked
- feature-specific gestures such as crop pinch remain enabled
- safe-area aware
- sticky nav correctly padded
- touch targets remain usable
- browser-default-looking controls should be refined when part of core experience
- keyboard/focus where relevant
- screen-reader labels
- readable font sizes and contrast
- Reduced Motion everywhere meaningful

Motion principles:
- communicate state/material/transition
- never block task completion
- never create fake physiological meaning
- provide fallback for performance/reduced motion

---

# 27. Build / Version / Cache Contract — Release Blocker

Every runtime change touching HTML/CSS/JS/runtime asset/manifest/SW/cache/UI/UX/logic must advance Build No.

Source of truth:
`src/js/config/build.js`

At Revision 3.0:
- APP_VERSION = `0.1.0`
- BUILD_NUMBER = `29`
- CACHE_NAME derives from Build 29
- DATA_SCHEMA_VERSION = `4`

Every runtime release must synchronize:
- BUILD_NUMBER
- CACHE_NAME
- SW comment/cache shell
- About/build UI if applicable
- package names/docs that describe current runtime
- stale build references in changed scope

Do not bump schema unless the data model actually changes.

**Docs-only governance updates do not bump app Build No.**

Current next runtime number = **30** unless the repo has advanced by the time work begins.

Never reuse a Build number after a package/runtime has existed, even if it was rejected.

---

# 28. Regression Safety — Non-Negotiable

Stable production behavior is a protected zone.

Before a meaningful-risk change:
- identify known-good baseline
- define changed-file allowlist
- define rollback/fallback
- compare before/after behavior
- isolate when possible
- fail open when appropriate

Do not rewrite stable systems merely for architectural neatness.

If risk cannot be controlled:
> **defer or redesign before shipping**

Special protected zones:
- Signature Opening / startup
- Living Core
- accepted Daily Check-in
- stored data/delete behavior
- Body Intelligence guardrails
- accepted Rhythm/Signals evidence thresholds
- Build 29 Archive close/delete behavior

---

# 29. Packaging & Drag-to-Upload Contract

Every GitHub package prepared for P’Benz must be ready to extract and drag from repo root immediately.

Mandatory rules:
1. canonical filenames exactly match repo names
2. repo-relative folder structure exactly mirrors repo
3. no `_V2`, `_FINAL`, `_NEW`, `_COPY`, etc. for canonical replacement files
4. version/revision lives inside content + Git history, not canonical filename
5. ZIP root = repository root; no unnecessary wrapper folder
6. replacement files sit at their exact paths
7. Update Only ZIP contains only changed files
8. Full Package ZIP contains a usable project tree when requested
9. Upload Notes stay outside ZIP if otherwise they would pollute repo
10. inspect `unzip -l`
11. test ZIP integrity
12. if P’Benz must rename or move files after extraction, handoff QA failed

Canonical docs paths:
- `docs/product/AUREN_MASTER_PLAN.md`
- `docs/handoff/AUREN_ROOM_MIGRATION_PROMPT.md`

Final response must use clickable sandbox links, not raw filesystem paths.

---

# 30. Commit Name Contract — Never Forget

**Every GitHub file delivery must include a Commit name.**

Hard rules:
- **50 characters maximum including spaces**
- count before sending
- concise and specific
- no generic `Update files` if a meaningful message is possible
- different independent batches use different commit names
- applies to manual-upload packages and authorized remote writes
- in ChatGPT final response, show the Commit name **inside a code block**

A GitHub delivery without a valid Commit name is a **handoff QA failure**.

---

# 31. QA & Acceptance Contract

## Code / structure
- `node --check` changed JS
- validate JSON/manifest when touched
- no duplicate critical DOM IDs
- no missing critical DOM references
- SW asset paths exist
- Build/cache coherence
- schema/migration sanity if data touched

## Product logic
- Body Intelligence representative fixtures
- adult/youth guardrails
- Stress direction
- athletic context does not auto-excuse BMI
- missing waist/body-fat handled honestly
- no fake confidence
- Daily Check-in one-record-per-day behavior

## Localization
- EN/TH parity
- native copy
- 360/393 px wrapping
- no mixed-language UI

## Visual / interaction
- 360 px and 393 px mobile width
- typography rhythm
- safe-area behavior
- Core/Halo balance
- card hierarchy
- optical icon alignment
- sheet spacing and close affordances
- keyboard/focus when relevant
- Reduced Motion

## Data lifecycle
- save/edit today
- delete today in place
- delete Archive day
- weight-only independence
- full erase fresh restart

## PWA / cache
- cold launch
- repeat launch
- service-worker update/cache replacement
- offline shell when relevant
- no stale build assets

## Physical device truth

Static/headless/browser QA is not physical-device acceptance.

Do not claim Android/iOS acceptance until physically tested.

P’Benz screenshots and device observations are production truth and can override a theoretically correct visual assumption.

---

# 32. Release History That Matters — Builds 12–29

This section exists so a new room understands why the current architecture looks the way it does.

## Build 12 — Quiet Spatial Polish
- isolated, fail-open experience layer
- restrained page transitions
- Core optical refraction overlay
- semantic micro-response
- quieter Halo resting state
- resolved prior build bookkeeping mismatch

## Build 13 — Living Core Evolution
- richer internal circulation/material layers
- event response
- performance/exception fallback
- accepted renderer remains fallback

## Build 14 — Privacy & Data Controls
- delete today
- delete Archive check-in
- erase all local data with confirmations
- exposed later need for in-place refresh

## Build 15 — Seamless Launch & In-place Data Refresh
- single deletion no longer intentionally requires full restart
- Today/Halo/Archive refresh in place
- launch handoff experiments still produced an awkward orb stage

## Build 16 — Clean Signature Handoff
- removed frozen orb-only handoff
- branded opening fades as a unit
- Today Core pre-runs behind opening
- physically accepted launch baseline

## Build 17 — Rhythm V1
- Living Rhythm
- 7/14/30 windows
- baseline/evidence/confidence
- no score/causal claim

## Build 18 — Rhythm Early-State Polish
- truthful sparse states
- 1–3 Early observations
- 4–5 Baseline emerging
- 6+ Personal baseline
- provisional connection before mature ribbon
- physical-device sparse-state polish

## Build 19 — Signals V1
- relationship intelligence
- minimum 8 paired days
- variation/strength/stability gates
- Evidence Field
- no coefficient/causation/health score

## Build 20 — Signals Final Polish
- corrected secondary-card empty state
- `No secondary signal yet`
- engine thresholds unchanged
- provisional production acceptance

## Build 21 — Today Deep Interaction
- metric cards become explainable contextual sheets
- Observed provenance
- exact value + semantic meaning + limitation
- no new inference

## Build 22 — Slider visual attempt
- intended isolated dual-tone slider polish
- physical Android showed the layer did not bind visibly as intended

## Build 23 — Slider binding hotfix
- targeted canonical slider IDs and dynamic rendering more directly
- clarified technical binding path

## Build 24 — Dynamic slider concept
- colored fill responds to current value
- neutral unfilled rail
- pearl capsule thumb
- initial generic high=red concept exposed semantic issue

## Build 25 — Daily Check-in Final Polish
- positive metrics end in warm gold, not red
- Stress alone can resolve to muted rose-red at high values
- better sheet breathing room
- physically accepted

## Build 26 — REJECTED Guidance Regression
- attempted shared scale guidance
- caused launch-blocking regression; app could remain on Signature Opening and Core fail to appear
- **never treat this implementation as accepted**

## Build 27 — Emergency Recovery
- restored Build 25 check-in runtime
- removed Build 26 guidance from startup/cache
- physically accepted recovery
- orphaned guidance source may remain unused

## Build 28 — Archive / Health Memory Polish
- lazy-loaded Archive enhancement
- weight-only records
- cautious monthly intelligence
- richer editorial Daily Detail
- startup intentionally untouched

## Build 29 — Archive Close Controls
- top-right sticky X
- localized bottom Close/ปิด
- preserves Delete-this-day behavior
- physically accepted current baseline

---

# 33. Explicitly Rejected / Do-Not-Resurrect Decisions

Do not accidentally bring back:
- thick glass Core rim
- wide gauge-like Halo
- complete Halo ring merely for symmetry
- five Daily State cards in a clumsy equal dashboard layout
- Confidence as a fourth Body Context metric
- generic `high = red` slider semantics for positive metrics
- bulky gold circular slider thumb
- Daily Check-in sheet touching viewport edges
- five separate info icons on each Daily Check-in metric
- locking Daily Check-in after first save of the day
- multiple same-day Daily Check-in records in V1
- Build 26 guidance startup coupling
- weight-only date interpreted as a daily health state
- monthly fake percentages
- guilt streaks / badges / scores
- automatic BMI-to-weight-loss morality
- default male/female stock avatars
- photo-based body-fat inference

---

# 34. Known Technical Debt / Hygiene

Known item at Revision 3.0:
- `src/js/today/checkin-guidance.js` from rejected Build 26 may remain in repo but is not imported or cached by current Build 29 startup.

Safe future handling:
- remove it in a deliberate repository-hygiene/docs batch once verified unreferenced
- deletion of an unreferenced file does not need a runtime Build bump if runtime output is truly unchanged, but verify references first
- do not re-enable it by accident

Also keep README/release docs coherent as runtime advances; stale historical descriptions are acceptable only when clearly historical.

---

# 35. Immediate Roadmap — From Build 29

## Build 30 — You / Settings Final Polish

Primary objective: finish the personal/control surface without expanding product scope.

Candidate work:
- hierarchy of Identity / Body Profile / Explainability / Language / Atmospheres / Privacy / About
- reduce repeated setting-card visual weight
- premium section rhythm
- check small-screen EN/TH wrapping
- clarify no-account/local-first state without looking unfinished
- verify crop editor and identity actions
- verify Data Controls entry and trust language
- possibly create a safe entry point for Daily Check-in rating guidance only if it can remain on-demand and isolated from startup

Regression boundary:
- Opening/Core/Today/Daily Check-in/Rhythm/Signals/Archive/data should remain untouched unless a discovered defect requires it

## Build 31+ — Full-System QA & Production Hardening

Treat this as a product-wide release program, not cosmetic cleanup.

Required matrix:
- Signature Opening / launch / resume
- Core / Halo
- Today no-data / saved state
- Daily Check-in first save / edit same day
- Today metric detail
- One Useful Move
- Body Profile / Body Intelligence fixtures
- Rhythm sparse and mature states
- Signals pre-threshold / qualifying / no-signal states
- Archive Portraits / Calendar / weight-only / monthly summary / detail close/delete
- You / Identity / photo crop
- Privacy deletion/reset
- EN/TH
- 360/393 px
- Reduced Motion
- focus/keyboard
- PWA offline/cache/update

## Longitudinal validation pass

When enough real history exists:
- Rhythm 6+ and 14/30-day behavior
- Signals 8+ paired-day evidence, stability/reversal behavior
- Archive monthly 6+ check-in comparisons
- weight-history continuity

Do not prematurely label this “fully validated” while the user has only sparse real history.

---

# 36. Auren 2 — Know Yourself

Do not rush until Auren 1 is delightful and trustworthy.

Potential future capabilities:
- stronger personal baseline modeling
- richer relationship maps
- pattern clusters
- context-aware event tagging
- optional import from device health ecosystems
- optional cloud backup/account only when value is clear
- richer export/history portability

Any integration must preserve provenance: imported sensor data must be distinguishable from self-report and inference.

Wearables are optional inputs, not product identity.

---

# 37. Auren 3 — Know What Works

Long-term possibility: disciplined **N-of-1 experiments**.

Examples:
- “When I shift bedtime earlier, what happens to my reported energy?”
- “Does a lighter training day change next-day stress/energy?”

Requirements before shipping:
- sufficient data
- explicit intervention tracking
- pre/post windows
- confound awareness
- uncertainty language
- no causal claim unless design supports it

Auren should never fake causal science from correlation.

---

# 38. Cloud, Accounts & Integrations

Current rule: **no account required**.

Potential future cloud value:
- encrypted backup
- device migration
- optional multi-device continuity
- explicit export/import

Do not add login before these values exist.

Potential ecosystem integrations later:
- Apple Health / HealthKit where platform path exists
- Android Health Connect
- selected wearables through platform aggregators rather than one-off Bluetooth dependency where possible

Rules:
- user consent
- source/provenance visible
- import only what Auren can interpret responsibly
- no “data exhaust” collection just because APIs expose it

---

# 39. Growth & Monetization Direction

Early Access should feel like privileged access to an expensive product, not a crippled free tier.

Priorities before monetization optimization:
1. trust
2. meaningful return usage
3. perceived usefulness
4. product quality
5. retention without addiction mechanics

Possible future Auren+ should charge for real ongoing value, e.g. advanced longitudinal intelligence, secure backup, richer integrations, deeper experiments — not for removing artificial pain created by the free product.

Avoid:
- aggressive paywalls
- countdown scarcity
- guilt notifications
- hiding basic privacy controls behind payment

---

# 40. Success Metrics

Prefer product-quality metrics over vanity downloads:
- check-in completion without friction
- percentage of users returning because insights/history are useful
- Archive revisit behavior
- evidence-sheet use when users seek explanation
- meaningful longitudinal continuity
- low deletion/confusion caused by mistrust
- qualitative “this understands me” feedback
- stability / crash-free launches / low regression rate

Do not optimize DAU through nagging.

---

# 41. Ethics, Safety & Claims

Auren is wellbeing/personal intelligence, not medical care.

Rules:
- never diagnose
- never imply medical certainty from self-report
- never fabricate biomarker-like measurements
- do not turn mood/stress observations into psychiatric diagnosis
- do not promise disease prevention/treatment without evidence/regulatory basis
- distinguish observation, calculation, inference
- high-stakes symptoms should not be casually normalized by product copy
- preserve user agency and privacy

Body/weight language must avoid shame and moral ranking.

---

# 42. Decision Filter

Before adding/changing anything, ask:
1. Does it materially help the user understand themselves?
2. Is the evidence/context sufficient?
3. Does it overclaim?
4. Can a user understand the interaction without studying it?
5. Does it damage quiet luxury?
6. Does it add privacy/regulatory complexity beyond value?
7. Can correctness and regression be tested?
8. Is a stable system being disturbed unnecessarily?
9. If removed, does Auren lose core promise or only a toy?

If the answer is weak on important questions, default = **not now**.

---

# 43. Locked vs Evolvable

## Locked foundation
- Auren = Personal Health Intelligence
- `Your body, understood.`
- Data → Pattern → Meaning → One useful decision
- trust before intelligence
- personal/contextual interpretation over single-metric judgment
- local-first V1
- EN/TH first-class
- no fake medical certainty
- no addiction mechanics
- quiet premium identity
- thin transparent Core glass
- semantic Halo
- profile photo never infers health/body fat
- sex-for-calculation separate from identity/avatar
- Archive Calendar remains inside Archive
- Daily Check-in = one record/day, editable within same day
- Stress direction differs from positive metrics
- Build 25 Daily Check-in visual semantics
- Build 29 Archive close/detail baseline
- meaningful-risk changes require rollback/fallback
- file delivery uses canonical repo-relative paths
- every GitHub delivery includes **Commit name <=50 characters in a code block**

## Evolvable by Full Authorized DEV
- exact Core timing/material micro-details
- icon set/optical offsets
- typography/card dimensions
- Halo fragment geometry
- confidence weighting implementation
- Rhythm/Signals layouts and thresholds when evidence supports revision
- framework/backend later
- cloud/integration architecture
- Auren+ packaging
- future N-of-1 experiment design

---

# 44. New-Room Startup Protocol — Zero-Question Continuation

On first Auren task in a new room:
1. Read this file fully.
2. Read `docs/handoff/AUREN_ROOM_MIGRATION_PROMPT.md` fully.
3. Inspect current repo HEAD before proposing changes.
4. Inspect `src/js/config/build.js`, SW/cache and schema.
5. Treat the repo as possibly newer than the baseline recorded here.
6. If repo is newer, follow the conflict order and update mental state without asking historical questions.
7. Do not ask about vision, tagline, visual direction, Core, Halo, Body Intelligence, Daily Check-in, Rhythm, Signals, Archive, You, privacy workflow, packaging, or commit-name rules unless a genuinely new ambiguity exists.
8. Make product/design trade-offs yourself under this contract.
9. Protect stable production.
10. For file deliveries, package canonically, QA integrity, give clickable links, and **always include a <=50-character Commit name in a code block**.

---

# 45. Final Operating Principle

If forced to choose between adding more and making what exists world-class:

> **Choose world-class completion.**

If a feature is beautiful but does not improve understanding, cut it.

If it is intelligent but users cannot understand why, strengthen the trust layer.

If it is correct but looks like a generic dashboard, polish the hierarchy and materials.

If it is a small enhancement that can break startup, redesign the architecture before shipping.

If production is already excellent, **do not touch it without a real reason.**

Auren succeeds when it feels calm, deeply considered, personally useful, trustworthy, and unusually expensive — while remaining honest about what it knows and what it does not.
