# A U R E N

> **Your body, understood.**

**MASTER PLAN · PRODUCTION CONTINUATION EDITION · Revision 2.1**  
Product · Design · Engineering · Intelligence · Trust · Growth · Handoff  
Benedict Interactive · 26 August 2026

Status: **Canonical operating foundation for continued development**

---

# 0. North Star — ภาพเดียวที่ทุกห้องต้องเห็นตรงกัน

Auren ไม่ใช่ “health tracker ที่สวย” แต่คือ **Personal Health Intelligence** ที่ช่วยให้ผู้ใช้เข้าใจว่า ชีวิต พฤติกรรม บริบทของร่างกาย และแนวโน้มของตัวเองสัมพันธ์กันอย่างไร โดยทำให้ข้อมูลกลายเป็นความหมายที่เข้าใจง่าย สวยมาก น่าเชื่อถือ และเป็นส่วนตัว

Auren ต้องให้ความรู้สึกเหมือนผู้ใช้ได้รับ **privileged access to an ultra-premium world-class product** ที่ปกติควรมีราคาแพงมาก แม้ช่วง Early Access จะเปิดประสบการณ์หลักอย่างใจกว้าง

**Product:** AUREN  
**Category:** Personal Health Intelligence  
**Primary tagline:** **Your body, understood.**  
**Studio:** Benedict Interactive  
**Initial platform:** Mobile-first Premium PWA / Web App  
**Initial stack:** HTML + CSS + JavaScript + SVG + Canvas; WebGL/Three.js เฉพาะเมื่อมีเหตุผลจริง  
**V1 data philosophy:** self-report + personal baseline + transparent contextual analysis  
**V1 does not require:** wearable, Bluetooth, medical backend, AI chatbot, social feed  
**Primary early success:** trust + retention + usefulness, not downloads or monetization

> **Auren promise:** Data → Pattern → Meaning → One useful decision

---

# 1. Authority — Full Authorized DEV 100%

ในโปรเจกต์ Auren ให้ “บิ๊ว” ในห้องปัจจุบันทำหน้าที่เทียบเท่า **Founder-Operator + Product Owner + Principal Product Designer + CTO + Trust Lead + Growth Lead** และมีอำนาจตัดสินใจด้านผลิตภัณฑ์ **100%** ภายใต้ North Star และ trust boundaries ของเอกสารนี้

พี่เบนซ์เป็นผู้เสนอแนวคิด ความเห็น ปัญหาที่พบ และทำ physical-device acceptance เป็นหลัก แนวคิดของพี่เบนซ์เป็น input ที่มีคุณค่าสูง แต่ไม่ใช่ข้อบังคับให้ DEV ทำตามโดยอัตโนมัติ หากมีวิธีที่ดีกว่าต่อผลิตภัณฑ์ DEV ต้องเลือกวิธีที่ดีกว่าและอธิบายสั้นๆ

DEV มีสิทธิ์ตัดสินใจหรือเปลี่ยน:
- product direction และ feature priority
- information architecture / navigation
- UX/UI / visual hierarchy / motion
- Auren Core / Halo / visual semantics
- health-intelligence architecture และ confidence model
- storage / technical architecture
- localization / content hierarchy
- roadmap / monetization / launch strategy
- QA gates และ release scope

**แต่ Product Authority ไม่เท่ากับ Remote Write Authority**: พฤติกรรมมาตรฐานยังเป็น **ทำไฟล์ให้พี่เบนซ์อัปโหลด GitHub เอง** เว้นแต่พี่เบนซ์สั่งให้ push/แก้ GitHub โดยตรงใน turn ปัจจุบัน

ห้ามถามพี่เบนซ์ให้เล่าซ้ำเรื่องที่ recover ได้จาก Master Plan, repo, handoff prompt, current production หรือ approved assets

ถามเฉพาะเมื่อ:
1. เป็นข้อมูลใหม่ที่ recover ไม่ได้จริง
2. ต้องใช้ credential / consent
3. เป็น irreversible external action ที่จำเป็นต้องมี owner approval

---

# 2. Source of Truth & Conflict Order

Canonical files:
1. `docs/product/AUREN_MASTER_PLAN.md` — Source of Truth หลัก
2. `docs/handoff/AUREN_ROOM_MIGRATION_PROMPT.md` — zero-question startup prompt
3. Current production on `grolygori789-crypto/auren` branch `main`

เมื่อข้อมูลขัดกันให้ใช้ลำดับนี้:

**latest explicit instruction from P’Benz → current production/live implementation → Master Plan → approved assets → repo/history → older chat context**

ก่อน substantial change:
1. อ่าน Master Plan
2. inspect current repo HEAD
3. inspect build/cache/data schema
4. กำหนด scope + changed-file allowlist
5. implement แบบ surgical
6. regression QA
7. ส่งไฟล์ + clickable links + Commit name

---

# 3. Product Principles — Non-Negotiable

| Principle | Rule |
|---|---|
| Trust before intelligence | ถ้าดูฉลาดขึ้นแต่ผู้ใช้เชื่อน้อยลง = ถอยหลัง |
| Usability before spectacle | สวยแต่ใช้ยาก = fail |
| Complex underneath, calm on surface | logic ซับซ้อนได้ แต่ UI ต้องสงบ |
| Evidence before claims | ทุก insight สำคัญต้องอธิบายที่มาได้ |
| Personal baseline first | เปรียบเทียบกับตัวเองก่อน population claim |
| Context before judgment | ห้ามใช้ metric เดียวตัดสินคน |
| Progressive disclosure | ไม่ยัดคำอธิบายยาวบนหน้าหลัก |
| No fake precision | ไม่มี health score 92/100 ถ้าไม่มีฐานจริง |
| No addiction mechanics | ไม่มี guilt streak / nagging / scarcity |
| Privacy as product feature | local-first เท่าที่เหมาะสม |
| Motion must communicate | animation ต้องมีหน้าที่ |
| Ship narrow, polish deeply | ฟีเจอร์น้อยแต่จบ ดีกว่าของเยอะแต่ครึ่งๆ |
| Visual meaning over decoration | element ที่อธิบายอะไรไม่ได้ไม่มีสิทธิ์แย่งพื้นที่ |

---

# 4. Brand & Visual DNA — สิ่งที่ห้ามทำหาย

Auren ต้องรู้สึก **quiet luxury + intelligent wellness + biological calm** ไม่ใช่ hospital dashboard, fitness-bro app, crypto orb, sci-fi HUD หรือ generic pastel wellness app

Primary visual language:
- warm pearl / ivory / cream
- restrained champagne gold
- pale mineral aqua
- charcoal text
- controlled sage / rose / dusk accentsเมื่อมี semantic reason
- translucent glass surfaces
- generous whitespace
- editorial typography
- extremely restrained borders and shadows

คุณภาพเป้าหมาย:
> “This feels like a billion-dollar premium app, and I somehow got special access to it.”

ห้ามใช้คำว่า premium เป็นข้ออ้างให้ใส่ glow, glass, line, gradient หรือ ornament มากเกินไป ทุก effect ต้องมีเหตุผล

## 4.1 Auren Atmospheres — Locked Theme System

ไม่ใช่ color picker ทั่วไป แต่เป็น curated atmosphere system:
1. **Pearl Dawn** — ivory / champagne / blush
2. **Mineral Mist** — pearl / pale aqua / cool grey-blue
3. **Rose Veil** — cream / nude rose / dusty blush
4. **Sage Haze** — ivory / pale sage / mineral green
5. **Quiet Dusk** — champagne / mauve-grey / blue-grey

Atmosphere ต้องเปลี่ยน background, glass, nav, accents, Core reflection/tint และ semantic accents อย่าง coherent ไม่ใช่แค่ background

---

# 5. Auren Core — Signature Object

Auren Core คือ transparent glass orb ที่มี living biomaterial / liquid light อยู่ภายใน ต้องดูเป็น object ที่มีชีวิตอย่างสงบและเป็นเอกลักษณ์ของแบรนด์

## Locked visual direction
- ขอบแก้วต้อง **บางและใสมาก**
- ห้ามกลับไปเป็นวง outline หนาๆ
- ให้เห็นความเป็นแก้วจาก refraction, highlight, optical distortion, contact shadow มากกว่าเส้นขอบ
- liquid เป็น **champagne-gold dominant ~75–80%** + **pale/mineral aqua undertone ~20–25%**
- aqua ต้องยังอ่านได้ผ่าน depth/refraction ไม่ปล่อยให้ Core กลายเป็น “ลูกแก้วทอง”
- asymmetry เล็กน้อยเพื่อให้ organic
- ของเหลวต้อง pool/slosh ตามแรงโน้มถ่วงอย่าง believable

## Living motion
ปัญหาที่เคยเกิด: motion ช้ามากจนสมองอ่านเป็นภาพนิ่ง

กฎใหม่:
- idle motion ต้องมองเห็นได้ภายในประมาณ **1–2 วินาที**
- มี gentle internal circulation + inertia + surface movement
- มี event response หลัง check-in / profile update / state transition แล้วค่อย settle
- ห้ามวุ่นวายเหมือน screensaver
- Reduced Motion ต้องมี fallback ที่สงบ

## Signature Opening
ผู้ใช้ชอบ opening ที่มีเวลาให้รู้สึกถึงแบรนด์ประมาณ 3–4 วินาที ไม่ใช่แวบเดียว

Current accepted direction:
- warm atmosphere
- Core reveal
- A U R E N
- “Your body, understood.”
- “By Benedict Interactive” แบบ understated
- normal cold launchประมาณ 3.7s ก่อน transition
- first-launchประมาณ 4.1s
- transitionประมาณ 0.8s
- warm resume ไม่ replay โดยไม่จำเป็น

Exact timings evolvable แต่ principle ไม่เปลี่ยน: **opening ต้องรู้สึก intentional ไม่ช้าเกินและไม่ flash ผ่าน**

---

# 6. Halo — Semantic Instrument, Not Decoration

บทเรียนสำคัญ: Halo เคยเป็นวง arc ใหญ่ แข็ง กว้าง รก และดูเหมือน loading/progress gauge มากกว่า premium intelligence

Halo ปัจจุบันต้องยึดกฎ:
- hairline / luminous fragments
- อยู่ใกล้ Core ไม่กินพื้นที่มหาศาล
- soft endpoints
-ไม่ complete ring เพื่อความสวย
- missing evidence = faint / incomplete
- semantic ก่อน symmetry
- แตะ `Why this?` แล้วตอบได้ว่าทุก fragment หมายถึงอะไร

Canonical Halo dimensions:
1. **Body Context**
2. **Daily State**
3. **Movement / Training**
4. **Personal Trend**

ถ้า element ไม่มีข้อมูลหรือไม่มี semantic value ให้ลด visibility หรือไม่แสดง

---

# 7. Today Experience — Core Loop

> **CHECK IN → CORE REACTS → STATE REVEAL → EVIDENCE → ONE USEFUL MOVE → CONTINUITY**

Today ต้องตอบผู้ใช้ภายในไม่กี่วินาทีว่า:
1. วันนี้ฉันเป็นอย่างไร
2. Auren เห็นอะไร
3. มันรู้จากอะไร
4. ฉันควรทำอะไรหนึ่งอย่าง หรือไม่ต้องแก้อะไร

## Daily Check-in
Core observations:
- Sleep
- Energy
- Stress
- Mood
- Movement

ต้องใช้มือเดียวได้และเร็ว ไม่กลายเป็น questionnaire

**Directionality rule:**
- Sleep/Energy/Mood/Movement สูง โดยทั่วไป = positive ตาม scale
- **Stress สูง = negative/attention**
- ห้ามทำ `5/5 Stress` ดูดีเหมือน `5/5 Sleep`

## Post-check-in language
หลีกเลี่ยง database wording เช่น “Today is recorded.” ถ้าฟังเย็นหรือ technical เกินไป

Accepted tone:
- `Today, captured.`
- copy สั้น สงบ และบอกว่า baseline กำลังโต

## Five daily state cards
Current accepted visual:
- layout **3 cards + 2 centered cards** บนมือถือ
- Sleep / Energy / Stress / Mood / Movement
- แต่ละช่องมี semantic icon + subtle accent
-ไม่ลงสีเต็มการ์ด
- icon ต้อง optical-center จริง ไม่ใช่แค่ mathematical center
- accepted optical offsets ถูก polish หลัง Build 10
- label / state / score hierarchy ต้องอ่านเร็ว
- icons ต้องไม่ดู childish หรือ fitness-dashboard

## One Useful Move
หลัง check-in reward หลักต้องเป็น **meaning/action** ไม่ใช่ปุ่ม Edit

ตัวอย่าง:
- `Maintain what’s working.`
- `Give yourself a quieter evening.`
- `Add a little easy movement.`

Auren ต้องยอมพูดว่า “ไม่มีอะไรต้องแก้วันนี้” เมื่อข้อมูลไม่สนับสนุนการเปลี่ยน

---

# 8. Body Intelligence — Contextual, Not Weight Judgment

กฎสำคัญที่สุด:

> **Auren ห้ามทำ height + weight → BMI → verdict → weight-loss instruction**

BMI เป็นเพียง screening reference หนึ่งตัว ไม่สามารถแยก fat mass / muscle / bone และไม่ควรถูกใช้แทน body composition

## Required / core profile context
- Age
- Height
- Current weight
- General activity level
- Training type
- Training frequency
- Goal

## Sex used for health calculations
ต้องแยกจาก gender identity และ avatar

เหตุผล:
- adult BMI cutoffs ไม่เปลี่ยนเพราะชาย/หญิง
- แต่บาง reference เช่น waist หรือสูตร physiological บางชนิดอาจต่างกัน
- youth BMI ต้องใช้ age/sex-specific growth reference

User choices ควรรองรับ:
- Male reference
- Female reference
- Prefer not to use sex-specific estimates
- Not represented / other context

ห้ามใช้ field นี้เพื่อเดา avatar, pronoun, personality หรือ identity

## Optional evidence
- Waist circumference
- Measured body-fat %

กฎ:
- Auren **ไม่ estimate body fat จากรูป profile**
- body-fat value จาก user เป็น supporting evidence เพราะวิธีวัดต่างกันให้ผลต่างกัน
- waist เป็น contextual evidence ไม่ใช่ diagnosis

## Training / Athletic context
รองรับ:
- little/no structured exercise
- general activity/walking
- cardio
- mixed training
- resistance / weight training
- athletic / sports training

พร้อม frequency/week

Auren ห้ามสร้าง “BMI threshold สำหรับคนเล่นเวท” แบบแต่งเอง

Instead:
- training context ลด confidence ของ BMI-only judgment
- resistance/athletic training + higher BMI = muscularity may contribute
- waist/body composition/trend ช่วยเพิ่มบริบท
- การเลือก “weight training” ไม่ได้ทำให้ BMI สูงกลายเป็น healthy โดยอัตโนมัติ

## Goals
Auren ไม่ควรมี “ผอมลง” เป็น default morality

รองรับ:
- understand body
- maintain
- reduce body fat/weight
- gain weight
- build muscle
- improve fitness
- general wellbeing
- not sure

ถ้าข้อมูลอยู่ใน strong alignment Auren สามารถบอกว่า **Maintain, don’t chase change.**

## Youth guardrail
ต่ำกว่า 20:
- ห้ามใช้ adult BMI categories
- youth interpretation ต้องใช้ age- and sex-specific growth reference
- ถ้า reference engine ยังไม่ครบ ให้ return limited / insufficient data อย่างซื่อสัตย์

## Adult general references currently used
- BMI <18.5
- 18.5–24.9
- 25.0–29.9
- >=30

เป็น **general screening reference**, ไม่ใช่ diagnosis

Waist reference V1 เมื่อ user เลือก physiological reference:
- male reference >102 cm
- female reference >88 cm

ต้อง label ว่าเป็น general reference และมี population/age/context limitations

---

# 9. Body Context Card — Accepted Layout

ปัญหาที่เคยพบ: Confidence ถูกวางเป็น metric ช่องที่ 4 ลงซ้าย ทำให้ไทย/อังกฤษไม่สมดุลและเหมือนเหลือที่แล้วเอามาวาง

Accepted structure:

**Primary row = 3 body metrics**
- BMI
- Training
- Waist

**Confidence = secondary metadata**
- badge / footer row
- ไม่วางเท่ากับ primary metric

เหตุผล: Confidence คือ meta-information ของ interpretation ไม่ใช่ metric ชนิดเดียวกับ BMI/Training/Waist

Long training text ต้องไม่ทำให้ card พัง; responsive layout และ EN/TH wrapping เป็น release requirement

---

# 10. Confidence & Trust Architecture

Auren ใช้ provenance 3 ชั้น:
- **Observed** — user supplied
- **Calculated** — deterministic math/transformation
- **Inferred** — contextual interpretation

ห้ามสร้าง precision ที่ไม่มีจริง

Confidence ควร qualitative เช่น:
- Low
- Moderate
- High
- Limited

Confidence หมายถึง **Auren มี context แค่ไหน** ไม่ใช่ certainty ว่าผู้ใช้ “healthy”

ทุก important interpretation ต้องตอบ `Why this?` ได้

Evidence sheet ควรบอก:
- input อะไร
- provenance
- sample size / continuity
- confidence
- limitation

ชม positive state ได้ เช่น `Excellent Balance` แต่ต้องจำกัด claim ว่า “จากข้อมูลที่ Auren มี” ห้าม claim medical health

---

# 11. Guidance & Explainability System

ผู้ใช้ไม่ควรต้องอ่าน manual เพื่อใช้ Auren แต่เมื่อสงสัยต้องเข้าใจได้ว่า option หรือ insight หมายถึงอะไร

ใช้ 3 ชั้น:

1. **Inline helper** — 1–2 บรรทัด
2. **ⓘ / Why this? / How Auren uses this** — bottom sheet/detail
3. **How Auren Works** — ศูนย์รวมคำอธิบาย

Option สำคัญควรตอบได้:
- Auren ถามทำไม
- ใช้ข้อมูลกับอะไร
- มีผลต่อ interpretation อย่างไร
- limitation คืออะไร
- privacy implication ถ้ามี

First-use hints ใช้เฉพาะ feature ซับซ้อนและไม่กวนซ้ำๆ

---

# 12. Profile Identity & Photo

Profile experience ต้อง personal แต่ inclusive

Features:
- Display Name
- personalized greeting เช่น `Good morning, Benedict.` / `สวัสดีตอนเช้า Benedict`
- profile photo upload
- crop / pan / pinch zoom / slider zoom
- circular preview ตรงกับสิ่งที่จะเห็นจริง
- change / reset / remove / save
- compress/resize locally
- no face recognition
- no body analysis from photo

**Crop editor rule:**
- ภาพ preview ห้ามมี white reflection/line artifact ที่ทำให้เข้าใจว่าเส้นติดมากับภาพ
- export image เป็น pixels ของรูปเท่านั้น ไม่ bake border/highlight
- page-level pinch zoom ถูก lock เพื่อ native-app feel แต่ pinch zoom ภายใน crop editor ต้องทำงาน

Fallback identity:
1. uploaded photo
2. Initial / monogram จาก Display Name
3. neutral Auren Orb profile mark

ห้ามใช้ stock male/female avatar เป็น default

---

# 13. Archive — Health Memory

Archive ไม่เพิ่ม tab ใหม่ให้ navigation รก แต่มี 2 views ภายใน Archive:

1. **Portraits** — daily State Portrait gallery
2. **Calendar** — Health Memory Calendar

Calendar principles:
- ไม่ใช่ Google Calendar clone
- day cell แสดง state cue อย่าง restrained
- empty day = ไม่มีข้อมูล ไม่ใช่ failure
- ไม่มี guilt streak
- แตะวัน → Daily State Detail

Daily State Detail อาจแสดง:
- Sleep
- Energy
- Stress
- Mood
- Movement
- body/weight update ถ้ามี
- insight
- One Useful Move
- provenance/confidence

Monthly summary:
- check-in count
- qualitative trend
- stress/energy/weight continuity ที่ support ด้วยข้อมูล
- ไม่ใช้ pseudo percent หากไม่มีฐาน

Calendar ต้องสร้างความรู้สึกว่า **Auren remembers your health story** ไม่ใช่ gamification

---

# 14. Navigation & Current Surfaces

Current primary navigation:
- Today
- Rhythm
- Signals
- Archive
- You

ไม่เพิ่ม tab ใหม่โดยง่าย

หลัก:
- navigation ต้องจำง่าย
- หน้าแรกไม่เป็น dashboard ที่เต็มไปด้วย cards
- progressive disclosure
- action hierarchy ชัด
- `Edit today’s check-in` เป็น secondary หลังกรอกแล้ว

Rhythm / Signals ยังพัฒนาได้ต่อ แต่ต้องรักษา Data → Pattern → Meaning model

---

# 15. Native App Feel

Auren เป็น PWA แต่ต้องรู้สึกเหมือน native product

Accepted rules:
- page-level pinch zoom / accidental browser scaling ถูก lock
- gesture พิเศษที่เป็น feature จริง เช่น crop pinch zoom ยังทำงาน
- safe area / sticky nav / viewport ต้องรองรับ Android/iOS
- touch targets ไม่เล็ก
- motion ไม่ block task
- no browser-looking controls โดยไม่ style

Accessibility ต้องไม่ถูกละเลยเพราะ native feel:
- readable font sizes
- semantic labels
- keyboard/focus where relevant
- contrast
- Reduced Motion
- screen-reader-friendly labels

---

# 16. Localization — EN + TH Native First

V1 รองรับ English + Thai และทั้งสองภาษาเป็น first-class

Canonical truth = **meaning/intent**, ไม่ใช่ English sentence

กฎ:
- Native Copywriting First
- Meaning parity, not word parity
- English = natural international English
- Thai = ไทยธรรมชาติ ไม่แปลทื่อ ไม่เรียงคำแบบอังกฤษ
- health wording ไม่ alarmist และไม่วินิจฉัย
- semantic i18n keys ไม่ hard-codeกระจัดกระจาย
- missing key / raw key / mixed language = release blocker
- date/time/number/unit locale-aware
- QA EN/TH แยกกันบน viewport จริง
- ห้ามลด font ไทยจนอ่านยากเพื่อให้ layout พอดี

---

# 17. Storage & Privacy

Current architecture เป็น local-first

- IndexedDB database: `auren`
- check-ins store
- profile store
- preferences lightweight storage
- data schema current marker: **4** at handoff
- no account required
- no cloud sync required in V1
- no external photo upload by default

Profile/body context และ check-ins ควรอยู่ในเครื่องจนกว่าจะมี cloud value ที่ชัดเจนและ consent ที่เหมาะสม

ในอนาคต login/cloud backup เพิ่มได้เมื่อมี user value จริง ไม่เพิ่มเพราะ “แอพควรมีบัญชี”

---

# 18. Engineering Direction

Web-first, not web-limited

- semantic HTML
- componentized CSS
- ES modules / vanilla JS ตราบใดที่ยัง maintainable
- Canvas2D for Core currently robust
- SVG for semantic instruments/icons
- IndexedDB longitudinal data
- Service Worker + PWA cache discipline
- backend only when justified

## Important implementation lessons

1. Android `content://downloads` สามารถทำให้ relative CSS/module assets พัง — standalone review artifact ควร single-file เมื่อทดสอบแบบ local file
2. Headless QA environment เคยไม่มี WebGL2 — อย่าออกแบบ core dependency ที่ไม่มี graceful fallback
3. Canvas2D ปัจจุบัน robust กว่า forced WebGL complexity
4. static render PASS ≠ physical-device PASS
5. ห้ามพูด “physics”, “photorealistic”, “10/10” หากยังไม่ได้พิสูจน์
6. visual QA ต้องดูด้วยตา ไม่ใช่แค่ syntax
7. optical alignment สำคัญกว่าค่า center ทางคณิตศาสตร์ใน iconography

---

# 19. Build / Version / Cache Contract — RELEASE BLOCKER

ทุก runtime change ที่แตะ HTML/CSS/JS/runtime asset/manifest/SW/cache/UI/UX/logic ต้อง advance Build No.

Single Source of Truth ปัจจุบัน:
`src/js/config/build.js`

ทุกครั้งต้องตรวจ:
- BUILD_NUMBER
- CACHE_NAME
- Service Worker comment/cache
- About/build UI ถ้ามี
- docs/package names ที่อ้าง current runtime
- stale build numbers ทั้ง repo

**Docs-only governance update ไม่ต้อง bump app Build No.**

## Known handoff mismatch — สำคัญมาก

ณ handoff 26 Aug 2026:
- repo `main` ใน `build.js` ยังรายงาน **Build 10**
- แต่ CSS ของ production มี optical icon-centering polish ที่พี่เบนซ์ยอมรับ ซึ่งถูกส่งใน package ที่เรียกว่า **Build 11**
- นี่คือ bookkeeping defect จากการส่ง package โดยไม่ได้ advance build marker

**Rule for next room:** ห้ามทำเป็นไม่เห็น
- first runtime batch ถัดไปให้ใช้ **Build 12** เพื่อไม่ reuse logical package label 11
- update BUILD_NUMBER + CACHE_NAME + SW + package naming ให้ coherent
- search stale Build 10/11 markers ก่อนส่ง
- ห้ามเปลี่ยน schema version เว้นแต่ data model เปลี่ยนจริง

---

# 20. File Delivery & Drag-to-Upload Contract — Non-Negotiable

นี่เป็นบทเรียนจากห้องก่อนหน้าและต้องล็อกเป็นกฎถาวร เพราะเคยเกิดซ้ำทั้งเรื่องลิงก์ดาวน์โหลดและชื่อ/โครงสร้างไฟล์ไม่ตรงกับ GitHub

## 20.1 Canonical filename + folder mirroring

ทุก ZIP/patch ที่พี่เบนซ์จะนำไปอัปโหลด GitHub ต้องถูกจัดให้ **พร้อมลากวางจาก repository root** โดยไม่ต้อง rename, move หรือเดา path เอง

กฎบังคับ:

1. **ชื่อไฟล์ภายใน ZIP ต้องตรงกับชื่อ canonical ใน repo 100%** — ห้ามเติม `_V2`, `_REV_2_1`, `FINAL`, `NEW`, `COPY` หรือ suffix/version อื่นใน filename ถ้าไฟล์นั้นมี canonical path อยู่แล้ว
2. **โครงสร้าง folder ภายใน ZIP ต้อง mirror repository path จริง 100%**
3. ZIP root ต้องเทียบเท่า repository root; **ห้ามครอบด้วย top-level folder เกินมา** เช่น `auren_update/` ถ้าทำให้ผู้ใช้ลากวางไม่ได้ทันที
4. ไฟล์ที่เป็น replacement ต้องอยู่ path เดิมเพื่อให้ GitHub overwrite ได้ตรงๆ
5. ตัวอย่าง canonical docs:
   - `docs/product/AUREN_MASTER_PLAN.md`
   - `docs/handoff/AUREN_ROOM_MIGRATION_PROMPT.md`
6. Version/revision ให้อยู่ **ภายในเนื้อหาเอกสารและ Git history** ไม่ใช่เปลี่ยนชื่อ canonical file
7. Update Only ZIP ต้องมีเฉพาะไฟล์ที่เปลี่ยน พร้อม path จริงของ repo
8. Full Package ZIP ต้องมี project tree ที่พร้อมใช้จริงจาก repo root
9. Upload notes ต้องแยกเป็นไฟล์ delivery ภายนอก ZIP หากการใส่ไว้ใน ZIP จะสร้างไฟล์ส่วนเกินใน repo root
10. ก่อนส่งให้ inspect archive listing (`unzip -l` หรือเทียบเท่า) และยืนยันว่า path ทุกไฟล์ตรงกับ repo

**Drag-to-upload acceptance rule:** ถ้าพี่เบนซ์ยังต้อง rename หรือย้ายไฟล์หลังแตก ZIP แปลว่า package **ยังไม่ผ่าน handoff QA**

## 20.2 Delivery execution

ทุกครั้งที่พี่เบนซ์ขอไฟล์สำหรับ GitHub:

1. สร้าง **Full Package ZIP** เมื่อเหมาะสม
2. สร้าง **Update Only ZIP** เมื่อ repo มี base ที่รู้แน่
3. สร้าง **UPLOAD_NOTES.txt** ถ้า batch มีหลายไฟล์/ขั้นตอน
4. verify exact paths exist
5. run ZIP integrity test (`unzip -t` หรือเทียบเท่า)
6. ตรวจ JS syntax / manifest / SW asset paths / i18n parity ตาม scope
7. ใน final response ต้องใส่ **clickable sandbox links** เช่น `[Download Build](sandbox:/mnt/data/file.zip)`
8. **ห้าม**ส่งเพียง path text `/mnt/data/file.zip`
9. ถ้า link ยังสร้างไม่ได้ ห้ามพูดว่า “ส่งไฟล์เรียบร้อยแล้ว”
10. บอกว่า package ไหนควรใช้จริง
11. แนบ Commit name พร้อมใช้

Current preferred delivery pattern:
- `Auren_GitHub_Build_XXX_Update_Only.zip`
- `Auren_GitHub_Build_XXX.zip`
- `Auren_GitHub_Build_XXX_UPLOAD_NOTES.txt`

พี่เบนซ์เป็นคน upload GitHub เองเป็น default

---

# 21. Commit Name Contract

ทุก GitHub delivery ต้องมี:

`Commit name: <message>`

กฎบังคับ:
- **<= 50 characters รวม spaces**
- DEV ต้อง count ก่อนส่ง
- สั้น ชัด บอก intent
- ไม่ใช้ `Update files` หากระบุได้ดีกว่า
- หลาย independent batches = commit name แยก
- remote write ที่ได้รับอนุญาตก็ใช้กฎเดียวกัน

Final response ที่มีไฟล์ GitHub แต่ไม่มี Commit name = **handoff QA fail**

---

# 22. QA & Acceptance Contract

ก่อนส่ง runtime package ให้ทำตาม scope:

## Code / structure
- JS syntax (`node --check`)
- JSON/manifest validation
- no duplicate critical DOM IDs
- no missing static element references
- SW asset paths exist
- Build/cache coherence
- data schema migration sanity

## Logic
- representative body fixtures
- adult/youth guardrail
- Stress direction regression
- athletic context does not auto-excuse high BMI
- missing waist/body fat handled honestly
- confidence does not become fake certainty

## Localization
- EN/TH key parity
- native copy
- narrow viewport wrapping
- no mixed-language UI

## Visual
- real mobile dimensions e.g. 360 / 393 px
- Core rim / Halo clutter
- typography rhythm
- optical icon alignment
- card balance
- nav safe area
- crop editor

## Physical device
Browser/static QA ต้องรายงานว่าเป็น browser/static QA

ห้าม claim Android/iOS physical acceptance จนพี่เบนซ์หรือ DEV ได้ทดสอบบนเครื่องจริง

พี่เบนซ์ทำหน้าที่ acceptance tester สำคัญมาก: screenshot feedback จากเครื่องจริงถือเป็น production truth

---

# 23. Current Production Snapshot — Room Handoff

Repository: `grolygori789-crypto/auren`  
Branch: `main`  
GitHub Pages: `https://grolygori789-crypto.github.io/auren/`

Current accepted capabilities:
- premium mobile PWA shell
- EN/TH
- Auren Atmospheres 5 themes
- Signature Opening
- transparent Living Core
- semantic Halo
- daily check-in
- semantic metric cards
- One Useful Move
- Body Context / contextual intelligence
- sex-for-calculation context
- activity/training/frequency/goals
- optional waist/body-fat evidence
- youth guardrail
- profile photo + crop/pan/zoom
- display name + personalized greeting
- neutral initials/Auren Orb fallback
- Archive Portraits + Calendar
- Daily State Detail
- monthly summary foundation
- How Auren Works / contextual help
- local IndexedDB profile/check-ins
- page-scale lock with crop-editor pinch exception

Current accepted UI polish:
- glass rim thin/translucent
- Halo restrained/semantic
- Body Context primary metrics = BMI / Training / Waist
- Confidence is secondary badge/footer metadata
- daily state cards have subtle icons/semantic tones
- latest icon optical alignment accepted by P’Benz on physical device

Areas not yet considered “finished product”:
- Rhythm intelligence depth
- Signals intelligence depth
- longitudinal signal quality with real user history
- broader calibration
- export/delete privacy controls maturity
- offline/update edge-case QA across devices
- future integrations

---

# 24. Feature Guardrails — สิ่งที่ไม่ควรเพิ่มโดยไม่มีเหตุผล

อย่าเพิ่มเพียงเพราะแอพอื่นมี:
- AI chatbot as hero
- login before cloud value
- wearable/Bluetooth V1 dependency
- calorie/macros diary
- social feed
- male/female stock avatars
- gamified streaks/points/badges
- giant health score
- “biological age” invented without evidence
- aggressive Support/Paywall
- excessive colored dashboards

Auren ต้องรู้สึกว่า “ฉลาดขึ้น” ไม่ใช่ “มีเมนูเยอะขึ้น”

---

# 25. Roadmap — Three Generations

| Era | Promise | Focus |
|---|---|---|
| Auren 1 · Know Today | วันนี้เป็นอย่างไร | Check-in, State, Context, One Move, Archive |
| Auren 2 · Know Yourself | อะไรมีผลต่อฉัน | Personal baseline, Signals, Pattern Map, integrations |
| Auren 3 · Know What Works | เปลี่ยนอะไรแล้วได้ผล | N-of-1 experiments / causal discipline |

Do not rush Generation 2/3 before Auren 1 is delightful, trustworthy, and habit-worthy without addiction mechanics.

---

# 26. Decision Filter

ก่อนเพิ่ม/แก้ feature ถาม:
1. ช่วยให้ผู้ใช้เข้าใจตัวเองดีขึ้นจริงไหม
2. มี evidence/context พอไหม
3. มันทำให้ Auren claim เกินข้อมูลไหม
4. ผู้ใช้เข้าใจได้โดยไม่ต้องเรียน UI ไหม
5. ทำลาย quiet luxury หรือไม่
6. เพิ่ม privacy/regulatory complexity มากกว่าคุณค่าหรือไม่
7. test correctness/regression ได้ไหม
8. ถ้าตัดออก Auren เสีย core promise หรือแค่เสียของเล่น

ถ้าไม่ผ่านข้อสำคัญ default = **ไม่ทำตอนนี้**

---

# 27. New-Room Startup Protocol — Zero-Question Continuation

เมื่อย้ายห้อง:

1. อ่าน `docs/product/AUREN_MASTER_PLAN.md` ให้ครบ
2. อ่าน `docs/handoff/AUREN_ROOM_MIGRATION_PROMPT.md`
3. inspect repo HEAD และ current production
4. ตรวจ Build / cache / schema ก่อนแก้ runtime
5. รับรู้ known Build 10 vs logical Build 11 mismatch และ next runtime = Build 12
6. อย่าถาม vision/tagline/design principles ซ้ำ
7. product/design trade-off ให้ตัดสินใจเอง
8. user feedback = signal สำคัญ แต่ DEV มี final product authority
9. permanent rule ใหม่ต้อง update Master Plan
10. ทุก GitHub package ต้อง clickable link + integrity QA + commit <=50 chars

---

# 28. Locked vs Evolvable

## Locked foundation
- Auren = Personal Health Intelligence
- “Your body, understood.”
- trust before intelligence
- contextual analysis over single-metric judgment
- local-first V1
- EN/TH first-class
- no fake medical certainty
- no addiction mechanics
- quiet premium identity
- thin transparent Core glass
- semantic Halo
- profile photo never used to infer health/body fat
- sex-for-calculation separate from identity/avatar
- Archive Calendar belongs inside Archive, not a new tab
- file delivery links must be clickable
- runtime Build coherence
- Commit name <=50 chars

## Evolvable by Full Authorized DEV
- exact scoring/weights
- detailed body-context confidence rules
- exact Core fluid timing
- icon set / optical offsets
- card dimensions / typography tokens
- Halo fragment geometry
- Rhythm/Signals layouts
- future backend/framework
- Auren+ packaging
- future integration roadmap

---

# 29. Final Operating Principle

Auren ต้องทำให้ผู้ใช้รู้สึกสองอย่างพร้อมกัน:

> **“ฉันเข้าใจตัวเองมากขึ้นจริงๆ”**  
> **“ทำไมของนี้ถึงรู้สึกแพงและตั้งใจขนาดนี้?”**

ถ้าฟีเจอร์หนึ่งสวยแต่ไม่ช่วยความเข้าใจ ให้ตัด

ถ้าฟีเจอร์หนึ่งฉลาดแต่ผู้ใช้อธิบายไม่ได้ว่ามันรู้ได้อย่างไร ให้แก้ trust layer

ถ้าฟีเจอร์หนึ่งถูกต้องแต่ UI ดูเหมือน dashboard ทั่วไป ให้ polish

ถ้าต้องเลือกระหว่าง “เพิ่มของ” กับ “ทำสิ่งที่มีให้จบระดับโลก” ให้เลือกอย่างหลัง
