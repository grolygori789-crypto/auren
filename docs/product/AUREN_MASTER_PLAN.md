# A U R E N

> **Your body, understood.**

**MASTER PLAN · CANONICAL OPERATING EDITION · Revision 4.1**  
Product · Design · Engineering · Intelligence · Trust · Privacy · Growth · QA · Release · Handoff  
Benedict Interactive · 30 August 2026

Status: **Canonical operating source of truth for continued Auren development after upload**

---

# 0. EXECUTIVE CONTINUITY CARD — READ THIS FIRST

Auren is **Personal Health Intelligence**.

It is not a tracker with better-looking charts. Its purpose is to turn user-owned information into trustworthy personal meaning:

> **Data → Pattern → Meaning → One useful decision**

Auren should help a person understand:
- what they can observe today,
- what context changes the meaning of those observations,
- how today relates to their own recent history,
- what patterns or relationships may be emerging,
- what evidence supports those conclusions,
- and whether one useful move is justified — or whether nothing needs changing.

**Product:** AUREN  
**Category:** Personal Health Intelligence  
**Primary tagline:** **Your body, understood.**  
**Studio:** Benedict Interactive  
**Initial platform:** Mobile-first Premium PWA / Web App  
**Current app version:** `0.1.0`  
**Current production Build:** **53**  
**Data schema:** **4**  
**Legal Version:** **1.0.0**

Target user feeling:

> **“I understand myself better.”**

and simultaneously:

> **“This feels impossibly refined.”**

Early-access emotional target:

> **“This feels like a billion-dollar premium app, and I somehow got special access to it.”**

Premium must come from coherence, restraint, responsiveness, trust, detail, hierarchy and finish — never clutter, spectacle or fake complexity.

---

# 0.1 REVISION 4.1 — FULL QA HARDENING DELTA

Revision 4.1 records the first Full-System QA hardening cycle approved on 30 August 2026.

Verified source baseline before the hardening packages:
- repository `grolygori789-crypto/auren`
- branch `main`
- HEAD `b4a1ce4bda7559e08b64f7d59e52da8608f976aa`
- runtime Build 51
- schema 4

Approved hardening sequence:
1. **Build 52 — Trust & Accessibility Hardening**
2. physical verification
3. **Build 53 — PWA / Offline Hardening**
4. physical verification
5. this docs-only Revision 4.1 synchronization

Build 52 closes Wave 1 defects by:
- making Halo Personal Trend use real recent-calendar continuity rather than raw historical-record count,
- correcting Goal help copy so it does not claim runtime prioritisation that does not yet exist,
- removing the unimplemented `export` promise from fallback Privacy copy,
- localizing key accessibility labels in EN/TH,
- adding fail-open keyboard focus containment to base modal dialogs.

Build 53:
- retains Build 52 behavior,
- limits cached `index.html` fallback to navigation requests,
- prevents a missing JS/CSS/image request from receiving HTML as a fake asset response.

Protected systems are not redesigned in these batches:
- Signature Opening,
- Build 50/51 Core renderer/material,
- Daily Check-in storage model,
- Rhythm algorithm,
- Signals algorithm,
- Archive data model,
- Body Context layout,
- Legal Version,
- data schema.

Status language is strict:
- **static/package QA passed** = code/package checks passed,
- **physical acceptance pending** = P’Benz has not yet confirmed the deployed build on target hardware,
- never silently upgrade static QA into physical acceptance.

Post-Wave-1 physical-hardening operational readiness estimate:

> **91% ±3%**

This is product/engineering readiness, not telemetry, market success, medical confidence or a health score.

Remaining work is dominated by:
- physical Build 52/53 acceptance,
- installed-PWA/offline verification,
- Rhythm longitudinal validation,
- Signals longitudinal validation,
- Archive monthly-history validation,
- final Release Candidate regression.

---

# 1. CURRENT PRODUCTION TRUTH — 30 AUGUST 2026

Repository: `grolygori789-crypto/auren`  
Branch: `main`

Verified current production HEAD:
`39015d7b0a46f82d62989bfd08c4927561ebaadc`

HEAD commit:
> `Harden Build 53 PWA offline fallback`

Current runtime:
- `APP_VERSION = 0.1.0`
- `BUILD_NUMBER = 53`
- `DATA_SCHEMA_VERSION = 4`
- Legal Version = `1.0.0`

Hardening status:
- Build 52 Trust & Accessibility hardening is deployed and showed no regression in tested mobile flows.
- Build 53 PWA / Offline hardening is deployed.
- P’Benz physically tested both online and offline use after Build 53 and reported normal operation.
- Build 50 remains the hard accepted Core rollback anchor.
- Build 51 Core behavior remains visually protected and unchanged by Builds 52–53.

Accessibility note:
- mobile runtime acceptance is positive,
- keyboard/screen-reader behavior is not claimed as physically verified on every platform.

Every later room must still inspect actual repo HEAD and `build.js` before implementation.

## 1.1 Physical-device truth

### Build 50 — hard known-good Core rollback anchor

Build 50:
- restored the exact Build 44 original Core renderer,
- preserved the accepted glass/liquid visual character,
- reduced global animation cadence by roughly 16%,
- was physically tested by P’Benz,
- was explicitly accepted.

Status:

> **PHYSICALLY ACCEPTED / HARD KNOWN-GOOD CORE ANCHOR**

### Build 51 — current production candidate

Build 51:
- keeps the accepted Build 50 Signature Opening path unchanged,
- makes Today use the same Signature/Legacy material character as Opening,
- aligns Today baseline motion amplitude with Opening,
- retains only subtle bounded visual response from existing Halo/Daily state,
- retains existing Check-in `react()` behavior,
- does not create a new health-data pipeline,
- does not alter storage, Body Intelligence, layout or launch handoff.

Latest physical feedback:

> **“ปรับรอบล่าสุดพี่ว่าโอเคขึ้นครับ”**

Therefore:

> **Build 51 = current production / positively physically reviewed / provisional acceptance**

Do not call Build 51 permanently locked until:
- no visual fatigue or regression appears during hardening,
- Today/Open­ing coherence remains good over repeated use,
- P’Benz explicitly accepts it or the hardening pass closes without Core defects.

## 1.2 Next runtime number

A docs-only update does **not** bump Build.

Full-System QA Wave 1 produced justified runtime hardening:
- Build 52 = Trust & Accessibility Hardening
- Build 53 = PWA / Offline Hardening

After Build 53:

> **Build 54 exists only for a real defect or clearly justified surgical improvement.**

Never create Build 54 merely because a “next Build” is expected.

---

# 2. CURRENT AUREN 1 PROGRESS / SUCCESS ESTIMATE

## 2.1 Operational readiness

> **90% ±3%**

This is a **product/engineering operational-readiness estimate**.

It is **not**:
- a health score,
- telemetry,
- DAU/retention,
- market success,
- revenue probability,
- medical confidence,
- or a claim of mathematical precision.

The uncertainty band is deliberate because several remaining gates require physical and longitudinal evidence that cannot be truthfully inferred from code inspection alone.

## 2.2 Weighted readiness model

| Area | Weight | Current score | Current status |
|---|---:|---:|---|
| Product doctrine / architecture / trust model | 10 | 10 | Established |
| Opening / Core / Today hero experience | 20 | 18 | Strong; Build 51 provisional |
| Daily Check-in / metric detail / Body Intelligence | 15 | 15 | Mature / accepted |
| Rhythm / Signals / Archive | 15 | 12 | Built; longitudinal validation pending |
| You / Privacy / Legal / Feedback / Support | 15 | 15 | Implemented / stable |
| Localization / PWA / accessibility / data lifecycle | 10 | 9 | Strong; full-system pass pending |
| Full-system QA / regression hardening | 10 | 9 | Wave 1 runtime hardening physically passed in tested mobile/PWA flows |
| Longitudinal evidence validation / final cleanup | 5 | 3 | Real-history depth still required |
| **TOTAL** | **100** | **91** | **Wave 1 runtime hardening closed; longitudinal + final RC gates remain** |

## 2.3 What the remaining ~9% actually means

The remaining ~9% is **not primarily missing feature count**.

It is mostly:
- product-wide regression confidence,
- physical-device verification,
- PWA update/cache certainty,
- EN/TH edge-case verification,
- data lifecycle verification,
- mature-history verification,
- final release documentation coherence,
- and removal or containment of technical debt.

Default rule:

> **Do not chase 100% by adding unnecessary features.**

---

# 3. DEFINITION OF 100% FOR AUREN 1

Auren 1 reaches **100% operational readiness** when all of the following are true:

- Opening/Core/Today are accepted.
- No known Critical or High regression remains.
- Daily Check-in create/edit-same-day lifecycle passes.
- Daily State details remain correct and explainable.
- Body Context and Body Intelligence fixtures pass.
- Youth and athletic-context guardrails pass.
- Rhythm sparse and mature states are validated enough for the claims actually shown.
- Signals qualifying/no-signal/stability behavior is validated enough for the claims actually shown.
- Archive month/history behavior is validated.
- Weight-only days remain truthful.
- You / Identity / Privacy / Legal / Help / Support remain stable.
- EN and TH key flows pass.
- 360px and 393px mobile layouts pass.
- Reduced Motion passes.
- Keyboard/focus/accessibility basics pass where relevant.
- Data delete/reset lifecycle passes.
- PWA cold launch, repeat launch, offline shell and update/cache path pass.
- Release documentation is synchronized.
- Known technical debt does not threaten runtime.
- Physical-device verification supports the final visual/interaction claims.

100% does **not** require:
- cloud,
- accounts,
- wearables,
- Auren 2,
- Auren 3,
- Auren+,
- monetization,
- or every imaginable feature.

---

# 4. IMMEDIATE ROADMAP — WHAT HAPPENS NEXT

## Phase 0 — Hardening deployment

Upload order:
1. Build 52
2. physically verify Build 52
3. Build 53
4. physically verify Build 53
5. upload Revision 4.1 docs

If Build 52 fails physical QA:
- stop,
- do not upload Build 53,
- diagnose against Build 51 / Build 50 anchors.

If Build 53 fails physical PWA QA:
- keep Build 52 as runtime baseline,
- rollback only Build 53 `build.js` / `sw.js`,
- do not disturb Core or intelligence logic.

## Phase 1 — Build 52 Trust & Accessibility acceptance

Verify:
- Opening/Core remain visually unchanged,
- Halo Personal Trend no longer treats stale history as recent continuity,
- Goal help copy is truthful,
- fallback Privacy copy does not promise export,
- EN/TH key accessibility labels follow locale,
- Tab/Shift+Tab remain inside active base dialogs.

## Phase 2 — Build 53 PWA / Offline acceptance

Verify:
- online cold launch,
- repeat launch,
- installed PWA reopen,
- offline launch after successful online load,
- cached app assets render normally,
- missing non-navigation asset requests do not receive HTML,
- reconnect/update path activates the current cache cleanly.

## Phase 3 — Longitudinal validation

When sufficient real history exists:
- validate Rhythm 6+ / 14 / 30-day states,
- validate Signals 8+ paired-day gates,
- validate variation / reversal / stability behavior,
- validate Archive monthly comparison logic,
- validate weight continuity,
- validate mixed evidence days,
- confirm sparse states remain truthful.

## Phase 4 — Auren 1 Release Candidate Gate

Auren 1 may become Release Candidate only after:
- no Critical/High regression,
- Build/cache/PWA update path coherent,
- EN/TH key flows pass,
- Core/Opening accepted,
- Check-in lifecycle passes,
- data deletion/reset passes,
- privacy/legal/support stable,
- longitudinal systems have enough evidence validation for the claims currently shown.

## Phase 5 — Selected additions only after hardening

Potential low-risk additions:
- shared on-demand `How to rate` Check-in explainer,
- local data export,
- portability/import improvements.

Only implement when:
- user value is clear,
- regression risk is low,
- no startup authority is introduced,
- trust is not degraded.

---

# 5. AUTHORITY — FULL AUTHORIZED DEV 100%

“บิ๊ว” operates as Full Authorized DEV 100%, equivalent in product responsibility to:
- Founder-Operator
- Product Owner
- Principal Product Designer
- CTO / Technical Lead
- Trust & Privacy Lead
- Growth / Packaging Lead
- QA / Release Lead

P’Benz:
- legally owns the project and IP,
- gives explicit direction,
- identifies physical/product defects,
- is the primary real-device acceptance tester.

บิ๊ว:
- has final product/design/engineering decision authority inside the North Star and trust boundaries,
- must choose the better path when evidence supports it,
- must not follow suggestions mechanically,
- should explain meaningful trade-offs briefly.

## Remote-write boundary

**Product authority ≠ GitHub write authority.**

Default:
- inspect GitHub,
- inspect history,
- create/edit files locally,
- package canonical updates,
- send files for P’Benz to upload manually.

Do not push/update/delete remote GitHub unless P’Benz explicitly authorizes it in the current turn.

---

# 6. SOURCE OF TRUTH / CONFLICT ORDER

Before substantial implementation:
1. read this Master Plan,
2. read the current Migration Prompt,
3. inspect repo HEAD,
4. inspect `src/js/config/build.js`,
5. inspect `sw.js`,
6. inspect the actual implementation being changed,
7. inspect schema/storage if relevant,
8. establish known-good baseline,
9. define changed-file allowlist,
10. define rollback/fallback for meaningful-risk work,
11. implement surgically,
12. perform scoped regression QA.

Conflict order:

> **latest explicit instruction from P’Benz → current production → Master Plan doctrine/current plan → handoff context → approved screenshots/assets → repo history → older chat**

If repo is newer than this document:
- current production wins,
- inspect what changed,
- advance from the current Build,
- never force production backward merely to match documentation.

---

# 7. PRODUCT NORTH STAR — NON-NEGOTIABLE

Auren = **Personal Health Intelligence**

Primary promise:

> **Data → Pattern → Meaning → One useful decision**

Auren must help users understand:
- today,
- context,
- their own baseline,
- continuity,
- evidence,
- emerging relationships,
- uncertainty,
- and what action — if any — is justified.

Auren is not:
- a diagnosis app,
- a doctor replacement,
- a medical device,
- a generic health tracker/dashboard,
- a calorie/macros diary,
- a guilt streak app,
- an AI-chatbot hero product,
- a fake health-score app,
- a body-shaming weight-loss product,
- a social feed,
- wearable-dependent in V1.

Default:

> **Auren should feel smarter because it understands context better, not because it has more menus.**

---

# 8. PRODUCT PRINCIPLES — NON-NEGOTIABLE

| Principle | Operating rule |
|---|---|
| Trust before intelligence | If it appears smarter but becomes less believable, it is worse. |
| Usability before spectacle | Beautiful but harder to use = fail. |
| Complex underneath, calm on surface | Rich internal logic, quiet UI. |
| Evidence before claims | Meaning must have a traceable basis. |
| Personal baseline first | Compare users with themselves before population judgment. |
| Context before judgment | Never let one metric define the person. |
| Progressive disclosure | Explain deeply on demand. |
| No fake precision | No invented 92/100 wellness score. |
| No addiction mechanics | No guilt streaks, shame or nag loops. |
| Privacy as a product feature | Local-first where reasonable. |
| Motion must communicate | Motion must explain state/material/transition. |
| Ship narrow, polish deeply | Fewer finished systems beat many half-finished ones. |
| Visual meaning over decoration | Decoration never outranks information. |
| Stable production is protected | Do not disturb accepted systems without reason. |
| Regression safety before novelty | Novelty never outranks stability. |
| Physical-device truth | Real-device behavior overrides static optimism. |

If forced to choose between adding a feature and making existing behavior world-class:

> **choose world-class completion**

---

# 9. BRAND / VISUAL DNA

Auren:

> **quiet luxury + intelligent wellness + biological calm**

Primary palette:
- warm pearl / ivory / cream,
- champagne gold,
- pale mineral aqua,
- charcoal / warm graphite,
- controlled sage / rose / dusk accents.

Visual language:
- translucent glass,
- editorial typography,
- generous negative space,
- quiet hierarchy,
- restrained borders/shadows,
- premium material detail,
- calm motion,
- high perceived finish.

Avoid:
- hospital dashboard styling,
- crypto/sci-fi orb aesthetics,
- neon HUDs,
- generic pastel wellness,
- dense card grids,
- decorative effects without semantic purpose,
- “premium” overlays that reduce clarity,
- motion that creates visual fatigue.

## Locked Auren Atmospheres

1. Pearl Dawn
2. Mineral Mist
3. Rose Veil
4. Sage Haze
5. Quiet Dusk

Atmospheres must influence the experience coherently rather than merely recoloring the background.

---

# 10. RUNTIME / ARCHITECTURE DIRECTION

Current direction:
- semantic HTML,
- componentized CSS,
- ES modules / vanilla JS while maintainable,
- Canvas2D for Core and evidence visuals where robust,
- SVG for semantic instruments/icons,
- IndexedDB for longitudinal local data,
- Service Worker + disciplined PWA caching,
- no backend unless user value justifies it.

Important modules include:
- `src/js/app.js`
- `src/js/config/build.js`
- `src/js/core/orb.js`
- `src/js/experience/launch-handoff.js`
- `src/js/experience/polish.js`
- `src/js/privacy/data-controls.js`
- `src/js/rhythm/rhythm.js`
- `src/js/signals/signals.js`
- `src/js/today/metric-detail.js`
- `src/js/today/checkin-slider-polish.js`
- `src/js/today/affordance-polish.js`
- `src/js/today/body-context-polish.js`
- `src/js/archive/archive-polish.js`
- `src/js/you/you-polish.js`
- `src/js/you/help-support.js`
- `src/js/legal/legal-center.js`

Architecture rule:
- prefer isolated/lazy/fail-open enhancement when appropriate,
- but do not create fragile overlays when the correct fix belongs in a core renderer,
- do not rewrite stable systems merely for architectural neatness.

---

# 11. STARTUP / SIGNATURE OPENING — PROTECTED ZONE

Build 16 established the accepted startup handoff:
- branded opening appears as one intentional unit,
- AUREN,
- `Your body, understood.`,
- understated Benedict Interactive,
- Today Core pre-runs behind the opaque Opening,
- transition reveals complete app,
- no frozen standalone orb,
- warm resume should not replay unnecessarily.

Current Opening lineage:
- Build 44 renderer source,
- Build 50 exact restoration,
- Build 50 global cadence reduced ~16%,
- Build 51 does not alter Signature Opening.

Any startup-adjacent change requires:
- exact known-good baseline,
- rollback,
- cold launch QA,
- repeat launch QA,
- physical-device verification.

Optional features never get startup authority.

---

# 12. AUREN CORE — SIGNATURE OBJECT

The Core is a transparent glass orb containing living liquid-light material.

## 12.1 Current accepted direction

Glass:
- thin,
- transparent,
- defined by refraction/highlight/contact shadow,
- never thick-outlined.

Material:
- champagne-gold dominant,
- pale mineral-aqua undertone,
- pearl depth,
- biological asymmetry,
- not a flat fill,
- not a medical gauge.

Motion:
- alive within ~1–2 seconds,
- weighted,
- surface/inertial movement,
- not screensaver-like,
- Reduced Motion required.

## 12.2 Build 50

Build 50 is the hard source anchor:
- exact original renderer lineage from Build 44,
- physically accepted,
- global cadence slowed ~16%.

## 12.3 Build 51 Today adaptation

Today:
- uses Signature/Legacy material language,
- matches Opening baseline motion amplitude,
- allows only bounded state-responsive motion,
- allows bounded state-responsive tint/light,
- retains Check-in reaction,
- adds no new health logic.

Status:
> **current production / positively reviewed / provisional acceptance**

## 12.4 Core state response philosophy

Allowed:
- attention → slightly cooler/quieter,
- good/strong/excellent → slightly warmer/clearer,
- Check-in → short internal response, then settle,
- narrow motion variation.

Do not:
- create red/green “health status” orb,
- change liquid level as fake physiology,
- dramatically brighten/darken by state,
- add particles,
- create fake biomarkers,
- imply medical measurement.

The Core is:

> **a visual expression of context, not a medical instrument**

---

# 13. HALO — SEMANTIC INSTRUMENT

Halo represents:
1. Body Context
2. Daily State
3. Movement / Training
4. Personal Trend

Rules:
- hairline fragments,
- close to Core,
- soft endpoints,
- missing evidence faint/incomplete,
- never complete ring merely for beauty,
- no progress/loading gauge appearance,
- `Why this?` explains meaning,
- semantic meaning > symmetry.

Halo should remain quiet at rest.

---

# 14. TODAY — CORE LOOP

> **CHECK IN → CORE REACTS → STATE REVEAL → EVIDENCE → ONE USEFUL MOVE → CONTINUITY**

Today should answer:
1. How do I seem today from what I reported?
2. What did Auren notice?
3. What evidence did it use?
4. What one move is justified — or does nothing need changing?

Today is not a dashboard.

## Affordance grammar

Current accepted language:
- Chevron = clickable.
- Interactive surfaces may elevate/press.
- Informational surfaces remain flatter.
- Status/readout = pill/readout, not CTA.
- Pattern/evidence cards should not look accidentally clickable.
- Trust surfaces should not masquerade as controls.

Do not reintroduce card-dump behavior.

---

# 15. DAILY CHECK-IN — LOCKED CONTRACT

Metrics:
- Sleep
- Energy
- Stress
- Mood
- Movement

Record model:

> **One calendar day = one Daily Check-in record**

Correct behavior:
- first save creates today,
- same-day save updates the same `localDate`,
- user may edit today multiple times,
- do not lock after first save,
- no morning/afternoon/evening daily records in V1,
- routine historical editing is not normal V1 behavior.

Future intraday moments, if ever justified, must be a separate concept.

## Slider semantics — Build 25 physically accepted

Sleep / Energy / Mood / Movement:
> mineral blue → champagne → warm gold

Stress:
> calm mineral → champagne → muted rose-red

Rules:
- filled portion colored,
- unfilled track neutral pearl,
- red = attention semantics, not generic high,
- small pearl capsule thumb,
- subtle gold accent,
- sheet has breathing room and safe-area spacing.

## Check-in guidance

Approved product idea:
- one shared `How to rate`,
- not five individual info icons,
- observations ≠ health score,
- Stress direction explicit,
- Movement descriptive; more is not automatically better.

Rejected architecture:
> **Build 26 startup coupling**

Any future explainer:
- on-demand,
- non-startup,
- fail-open,
- no authority over Core/Today launch,
- preserve Build 25 slider behavior.

---

# 16. DAILY STATE / METRIC DETAILS — ACCEPTED FOUNDATION

Accepted five-card composition:
- mobile 3 + 2 centered,
- restrained semantic accents,
- optical icon centering,
- Stress-high = attention.

Detail sheets:
- exact self-reported value,
- semantic label,
- `Observed` provenance,
- short meaning,
- how Auren uses it,
- limitation.

No new diagnosis or inference is justified merely because a user opens a metric detail.

---

# 17. ONE USEFUL MOVE

The primary post-check-in reward is **meaning/action**, not Edit.

Possible actions:
- protect recovery,
- create quieter space,
- easy movement,
- pace energy,
- maintain what is working,
- keep observing.

Auren must be comfortable saying:

> **No change needs to be chased today.**

Never manufacture action just to appear useful.

---

# 18. BODY INTELLIGENCE — LOCKED SAFETY LOGIC

Never reduce Auren to:

> **height + weight → BMI → overweight → lose weight**

BMI:
- general screening reference,
- contextual,
- not identity or moral judgment.

Adult general categories:
- `<18.5`
- `18.5–24.9`
- `25.0–29.9`
- `>=30`

Waist V1 general reference when sex-specific physiological reference is selected:
- male >102 cm
- female >88 cm

These are general population references, not diagnosis.

Training context:
- none/little structured exercise,
- general activity/walking,
- cardio/endurance,
- mixed,
- resistance/weight training,
- athletic/sports.

Resistance/mixed/athletic context may reduce confidence of BMI-only interpretation. It does not invent an athlete cutoff or automatically make high BMI healthy.

Sex-for-calculation:
- separate from gender identity/avatar,
- adult BMI categories are not sex-specific,
- some reference values such as waist may be.

Under 20:
- do not apply adult BMI categories,
- require age/sex-specific growth references,
- if engine is incomplete, return limited/insufficient interpretation honestly.

Photo:
- no body-fat inference,
- no health inference,
- no face recognition.

Goals include:
- understand my body,
- maintain,
- reduce body fat/weight,
- gain weight,
- build muscle,
- improve fitness,
- general wellbeing,
- not sure.

Auren may recommend **maintain**.

---

# 19. BODY CONTEXT — CLOSED / LOCKED

Build 35:
- BMI / Waist two-column primary layout,
- Training separate row,
- Confidence separate.

Build 36:
- final micro-polish,
- spacing/alignment/divider refinement,
- hardened annotation behavior,
- physically passed.

Treat Body Context as:

> **CLOSED / LOCKED**

unless:
- actual defect,
- new explicit requirement,
- scientifically necessary Body Intelligence correction.

Metric/Imperial remains a future separate app-wide concern, not a Body Context micro-change.

---

# 20. TRUST MODEL

Provenance:
- **Observed**
- **Calculated**
- **Inferred**

Confidence:
- Low
- Moderate
- High
- Limited

Confidence means:
> how much usable context supports the interpretation

It does **not** mean:
> certainty that the person is healthy

`Why this?` should expose:
- input/evidence,
- provenance,
- sample size/continuity,
- confidence,
- limitation.

No medical certainty. No fake precision.

---

# 21. EXPLAINABILITY / GUIDANCE SYSTEM

Three layers:
1. inline helper,
2. contextual info / `Why this?` / `How Auren uses this`,
3. central `How Auren Works`.

Important options should answer:
- why Auren asks,
- how it changes interpretation,
- what it does not mean,
- limitation,
- privacy implication where relevant.

Help content must never have authority to break startup.

---

# 22. RHYTHM V1 — BUILT / LONGITUDINAL QA PENDING

Builds 17–18:
- 7/14/30-day windows,
- Living Rhythm Canvas2D trace,
- personal baseline,
- continuity/confidence,
- `Why this?`,
- no ECG/pulse claim,
- no composite health score.

Maturity:
- 1–3 check-ins = Early observations
- 4–5 = Baseline emerging
- 6+ = Personal baseline

One day is not a “typical level”.

Current status:

> **provisionally accepted; long-history validation pending**

Required future QA:
- 6+ check-ins,
- missing-day gaps,
- 14/30 windows,
- stable periods,
- changing periods,
- directional copy,
- EN/TH,
- Reduced Motion/performance,
- no accidental score psychology.

---

# 23. SIGNALS V1 — BUILT / LONGITUDINAL QA PENDING

Builds 19–20:
- 14/30 evidence windows,
- ten pairings across five observations,
- rank-based approach suitable for ordinal 1–5 data,
- minimum 8 paired days,
- enough variation required,
- conservative strength gate,
- stability/reversal guard,
- max one primary + one secondary relationship,
- no coefficient in UI,
- no causation claim,
- no health score,
- Living Evidence Field,
- `No secondary signal yet`.

Current status:

> **provisionally accepted; longitudinal validation pending**

Future QA:
- 8+ paired days,
- low variation,
- strong but unstable relationship,
- reversed relationship across time,
- no-signal state,
- secondary qualification,
- EN/TH,
- Reduced Motion/performance.

---

# 24. ARCHIVE / DAILY HEALTH MEMORY — PROTECTED BASELINE

Archive:
1. Portraits
2. Calendar

Purpose:

> **Auren remembers your health story without turning it into a scoreboard.**

No streaks. No guilt. Empty day = no data.

Build 28:
- lazy-loaded after Archive navigation,
- richer Health Memory,
- weight-only records remain explicit,
- Check-in + weight keeps Daily State primary,
- Calendar weight markers,
- conservative monthly intelligence,
- no fake percentages,
- Daily Health Memory editorial metric rows,
- provenance + raw values,
- weight-only detail never invents daily state.

Build 29:
- premium top-right X,
- bottom localized Close/ปิด,
- canonical close handler,
- Delete-this-day preserved.

Build 29 was physically accepted.

Long-history monthly behavior still requires longitudinal QA.

---

# 25. YOU / SETTINGS — COMPLETE / LOCKED

Build 30:
- premium hierarchy/grouping,
- Body & understanding,
- Preferences,
- Privacy & access,
- About,
- physically accepted.

Build 32:
- About action correction,
- System / Local-first status,
- Build line,
- Legal close alignment.

Build 33:
- Build label moved to You footer,
- physically accepted.

Current groups:
- Identity/profile
- Body & understanding
- Preferences
- Privacy & access
- Motion/local-first status
- Data controls
- About
- Legal
- Help & feedback
- Support Auren
- Build footer

Treat You/Settings as complete and locked unless real defect.

---

# 26. LEGAL / TRUST FOUNDATION — ACTIVE

Build 31 introduced:
- Legal Center,
- Terms,
- Privacy,
- Copyright/IP,
- third-party notices/governance structure,
- Legal Version independent from runtime Build.

Current:
- Legal Version `1.0.0`
- effective `28 August 2026`

Legal UI:
- must fail open relative to startup,
- must never gain startup authority,
- must describe wellbeing/context rather than medical care.

Legal Version changes only when user-facing legal rights/data terms materially change.

Counsel review is recommended before:
- major paid expansion,
- store launch with materially different obligations,
- remote health-data/cloud expansion.

---

# 27. HELP / FEEDBACK / SUPPORT — STABLE

Build 37 product features:
- Report a problem
- Send feedback
- Support in Thailand
- Support worldwide

Support email:
`benedict.support@gmail.com`

Worldwide:
`https://ko-fi.com/benedictinteractive`

Thailand:
- approved PromptPay QR,
- lazy-load only when support surface opens,
- no preset amount.

Rules:
- support is voluntary,
- no entitlement,
- no feature/access advantage,
- no payment success claim,
- no analytics,
- no background transmission.

Safe diagnostics may include:
- Build,
- language,
- coarse platform,
- browser family/major,
- Browser/PWA,
- screen,
- timestamp.

Never auto-include:
- health observations,
- body/profile data,
- check-in history,
- avatar/photo,
- payment data,
- private health context.

Report diagnostics:
- ON by default.

Feedback diagnostics:
- OFF by default.

No formal Partnerships & Investment route at present.

---

# 28. BUILD 37 CONTAMINATION INCIDENT — PERMANENT PACKAGING LESSON

During Build 37 rollout, wrong cross-project:
- `index.html`
- `manifest.webmanifest`

were accidentally uploaded.

Result:
- Auren shell temporarily showed another project.

Build 38:
- restored exact Auren shell,
- bumped cache/runtime,
- retained intended Help/Support additions,
- physically accepted.

Permanent rules:
- Update Only ZIP contains exact changed-file allowlist,
- no unrelated project files,
- inspect ZIP listing,
- canonical repo-relative paths,
- verify cache eviction when recovery requires it.

Build 38 remains a major recovery anchor.

---

# 29. PRIVACY / DATA LIFECYCLE

Local-first V1:
- IndexedDB database `auren`,
- `checkins`,
- `profile`,
- preferences,
- schema 4,
- no account required,
- profile photo local by default.

Accepted deletion behavior:
- delete today → refresh in place, no Opening replay,
- Archive delete → remain in Archive context,
- weight-only evidence remains independent,
- erase all → intentional fresh restart,
- full erase requires deliberate confirmation.

Future:
- local data export,
- optional backup/import,
- optional cloud only when user value and consent justify it.

Never call app cache/service-worker assets “user health data”.

---

# 30. LOCALIZATION / ACCESSIBILITY / NATIVE FEEL

EN + TH are first-class.

Rules:
- meaning parity, not literal word parity,
- natural Thai,
- natural international English,
- locale-aware dates/numbers/units,
- no mixed-language UI,
- no raw missing key,
- do not shrink Thai text to unreadability.

QA:
- 360px,
- 393px,
- safe areas,
- touch targets,
- focus/keyboard,
- screen-reader labels where relevant,
- readable contrast,
- Reduced Motion.

App page scaling may remain locked while feature-specific gestures such as avatar crop pinch remain enabled.

---

# 31. RUNTIME / BUILD / CACHE CONTRACT

Current:
- APP_VERSION `0.1.0`
- BUILD_NUMBER `51`
- DATA_SCHEMA_VERSION `4`
- Legal Version `1.0.0`

Every runtime change:
- advance Build,
- synchronize `src/js/config/build.js`,
- synchronize `CACHE_NAME`,
- synchronize `sw.js`,
- synchronize About/build display where applicable.

Do not bump schema unless the data model changes.

Docs-only governance/handoff update:

> **no Build bump**

Never reuse rejected/old Build numbers.

---

# 32. REGRESSION SAFETY — NON-NEGOTIABLE

Before meaningful-risk change:
1. identify known-good baseline,
2. inspect current implementation,
3. define changed-file allowlist,
4. define rollback/fallback,
5. compare before/after,
6. implement surgically,
7. run scope-specific regression QA,
8. require physical acceptance where visual/interaction behavior matters.

Prefer:
- isolated,
- minimal,
- fail-open,
- lazy/on-demand for optional surfaces,
- additive only when architecturally appropriate.

Do not use additive overlays when the correct fix belongs in the renderer itself.

If risk cannot be controlled:

> **redesign or defer before shipping**

Protected zones:
- Signature Opening/startup,
- Core,
- accepted Daily Check-in,
- stored data/delete behavior,
- Body Intelligence guardrails,
- Rhythm/Signals evidence thresholds,
- Archive accepted behavior,
- You/Settings,
- Body Context,
- Legal startup separation.

---

# 33. FILE PACKAGING — ABSOLUTE CONTRACT

For GitHub delivery:
- canonical filenames,
- exact repo-relative paths,
- ZIP root = repo root,
- no wrapper directory,
- Update Only = changed files only,
- no `_FINAL`, `_NEW`, `_COPY`, `_V2`,
- Upload Notes / QA may stay outside repo ZIP,
- inspect ZIP listing,
- integrity-test ZIP.

Canonical docs:
- `docs/product/AUREN_MASTER_PLAN.md`
- `docs/handoff/AUREN_ROOM_MIGRATION_PROMPT.md`

Never claim delivery without a valid clickable file link.

---

# 34. COMMIT NAME CONTRACT — NEVER FORGET

Every GitHub file delivery must include a Commit name.

Rules:
- maximum 50 characters including spaces,
- specific,
- concise,
- inside a code block.

Missing Commit name = handoff QA failure.

---

# 35. QA & ACCEPTANCE CONTRACT

## Code / structure
- `node --check` changed JS,
- validate JSON/manifest when touched,
- no duplicate critical DOM IDs,
- no missing critical DOM references,
- SW asset paths exist,
- Build/cache coherent,
- schema/migration sanity if data touched.

## Product logic
- one Daily Check-in record/day,
- same-day edit,
- Stress direction,
- body fixtures,
- adult/youth guardrails,
- athletic context,
- missing evidence,
- provenance/confidence boundaries.

## Localization
- EN/TH parity,
- native copy,
- 360/393 wrapping,
- no mixed-language states.

## Interaction
- close affordances,
- safe areas,
- focus/keyboard,
- Reduced Motion,
- touch behavior.

## Data lifecycle
- save/edit today,
- delete today,
- Archive delete,
- weight-only,
- full erase.

## PWA
- cold launch,
- repeat launch,
- cache update,
- offline shell where relevant,
- installed PWA reopen/update coherence.

## Physical acceptance

Static/headless/browser QA is not physical-device acceptance.

> **P’Benz device feedback = production truth**

---

# 36. FULL-SYSTEM QA MATRIX — NEXT MAJOR WORKSTREAM

The hardening pass must cover:

| System | Key states / tests | Release expectation |
|---|---|---|
| Signature Opening | cold launch, warm resume, handoff | no stuck/ghost Core |
| Today Core | no-data, saved, state response, long watch | coherent, no fatigue |
| Halo | missing/partial/full evidence | semantic, not decorative |
| Check-in | first save, same-day edit | one record/day |
| Sliders | all 5 metrics | semantic color direction correct |
| Metric detail | all 5 cards | provenance + limitation correct |
| One Useful Move | action / maintain / no-change | no manufactured advice |
| Body Profile | representative inputs | context respected |
| Body Context | BMI/waist/training/confidence | locked layout remains stable |
| Youth guardrail | under 20 | no adult BMI interpretation |
| Rhythm | 1–3 / 4–5 / 6+ | truthful maturity |
| Signals | pre-threshold / qualifying / no-signal | no causal overclaim |
| Archive | Portraits / Calendar / detail | no scoreboard psychology |
| Weight-only | record/detail/month | no invented daily state |
| You | identity / photo / settings | stable |
| Privacy | delete today / delete day / erase all | predictable lifecycle |
| Legal | open / close / acknowledgement | no startup authority |
| Help/Support | report / feedback / PromptPay / Ko-fi | no private data leak |
| Localization | EN / TH | semantic parity |
| Accessibility | focus / touch / Reduced Motion | usable |
| PWA | offline / cache / update | coherent build |
| Packaging | allowlist / paths / ZIP integrity | no cross-project contamination |

No broad feature development should outrank this matrix.

---

# 37. RELEASE RISK REGISTER

| Risk | Impact | Current posture | Required control |
|---|---|---|---|
| Startup regression | Critical | historically proven | startup protected; optional modules fail-open |
| Core visual regression | High | Build 50 rollback available | Build 51 freeze; surgical changes only |
| PWA stale-cache mismatch | High | coherent now, full QA pending | Build/cache/SW sync |
| Data lifecycle defect | High | accepted behavior exists | deletion/edit/reset matrix |
| Longitudinal overclaim | High | conservative gates built | real-history validation |
| Cross-project packaging contamination | High | incident occurred | strict allowlist + ZIP inspection |
| EN/TH semantic drift | Medium–High | strong baseline | full bilingual pass |
| Accessibility/mobile edge case | Medium | partial confidence | 360/393 + focus + Reduced Motion |
| Documentation drift | Medium | currently present | Revision 4 sync + handoff sync |
| Orphaned rejected code reintroduced | Medium–High | known debt | never import/cache without redesign |

Release posture:

> **No Critical/High risk should remain knowingly unresolved at RC.**

---

# 38. KNOWN TECHNICAL DEBT / HYGIENE

## 38.1 Build 26 orphaned guidance source

`src/js/today/checkin-guidance.js` may remain.

Rules:
- do not import,
- do not cache,
- do not execute.

Remove only in an isolated repository-hygiene batch after verifying zero runtime references.

## 38.2 Dormant Evolution renderer

`fluidImageEvolution()` may remain in `orb.js` while Today uses Signature/Legacy route.

Do not remove casually during feature work.

Repository hygiene and product behavior should not be mixed without reason.

## 38.3 Documentation drift

Revision 4.1 synchronizes:
- Master Plan,
- Migration Prompt,
- README

to the Build 52/53 hardening generation.

Docs remain subordinate to newer production if a later repo HEAD advances beyond this revision.

---

# 39. BUILD HISTORY — 12 THROUGH 51

## Build 12
Quiet spatial polish / isolated fail-open work.

## Build 13
Living Core evolution with fallbacks.

## Build 14
Privacy/Data Controls.

## Build 15
In-place deletion refresh + launch repair attempt.

## Build 16
Clean Signature Opening handoff.  
**Accepted launch baseline.**

## Build 17
Rhythm V1.

## Build 18
Rhythm sparse-state truth/polish.

## Build 19
Signals V1.

## Build 20
Signals copy/final-state polish.  
**Provisional production acceptance.**

## Build 21
Today metric detail sheets.

## Build 22
Slider styling attempt did not bind visibly as intended.

## Build 23
Slider binding hotfix.

## Build 24
Dynamic fill + pearl capsule; generic high=red flaw exposed.

## Build 25
Final slider semantic colors + breathing room.  
**Physically accepted.**

## Build 26 — REJECTED
Daily Check-in guidance caused startup regression.

## Build 27
Emergency recovery.  
**Physically accepted.**

## Build 28
Archive / Health Memory polish, lazy-loaded.

## Build 29
Archive close controls.  
**Physically accepted.**

## Build 30
You / Settings hierarchy polish.  
**Physically accepted.**

## Build 31
Legal & Trust Foundation.

## Build 32
Settings + Legal UX corrections.

## Build 33
Build footer correction.  
**Physically accepted.**

## Build 34
Today affordance polish; absorbed into accepted baseline.

## Build 35
Body Context layout polish.

## Build 36
Body Context final micro-polish.  
**Physically passed / locked.**

## Build 37
Help / Feedback / Support added.  
Deployment contamination incident occurred.

## Build 38
Emergency shell recovery.  
**Physically accepted / major known-good baseline.**

## Build 39
Core overlay experiment.  
Rejected.

## Build 40
Core motion refinement.  
Rejected visually: too faint.

## Build 41
Core presence/readability overlay.  
Rejected: overworked/unnatural.

## Build 42
Restore original Core + refined motion.  
Rejected: too still.

## Build 43
Loading-style Core / slower liquid.  
Rejected: dull/wrong material.

## Build 44
Full original Core rollback.  
Important renderer source baseline.

## Build 45
Golden mist / Life Force experiment.  
Rejected: mist/glass nearly disappeared.

## Build 46
Life Force visibility calibration.  
Direction still not satisfactory.

## Build 47
Replacement mineral-aqua liquid renderer.  
Rejected: flat/half-disc feel.

## Build 48
Premium-liquid refinement attempt.  
Rejected.

## Build 49
Incorrect restoration based on Build 47.  
Rejected.

## Build 50
Exact Build 44 renderer restored + ~16% slower cadence.  
**Physically accepted / hard Core rollback anchor.**

## Build 51
Today aligned to Signature Opening material/motion character with subtle real-state response.  
**Current production / physically reviewed positively / provisional acceptance.**

## Build 52
Trust & Accessibility Hardening:
- Halo Personal Trend uses real recent-calendar continuity,
- Goal/Privacy truth-copy corrections,
- key EN/TH accessibility labels,
- fail-open base modal focus containment.  
**Deployed; tested mobile flows showed no observed regression.**

## Build 53
PWA / Offline Hardening:
- `index.html` offline fallback limited to navigation requests,
- missing non-navigation assets return a normal failed response instead of HTML.  
**Physically passed online + offline PWA testing on P’Benz’s device.**

---

# 40. CORE EXPERIMENT DO-NOT-RESURRECT LIST

Do not resurrect without concrete new evidence:
- Build 39 overlay stack,
- Build 40 over-quiet motion approach,
- Build 41 presence overlays,
- Build 43 dull time-scaled liquid,
- Build 45/46 mist/Life Force renderer,
- Build 47/48 flat replacement liquid,
- Build 49 incorrect restoration.

Known-good lineage:
- Build 44 source renderer,
- Build 50 accepted restoration,
- Build 51 current Today adaptation.

---

# 41. EXPLICIT PRODUCT DO-NOT-RESURRECT LIST

Do not bring back:
- thick Core rim,
- giant/gauge Halo,
- full Halo ring for aesthetics,
- Confidence as fourth body metric,
- generic high=red for positive Check-in metrics,
- bulky gold slider thumb,
- Check-in sheet touching screen edges,
- five info icons for five sliders,
- locking same-day Check-in after first save,
- multiple V1 daily records,
- Build 26 startup guidance coupling,
- weight-only = Daily Health State,
- fake monthly percentages,
- guilt streaks / scores / badges,
- automatic BMI→lose-weight judgment,
- stock gender-avatar defaults,
- photo-based body-fat inference,
- mist renderer as current Core,
- flat half-disc liquid renderer,
- decorative particles/fireflies,
- visually loud traffic-light Core state,
- “life force” presented as measurable physiology.

---

# 42. AUREN GENERATIONS

## Auren 1 — Know Today

Current generation.

Includes:
- Daily Check-in,
- Daily State,
- Body Context,
- One Useful Move,
- Rhythm / Signals foundation,
- Health Memory,
- trust/privacy/legal,
- feedback/support.

Current post-Wave-1-hardening operational readiness estimate:

> **91% ±3%**

Do not declare complete until hardening + sufficient longitudinal validation.

## Auren 2 — Know Yourself

Possible future:
- stronger personal baseline modeling,
- richer relationship maps,
- pattern clusters,
- context-aware event tagging,
- optional Apple Health / HealthKit path,
- optional Android Health Connect,
- optional cloud backup,
- richer portability.

Imported provenance must remain distinguishable from self-report and inference.

Wearables are optional inputs, never product identity.

## Auren 3 — Know What Works

Possible:
- disciplined N-of-1 experiments,
- intervention tracking,
- pre/post windows,
- confound awareness,
- uncertainty language.

Never claim causality from simple correlation.

---

# 43. CLOUD / ACCOUNTS / INTEGRATIONS

Current:

> **No account required**

Cloud only when it creates clear user value:
- encrypted backup,
- device migration,
- multi-device continuity,
- explicit export/import.

Do not add login before these values exist.

Potential later:
- Apple Health ecosystem,
- Android Health Connect,
- selected wearable data through responsible aggregation.

Rules:
- explicit consent,
- provenance visible,
- import only what Auren can interpret responsibly,
- do not collect “data exhaust” merely because APIs expose it.

---

# 44. GROWTH / MONETIZATION

Early Access must feel like privileged access to an expensive product, not a crippled free tier.

Before monetization optimize:
1. trust,
2. usefulness,
3. perceived finish,
4. meaningful return usage,
5. retention without addiction mechanics.

Future Auren+:
- charge for real incremental value,
- do not manufacture pain/friction,
- never paywall privacy basics.

Current support:
- voluntary PromptPay Thailand,
- voluntary Ko-fi worldwide.

No formal investment/partnership route at present.

---

# 45. PRODUCT SUCCESS METRICS — WHEN TELEMETRY EXISTS

Prefer product-quality metrics over vanity downloads:
- Check-in completion without friction,
- useful return behavior,
- Archive revisit for understanding,
- explanation/evidence-sheet use,
- longitudinal continuity,
- low confusion/mistrust,
- qualitative “this understands me” feedback,
- crash-free launches,
- low regression rate.

Do not optimize DAU through nagging.

Current **91% ±3%** is an operational-readiness estimate, not one of these live product KPIs.

---

# 46. SAFETY / ETHICS / CLAIMS

Auren = wellbeing/personal intelligence, not medical care.

Never:
- diagnose,
- fabricate biomarkers,
- infer psychiatric diagnosis from Mood/Stress,
- claim emergency monitoring,
- claim medical certainty,
- moralize weight,
- represent Core animation as measured life force,
- imply state tint is a clinical finding,
- promise disease prevention/treatment without evidence/regulatory basis.

Always distinguish:
- Observed,
- Calculated,
- Inferred.

Body/weight language must preserve dignity and agency.

---

# 47. DECISION FILTER

Before adding/changing anything ask:

1. Does it materially improve user understanding?
2. Is evidence/context sufficient?
3. Does it overclaim?
4. Is interaction intuitive?
5. Does it preserve quiet luxury?
6. Does it add privacy/regulatory cost beyond value?
7. Can correctness/regression be tested?
8. Does it disturb known-good production?
9. Is rollback/fallback defined?
10. Is user value worth complexity?
11. Is the same value achievable with less scope?
12. Will this still make sense after months of real history?

If uncertain:

> **less scope, deeper polish**

---

# 48. LOCKED VS PROVISIONAL VS EVOLVABLE

## Locked / protected
- Auren = Personal Health Intelligence
- `Your body, understood.`
- Data → Pattern → Meaning → One useful decision
- trust before intelligence
- local-first V1
- EN/TH first-class
- no medical overclaim
- no addiction mechanics
- quiet premium identity
- Build 16 Opening handoff
- Build 25 slider semantics
- Daily Check-in one-record/day editable same day
- Body Intelligence guardrails
- Build 29 Archive baseline
- Build 30/33 You hierarchy
- Build 36 Body Context
- Build 31 Legal foundation
- Build 37 Help/Support contract
- Build 38 shell recovery
- Build 50 Core rollback anchor
- regression/rollback requirement
- packaging contract
- Commit name <=50 chars

## Provisionally locked / current candidate
- Build 51 Today Signature Core adaptation

## Evolvable with evidence
- exact Core micro-motion only for real defect,
- confidence weighting,
- Rhythm/Signals evidence-calibrated refinement,
- long-history presentation,
- future data export,
- cloud/integrations,
- Auren+ packaging,
- N-of-1 experiment architecture.

---

# 49. NEW-ROOM ZERO-QUESTION CONTINUATION

On the first Auren task in a new room:

1. Read this Master Plan fully.
2. Read current Migration Prompt fully.
3. Inspect current repo HEAD.
4. Inspect Build/cache/schema.
5. Treat repo as possibly newer than this document.
6. If newer, current production wins.
7. Do not ask historical/vision questions recoverable from docs/repo.
8. Establish baseline and rollback.
9. Define changed-file allowlist.
10. Protect stable production.

Do not ask again:
- what Auren is,
- tagline,
- visual direction,
- Core/Halo philosophy,
- Daily Check-in contract,
- Body Intelligence doctrine,
- Rhythm/Signals/Archive purpose,
- You/Settings direction,
- privacy philosophy,
- packaging workflow,
- commit-name rules.

If actual repo = Build 51:

> **deploy and physically verify Build 52 first**

If actual repo = Build 52:

> **finish Build 52 physical QA before Build 53**

If actual repo = Build 53 and physical QA passed:

> **continue with longitudinal validation and final RC regression**

---

# 50. RELEASE DECISION RULE

A new feature may enter Auren 1 only when one of these is true:
- it closes a real usability/trust gap,
- it is necessary for release quality,
- it enables a core promise that is currently missing.

A feature should be deferred when:
- it is mainly decorative,
- it expands scope without increasing understanding,
- it creates startup/data risk,
- it requires disproportionate backend/regulatory complexity,
- it weakens calm hierarchy,
- or it exists merely to increase the feature count.

---

# 51. CURRENT NEXT-ACTION COMMAND

At this Revision 4.1:

- current production = **Build 53**
- verified production HEAD = **39015d7b0a46f82d62989bfd08c4927561ebaadc**
- Build 50 = **accepted Core rollback anchor**
- Build 51 Core direction remains protected
- Build 52 trust/accessibility hardening is deployed with no observed regression in tested mobile flows
- Build 53 PWA/offline hardening **physically passed online + offline testing**
- current readiness estimate = **91% ±3%**
- next major work = **Longitudinal Validation + Final RC Regression**
- Build 54 exists only for a real defect or clearly justified surgical improvement

The next development mindset is no longer:

> “What feature should we add?”

It is:

> **“What still prevents this from being a release-grade, world-class product?”**

---

# 52. FINAL OPERATING PRINCIPLE

Auren must make two things true at once:

> **“I understand myself better.”**

and

> **“This feels impossibly refined.”**

If something looks sophisticated but reduces trust:

> remove it

If something is useful but cluttered:

> refine it

If something is stable and excellent:

> **do not touch it without a real reason**

If a tiny optional feature can break the app:

> architecture is wrong; redesign before shipping

If real-device behavior disagrees with static assumptions:

> **real-device behavior wins**

If forced to choose between shipping more and finishing what exists to world-class quality:

> **finish what exists**
