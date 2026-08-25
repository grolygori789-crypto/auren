# Auren Contextual Intelligence V1

**Build:** 9  
**Status:** Production foundation  
**Principle:** Personal context before generic weight judgment.

## Why this layer exists

Auren must never reduce a person to `height + weight -> BMI -> instruction`. BMI is useful as a low-cost screening reference, but it cannot distinguish fat mass from muscle or bone and does not describe fat distribution. Build 9 therefore treats BMI as one transparent input inside a wider body-context model.

## Inputs

### Required body context
- Age
- Height
- Current weight
- General activity level
- Training type
- Training frequency
- User goal

### Sex-specific reference context
`Sex used for health calculations` is separate from identity and avatar appearance. It is only used where a reference genuinely differs by physiological sex. Users can decline sex-specific interpretation.

### Optional evidence
- Waist circumference
- Measured body-fat percentage

Auren never estimates body fat from a profile photo. Different body-fat measurement methods can disagree, so V1 stores a supplied value as supporting evidence rather than forcing it into a universal classification.

## Adult BMI guardrail

For adults age 20+, Auren retains the general BMI screening categories:
- <18.5
- 18.5–24.9
- 25.0–29.9
- >=30

These are shown as **general screening references**, never as a diagnosis or automatic weight-change recommendation.

## Muscular / training context

Regular resistance, mixed, or athletic training can raise lean mass and therefore body weight. Build 9 does **not** create a custom higher BMI threshold for athletes. Instead, training context changes the confidence and wording of the interpretation:

- High BMI + consistent resistance/athletic training -> BMI-only conclusion becomes lower confidence.
- High BMI + consistent training + waist below the selected general adult threshold -> muscularity becomes a plausible contributor.
- Selecting “weight training” never makes a high BMI automatically healthy.
- Waist, optional body composition, trend, and the rest of the user context remain relevant.

## Waist context

For adults who explicitly select a male or female physiological reference, Build 9 can compare a supplied waist measurement with the general NHLBI adult thresholds:
- Male reference: >102 cm
- Female reference: >88 cm

Auren labels these as general references and explicitly warns that population, age, and other contextual differences exist. The threshold is not used as a diagnosis.

## Youth guardrail

Auren does not apply adult BMI categories below age 20. Child and teen BMI interpretation requires age- and sex-specific growth references. Build 9 intentionally returns a limited interpretation rather than approximating or silently applying adult cutoffs.

## Confidence model

Body Context exposes qualitative confidence instead of a fabricated precision score. Confidence can increase when more independent context is available, such as:
- consistent training pattern
- training frequency
- waist measurement with an applicable reference
- measured body-fat value
- repeated weight history

Confidence communicates **how much context Auren has**, not certainty about health.

## Auren Halo semantics

The Halo has four semantic fragments:
1. Body Context
2. Daily State
3. Movement
4. Personal Trend

Missing evidence remains faint. Auren never completes the ring merely for visual symmetry.

## Trust model

- **Observed** — supplied by the user
- **Calculated** — deterministic transformation such as BMI or monthly averages
- **Inferred** — contextual interpretation that must expose its limitations

Every important interpretation should be answerable through “Why this?” or contextual guidance.

## Public-health reference basis

Build 9’s guardrails were checked against current CDC guidance on adult BMI, CDC guidance on child/teen BMI-for-age, CDC statements that BMI cannot distinguish fat from muscle, and NHLBI guidance on waist circumference. These sources inform the reference behavior; they do not make Auren a medical device or diagnostic service.
