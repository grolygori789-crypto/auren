# Auren Body Intelligence V1 — Approved Product Expansion

Status: Approved direction / Build 6 implementation note

This document records the latest approved product direction and should be read together with the canonical `AUREN_MASTER_PLAN.md`. Where older product scope conflicts, the project's conflict order applies: latest explicit user instruction > current implementation > Master Plan > older context.

## Product intent

Auren should help people understand both:

1. **Where the body is now** — body context from age, height, current weight, activity and goal.
2. **How the person feels today** — sleep, energy, stress, mood and movement self-report.
3. **Where the person is going** — personal trend and continuity over time.

This extends, rather than replaces, Auren's original personal-baseline model.

## Auren Halo

The Auren Halo is a signature explainable visualization around the Auren Core. V1 uses four segments:

- Body Range
- Daily State
- Movement
- Continuity

The Halo is not a medical score. It must never imply diagnostic certainty or fabricated precision. Every segment must be explainable as Observed, Calculated or Inferred, with the supporting data visible on request.

Possible overall language includes Building Context, Learning, Strong Balance and Excellent Balance. Positive states must explicitly refer to the data available to Auren rather than claim that a person is medically healthy.

## Body Profile V1

Required fields:

- Age
- Height
- Current weight
- Typical activity level
- User goal: understand / maintain / consider losing / consider gaining

No sex or gender field is required for the adult BMI calculation in this build. Auren should not collect sensitive biological information without a concrete analytical need.

## Reference model guardrails

For adults age 20+, Build 6 uses BMI as one general context signal only. It does not treat BMI as an ideal-weight verdict or overall health assessment and must expose its limitations, including inability to distinguish muscle from body fat.

For people under age 20, Build 6 stores the profile but does **not** apply adult BMI categories. Youth interpretation requires an age-appropriate growth reference; Auren should not pretend otherwise.

User goals do not alter or bias the reference interpretation. Auren should never tell a person to lose weight merely because they selected a weight-loss goal.

## Daily-use principle

Auren should create useful value in roughly 15–30 seconds rather than maximize time-in-app. The desired loop remains:

CHECK IN → CORE REACTS → STATE REVEAL → SIGNAL → EVIDENCE → ONE ACTION → OUTCOME → MODEL LEARNS YOU

No guilt streaks, scarcity mechanics or manipulative retention patterns.

## Reference provenance for Build 6

The adult BMI bands implemented in Build 6 follow the standard CDC adult categories (under 18.5, 18.5–24.9, 25.0–29.9, and 30+), applied only from age 20 onward. CDC child and teen guidance uses BMI-for-age percentiles rather than adult cut points; because that interpretation depends on an age-appropriate growth reference, Build 6 deliberately withholds youth classification rather than reuse adult bands.

These references support context, not diagnosis. Future body-composition, waist, clinical-risk or youth-growth features must add their own validated provenance before release.

## One useful move

Today should surface one low-friction action selected from the user's current self-report and available body context. This is intentionally not a treatment plan. The first priority is today's observed state (sleep, stress, movement, energy); body-reference information is used only when it adds context. When nothing clearly warrants a change, Auren should say so rather than invent advice.
