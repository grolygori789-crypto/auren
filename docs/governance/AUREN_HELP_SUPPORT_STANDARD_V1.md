# AUREN — HELP, FEEDBACK & SUPPORT STANDARD V1

**Product:** Auren  
**Studio:** Benedict Interactive  
**Runtime introduced:** Build 37 candidate  
**Known-good baseline before this scope:** Build 36  
**Legal Version:** 1.0.0  
**Data Schema:** 4

## 1. Purpose

Help, Feedback & Support is product infrastructure. It gives users a private way to report problems, send suggestions and voluntarily support Auren without adding accounts, analytics, donor entitlements, health-data upload or payment state.

The design is adapted from Benedict Interactive support infrastructure already used in Little Ganesha Tarot, but the copy and privacy boundary are rewritten for Auren's health-context product.

## 2. You placement

The You screen order becomes:

1. Body & understanding
2. Preferences
3. Privacy & access
4. Help & feedback
5. Support Auren
6. About
7. Build footer

Help actions:
- Report a problem
- Send feedback

Support actions:
- Support in Thailand — PromptPay
- Support worldwide — Ko-fi

No partnership/investment action is part of this standard.

## 3. Official routes

Support email:
- `benedict.support@gmail.com`

Worldwide support:
- `https://ko-fi.com/benedictinteractive`

Thailand support QR source:
- Benedict Interactive's already-approved public PromptPay QR asset currently stored in the Little Ganesha Tarot repository.

These destinations must not be silently replaced, shortened or decorated with tracking parameters.

## 4. Report a problem

The user writes the report.

Safe technical diagnostics are ON by default and visibly previewed before the email draft is opened.

The app uses a user-initiated `mailto:` draft. It does not send the report in the background.

## 5. Send feedback

The user writes feedback.

Safe diagnostics are OFF by default. The user can opt in.

The same user-controlled `mailto:` transport and copy fallback apply.

## 6. Auren-safe diagnostic contract

Diagnostics may include only:

- Auren Build number
- interface language
- coarse operating platform
- browser family + major version
- Browser vs Installed PWA
- current screen label
- ISO timestamp

Diagnostics must never automatically include:

- display name
- age
- sex
- height
- weight
- BMI
- waist circumference
- body-fat information
- activity/training data
- goals
- profile photo
- check-in values/history
- Body Intelligence output
- Rhythm/Signals/Archive content
- health or symptom text
- legal acknowledgement timestamp
- payment information
- clipboard contents
- files/screenshots
- precise location
- advertising identifiers
- persistent support IDs

## 7. Privacy behavior

Opening Help & Feedback sends nothing.

Opening a mail draft does not send it; the user's email client controls final sending.

The UI explicitly warns users not to include health details, passwords, payment details, profile photos or private check-in history.

Attachments are never captured or added automatically.

## 8. Thailand support

PromptPay is voluntary.

Rules:

- no preset amount
- QR remains unmodified
- recipient identity is shown in both approved forms: `จักรพันธ์ เบญจศุภนิมิต` / `Jakraphan Benjasupanimit`
- user must verify the recipient in the banking app
- Auren does not claim payment success
- no payment callback
- no transaction state
- no donor identity
- no feature unlock
- no analytics

The current Build 37 package does not duplicate the QR binary into Auren. It loads the already-approved public Benedict Interactive QR asset only after the user explicitly opens Thailand Support, using a no-referrer request where supported.

The support page states that no Auren profile/health information is attached to the QR request.

## 9. Worldwide support

Ko-fi navigation:

- is directly user initiated
- opens externally
- uses `noopener,noreferrer`
- contains no analytics/tracking parameters
- sends no Auren health/profile data
- creates no entitlement or payment state inside Auren

Payment/account information is handled by Ko-fi outside Auren.

## 10. Product ethics

Support must remain quiet and voluntary.

Auren must not use:

- donation popups on Today
- guilt copy
- artificial urgency
- streak pressure
- locked health intelligence
- better recommendations for supporters
- supporter badges that expose payment status
- donor-only clinical/wellbeing claims

The user discovers Support only by going to You.

## 11. Failure isolation

Help/Support is lazy-loaded with the You surface.

Failure must not affect:

- Signature Opening
- Core/Halo
- Today
- Daily Check-in
- Body Intelligence
- Rhythm
- Signals
- Archive
- You's existing stable groups
- Legal Center
- storage/schema

If Help/Support fails, the rest of Auren remains usable.

## 12. Legal version decision

Build 37 does not change Auren Legal Version 1.0.0.

Reason:

- support is optional
- no Auren payment/account backend is introduced
- no health-data processing purpose changes
- no health information is transmitted to Ko-fi or the support email automatically
- external-provider handling is disclosed at the point of use
- existing Terms already establish third-party-platform boundaries

A future backend payment system, donor account, entitlement, subscription, remote support upload or health-data attachment requires a new legal/privacy review.

## 13. QA release blockers

Static/package:
- Build 37 / Schema 4
- `node --check` changed JS
- Help/Support only lazy-loads from You
- support destinations exact
- no analytics/tracking params
- no localStorage/IndexedDB
- diagnostics contain no health/profile selectors
- service worker adds only Help/Support assets
- no Build 26 guidance
- package has canonical repo paths

Physical:
- Opening unchanged
- Today/Check-in unchanged
- You existing groups unchanged
- Help group appears before Support
- Support appears before About
- Build footer remains last
- Report form opens
- diagnostics default ON for report
- diagnostics default OFF for feedback
- email draft works where mail client is configured
- copy fallback works
- Thailand QR renders or cleanly falls back
- Ko-fi opens only after explicit CTA
- EN/TH copy works
- close/escape/focus behavior works
- Reduced Motion usable

Physical acceptance must be supplied by P'Benz before Build 37 becomes the known-good baseline.

