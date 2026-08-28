# AUREN — LEGAL & TRUST STANDARD V1

**Product:** Auren  
**Studio:** Benedict Interactive  
**Runtime introduced:** Build 31  
**Legal Version:** 1.0.0  
**Effective / updated:** 28 August 2026  
**Known-good rollback:** Build 30 — physically accepted by P'Benz  
**Build 31 package status:** Candidate pending physical-device acceptance

## 1. Purpose

Build 31 establishes Auren's legal, intellectual-property, privacy and usage-governance foundation before full-system production hardening. It protects the product without overclaiming rights, weakening trust or coupling legal presentation code into startup-critical rendering.

User-facing suite:
1. Terms of Use
2. Privacy Policy
3. Copyright & Intellectual Property
4. Third-Party Notices
5. About Auren

Repository protection:
- proprietary root `LICENSE.md`
- this governance standard
- in-app Legal Center
- versioned local acknowledgement

## 2. Product-specific risk model

The structure is informed by Benedict Interactive's Little Ganesha Tarot legal/content-protection system and Velnox legal suite, but Auren needs stronger health-specific boundaries:

- non-medical / non-diagnostic status
- emergency non-reliance
- self-report and population-reference limitations
- sensitive/health-data treatment
- local-device security and loss
- future cloud/wearable consent gates
- no profiling another person without lawful authority
- no false presentation of Auren output as clinical evidence

## 3. Ownership discipline

Protect only what law can legitimately protect: original code, protectable UI/UX expression, branding, Core/Halo expression, writing/localisation, documentation, assets, original arrangement and other protectable human-authored/human-directed contributions.

Do not claim exclusive ownership over health/scientific facts, BMI/formulas, ideas, methods, systems, procedures, common UI conventions, public-domain material or third-party rights.

AI-assisted work is described conservatively; no rights are claimed beyond applicable law.

## 4. Public repository rule

A proprietary licence does not make a public repository private. GitHub can grant platform-specific viewing/forking rights under its Terms.

Correct distinction:

> Technical/public visibility and platform rights do not create a general Auren commercial/source-code licence.

Repository visibility must be reviewed separately before major commercial launch. Never change it automatically because deployment can depend on it and existing forks/copies cannot necessarily be recalled.

## 5. End-user permission

Default permission:
- ordinary personal wellbeing use
- limited
- revocable where law permits
- non-exclusive
- non-transferable
- no ownership transfer

Personal, non-commercial screenshots of the user's own experience are allowed. PWA screenshot blocking is not required and absence of blocking grants no extra rights.

## 6. Prohibited-use baseline

Cover:
- unlawful use / third-party-right violations
- impersonation / false affiliation
- malware / interference
- bypassing security/access controls
- unauthorised vulnerability exploitation
- systematic scraping / bulk extraction
- unauthorised source/asset redistribution
- copied/deceptive competing products
- unauthorised commercial derivatives
- dataset/model-training uses where permission is legally required
- falsifying Auren output as clinical evidence
- building another person's health profile without lawful authority/permission

Reverse-engineering restrictions must preserve non-waivable law, interoperability and legitimate security-research exceptions.

## 7. Health and safety boundary

Auren is wellbeing/personal intelligence, not medical care. Legal text must make clear it is not a doctor, medical device, diagnosis/treatment service, emergency monitor, clinical decision support or substitute for professional medical judgment.

Never rely on Auren for urgent symptoms, medication/treatment changes or emergency-care decisions. Never promise health outcomes.

## 8. Evidence truthfulness

Legal copy must match product truth:
- Observed = user supplied
- Calculated = deterministic
- Inferred = contextual interpretation
- population references have limitations
- self-report can be incomplete
- personal relationships do not establish causation
- Confidence is not certainty of health
- insufficient evidence is a valid output

## 9. Privacy truthfulness

Build 31 remains local-first:
- no account required
- IndexedDB `auren`
- profile/check-ins local
- profile photo local
- preferences local
- no ordinary Auren health-data cloud database
- no face recognition/body-fat/health inference from profile photo
- no Benedict Interactive ad SDK, behavioural-ad SDK or product analytics SDK identified in current runtime

Never say “no data ever leaves the device.” Web/PWA hosting and network infrastructure can receive ordinary request metadata. Local data is not separately encrypted by Auren and is not cloud backup.

## 10. Sensitive/health-data rule

Health information can receive heightened legal protection, including Thai PDPA Section 26.

Build 31 acknowledgement is Terms acknowledgement, not blanket consent for every future health-data use.

Any future material remote flow involving health-related data — cloud backup, sync, account storage, wearable import, analytics or similar — is a release blocker until:
1. data categories are mapped
2. source/destination/purpose are documented
3. provenance is preserved
4. retention/deletion are defined
5. third parties are identified
6. Privacy/Terms are updated
7. consent or another lawful basis is implemented where required
8. Legal Version re-acknowledgement is reviewed

## 11. Legal acknowledgement architecture

Legal Version is separate from Build. Current: **1.0.0**

Local keys:
- `auren.pref.legal.acceptedVersion`
- `auren.pref.legal.acceptedAt`

Store no remote identity/account record.

Material Legal Version changes can require acknowledgement again. The explicit action is:

> Agree & Continue / ยอมรับและใช้งานต่อ

Users can review Terms and Privacy before agreeing. Do not bundle this with marketing consent.

## 12. Startup safety

Build 26 proved optional layers must not control startup. Build 31 therefore:
1. dynamically imports Legal Center only after `window.load`
2. keeps the module isolated
3. waits for `#app.ready`
4. waits for Signature Opening to leave
5. only then presents first-version acknowledgement
6. never changes Opening/Core initialization
7. never changes `app.js`
8. never changes data schema
9. import failure fails open instead of freezing startup
10. broken Legal Center remains a release-blocking QA defect

Contractual UI is required product behavior, but it must not have technical authority to brick the app.

## 13. Legal Center UX

Legal Center belongs in You → About. It must support EN/TH, show Build and Legal Version separately, expose all five documents, support keyboard/focus, safe areas and Reduced Motion, and make the underlying app inert while open.

Mandatory first acknowledgement cannot be dismissed without agreement; the voluntary Legal Center can close normally after acknowledgement.

Do not turn Today into a legal surface.

## 14. Age/capacity

Do not create fake age verification. The profile age remains a health-reference input, not legal proof of age. Terms require appropriate guardian/legal-authority involvement where the user cannot independently agree.

## 15. Third-party discipline

Third-party rights remain separate. Build 31 uses browser-native technologies and does not intentionally bundle a third-party JS application framework or analytics SDK. System/local font references are not bundled font licences.

Future Apple Health/HealthKit, Health Connect or wearable integrations require updated notices before release.

## 16. Data-lifecycle coherence

Legal acknowledgement keys use `auren.pref.` so the accepted Build 14/30 full-erase flow removes them with other Auren preferences. No schema bump is justified.

After full erase, the next fresh launch must request acknowledgement again.

## 17. Legal-version governance

Increment Legal Version for material changes such as remote health-data processing, materially broader data purposes, account/cloud introduction, material licence/prohibited-use changes, liability/dispute changes or monetisation terms that change user obligations.

Editorial corrections that do not materially change rights/obligations may retain Legal Version after review.

## 18. Protected production boundary

Build 31 must not modify Signature Opening, Core/Halo, Today logic, Daily Check-in semantics, Body Intelligence, Rhythm/Signals engines, Archive behavior, IndexedDB schema or deletion semantics.

Known-good rollback = Build 30.

## 19. QA release blockers

Static/package QA:
- `node --check` changed JS/SW
- Build/cache coherence
- Legal Version coherence
- SW legal assets exist
- no Build 26 guidance import/cache
- first acknowledgement cannot be dismissed by Escape
- voluntary Legal Center can close
- EN/TH switch
- 360/393 px layout intent
- Reduced Motion
- legal keys use full-erase preference namespace

Physical QA:
- cold Signature Opening unchanged
- legal gate appears only after Opening
- Terms/Privacy review works
- Agree & Continue unlocks app
- repeat launch does not re-show gate
- full erase causes gate on next fresh launch
- Legal Center appears under You/About
- Today/Check-in/Archive remain unchanged

Never claim physical acceptance from static QA.

## 20. Legal-review caveat

No template guarantees enforceability in every jurisdiction. Before a major paid/store launch or remote processing of health data, qualified technology/privacy/IP counsel should review:
- legal identity of operator/rights holder
- official private contact channel
- governing-law/dispute language
- health/wellbeing claims
- privacy roles/lawful bases
- minors/capacity
- remote health-data flows
- mandatory consumer rights
- commercial licensing and public-source strategy

## 21. Roadmap consequence

Build 31 Legal & Trust Foundation takes priority over the previously planned full-system hardening.

After Build 31 is physically accepted:

> **Build 32+ — Full-System QA & Production Hardening**

Update the canonical Master Plan and Room Migration Prompt in the acceptance/docs batch so future rooms treat Build 31 as the legal/trust known-good baseline.
