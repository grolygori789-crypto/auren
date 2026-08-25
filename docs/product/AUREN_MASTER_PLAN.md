# A U R E N

> **Your body, understood.**

**MASTER PLAN · FOUNDATION EDITION · Revision 1.4**

Product · Design · Engineering · Trust · Growth

Benedict Interactive · 25 August 2026

Status: Pre-production / Canonical foundation · Revision 1.4

# 0. Executive Summary — ภาพเดียวที่ทุกคนต้องเห็นตรงกัน

> NORTH STAR<br>Auren ไม่ใช่ “health tracker ที่สวย” แต่คือ Personal Health Intelligence ที่ช่วยให้คนเห็นว่า ชีวิตของตัวเองส่งผลต่อร่างกายอย่างไร — ผ่านข้อมูลที่เข้าใจง่าย สวยมาก น่าเชื่อถือ และเป็นส่วนตัว

Auren ต้องให้ความรู้สึกเหมือนผู้ใช้ได้รับสิทธิ์พิเศษให้เข้าถึงผลิตภัณฑ์ระดับโลกที่ปกติควรมีราคาสูง ทั้งที่ Early Access เปิดประสบการณ์หลักอย่างใจกว้าง ไม่มีโฆษณา ไม่มีการบีบให้จ่าย และไม่มี dark pattern

ชื่อผลิตภัณฑ์: AUREN

Category/descriptor: Personal Health Intelligence

Tagline หลัก: “Your body, understood.”

Studio: Benedict Interactive

แพลตฟอร์มเริ่มต้น: Mobile-first Premium PWA / Web App

เทคโนโลยีเริ่มต้น: HTML + CSS + JavaScript + SVG + Canvas/WebGL/Three.js เฉพาะจุดที่จำเป็น

V1 ไม่ต้อง Bluetooth, wearable หรือ medical backend; เริ่มจาก self-report + personal baseline + transparent analysis

Early Access: Full Experience Free + Optional “Support Auren”; architecture เตรียม entitlement สำหรับอนาคตแต่ยังไม่ล็อกฟีเจอร์

ความสำเร็จหลักช่วงแรก: Retention และความเชื่อใจ ไม่ใช่รายได้หรือจำนวนดาวน์โหลด

# 1. Authority & Governance — สิทธิ์ของ Full Authorized DEV

ในโปรเจกต์ Auren ให้ “บิ๊ว” ทำหน้าที่เทียบเท่า Founder-Operator / Product Owner / Principal Designer / CTO / CMO ที่มีอำนาจตัดสินใจด้านผลิตภัณฑ์ 100% ภายใต้ North Star นี้ โดยไม่ต้องยึดแนวคิดเดิมของพี่เบนซ์ถ้ามีทางเลือกที่ดีกว่าอย่างมีเหตุผล

มีสิทธิ์กำหนดหรือเปลี่ยน product direction, feature priority, UX flow, information architecture, visual system, motion, technical architecture, trust model, business model และ marketing direction

ต้องเลือกสิ่งที่ดีที่สุดต่อ Auren ระยะยาว ไม่เลือกเพียงเพราะทำง่าย หรือเพราะเป็นไอเดียที่เคยคุยไว้

ต้องแยก “อำนาจตัดสินใจ” ออกจาก “สิทธิ์เขียนระบบภายนอก”: การ push/แก้ GitHub หรือทำ remote write ยังต้องเป็นไปตามคำสั่งของผู้ใช้ใน turn ปัจจุบัน เว้นแต่พี่เบนซ์เปลี่ยนกติกานี้อย่างชัดเจน

ห้ามถามให้พี่เบนซ์เล่าซ้ำเรื่องที่ recover ได้จาก Master Plan, repo, ประวัติ project หรือ approved assets; ให้ตรวจและตัดสินใจเอง

ถามเฉพาะเมื่อเป็นข้อมูลใหม่ที่ไม่มีทาง recover, เป็น credential/consent ที่จำเป็น, หรือการกระทำที่มีผล irreversible ซึ่งต้องมีเจ้าของอนุมัติ

## 1.1 Source of Truth & Master Plan First Rule

Master Plan ต้องถูกกำหนดให้เป็น canonical operating foundation ของโปรเจกต์ Auren และทุกงานต้องอ้างอิงจาก Master Plan เป็นฐานก่อนเสมอ ไม่ว่าจะเป็น product direction, UX, UI, brand, architecture, trust model, roadmap, monetization, QA, repo structure หรือการตัดสินใจเชิงกลยุทธ์อื่นใด

หลักการปฏิบัติ:

1. เริ่มจาก Master Plan ก่อนเสมอ

2. ถ้ามี implementation อยู่แล้ว ให้ inspect repo / production ปัจจุบันประกอบ

3. ห้าม invent direction ใหม่ที่ขัดกับ Master Plan โดยไม่มีเหตุผลชัดเจน

4. หากจำเป็นต้องเบี่ยงจาก Master Plan เพราะข้อจำกัดจริงหรือพบทางที่ดีกว่า ให้ทำอย่างมีเหตุผลและอธิบายสั้นๆ

5. เมื่อข้อมูลขัดกัน ให้ใช้ลำดับ: latest explicit instruction from P'Benz > current Auren Production / live implementation > AUREN Master Plan > approved assets > repository/history > older context

สรุป: Master Plan คือเอกสารแม่บทในการทำงาน และห้องใหม่ทุกห้องต้องเริ่มจากเอกสารนี้ก่อนเสมอ

# 2. Product Vision & Positioning

> POSITIONING<br>Auren helps you understand how your life affects your body.

เราไม่แข่งกับ Apple Health, Oura, WHOOP หรือ Garmin ด้วย “จำนวนข้อมูล” แต่แข่งด้วยการเปลี่ยนข้อมูลให้เป็นความหมาย: Data > Pattern > Meaning > Decision

## 2.1 Auren ไม่ใช่อะไร

ไม่ใช่แอพวินิจฉัยโรค ไม่ใช่แพทย์ AI และไม่ควรสร้าง impression ว่าเป็น medical device โดยไม่มีฐานรองรับ

ไม่ใช่ fitness-bro app, calorie counter, streak machine หรือ productivity dashboard ที่เอาคำว่า health มาแปะ

ไม่ใช่ chatbot ที่เอา AI มาเป็นพระเอก; AI เป็น infrastructure ที่ซ่อนอยู่และต้องอ้าง evidence ได้

ไม่ใช่ mood app ที่พูดปลอบใจทั่วไป และไม่ใช้ pseudo-science, biological age แบบแต่งเอง หรือ mortality score

## 2.2 กลุ่มผู้ใช้เริ่มต้น

กลุ่มแรกคือคนอายุประมาณ 25–50 ปีที่ใส่ใจสุขภาพและคุณภาพชีวิต แต่ไม่อยากให้ชีวิตกลายเป็น spreadsheet: professionals, creatives, tech workers, entrepreneurs และคนที่สนใจ sleep / recovery / stress / movement แต่ต้องการประสบการณ์ที่สวยและเข้าใจง่าย

# 3. Product Principles — กฎตัดสินใจระดับองค์กร

| Principle | ความหมายใน Auren |
| --- | --- |
| Trust before intelligence | ถ้าระบบฉลาดขึ้นแต่ผู้ใช้เชื่อน้อยลง ถือว่าถอยหลัง |
| Usability before spectacle | UI สวยมากแต่ใช้ยาก = fail |
| Complex underneath, simple on the surface | ประมวลผลซับซ้อนได้ แต่หน้าจอต้องสงบและเข้าใจในไม่กี่วินาที |
| Evidence before claims | ทุก insight ที่สำคัญต้องมีที่มาและบอกระดับความมั่นใจ |
| Personal baseline before population comparison | V1 เปรียบเทียบผู้ใช้กับตัวเองก่อน ไม่สร้าง percentile ประชากรโดยไม่มี dataset จริง |
| Progressive disclosure | หน้าแรกแสดงเฉพาะสิ่งจำเป็น; รายละเอียดอยู่ลึกลงไปเมื่อผู้ใช้ต้องการ |
| No addiction mechanics | ไม่มี guilt streak, scarcity, nagging หรือ manipulation |
| Privacy is a product feature | local-first เท่าที่ทำได้; export/delete ได้; ไม่ขายข้อมูลสุขภาพ |
| Motion must communicate | animation ต้องอธิบาย state / transition / causality ไม่ใช่ decoration |
| Ship narrow, polish deeply | V1 ฟีเจอร์น้อยแต่ complete ดีกว่า 30 ฟีเจอร์ครึ่งๆ กลางๆ |

# 4. Signature Identity — Auren Core & Brand

เอกลักษณ์หลักคือ “Auren Orb / Auren Core” — วงกลมใสที่ภายในมี living biomaterial / liquid light สี champagne และ pale aqua เคลื่อนไหวอย่างสงบ โดยมีความไม่สมมาตรเล็กน้อยเพื่อให้รู้สึกมีชีวิต ไม่ใช่ crystal ball, crypto orb หรือ fantasy object

Logo system: Hero Orb / simplified core mark / app icon / monoline small-size mark / dark-background variant

Primary visual mood: Light Luxury Wellness — pearl/warm white, ivory, charcoal, restrained champagne gold, pale aqua/teal, muted sage/lavender เฉพาะเมื่อมีหน้าที่

Character: calm, intelligent, human, biological, premium, editorial; หลีกเลี่ยง hospital white, neon biotech และ sci-fi ที่มากเกินไป

Typography: refined modern humanist / luxury minimal; hierarchy ชัด, whitespace มาก, ตัวเลขสวย, อ่านมือถือได้ทันที

Core ต้องเป็น functional visualization: รูปแบบการเคลื่อนไหวและองค์ประกอบสัมพันธ์กับ state ที่คำนวณได้ แต่ไม่ทำให้ผู้ใช้ตีความว่าเป็นเครื่องมือแพทย์

## 4.1 Signature Opening

1.  0.0–0.5s: warm pearl-white space; ไม่รีบโชว์ข้อมูล

2.  0.5–1.8s: Orb ปรากฏจาก soft focus > sharp; fluid เคลื่อนไหวตาม surface tension แบบละเอียด

3.  1.8–2.6s: Core settle และ pulse เบาหนึ่งครั้ง

4.  2.4–3.2s: A U R E N > “Your body, understood.”

5.  Orb เคลื่อนและ morph เข้าสู่ Today Screen ต่อเนื่อง ไม่ cut เหมือน intro video

Full sequence ใช้เฉพาะ first run / major update; normal open ต้องสั้นและเข้า Today เร็ว รองรับ Reduced Motion เสมอ

# 5. Core Experience & Information Architecture

> CORE LOOP<br>CHECK IN > CORE REACTS > STATE REVEAL > SIGNAL > EVIDENCE > ONE ACTION > OUTCOME > MODEL LEARNS YOU

| Surface | หน้าที่ |
| --- | --- |
| Today | เห็น State วันนี้ภายใน 5 วินาที: Core + score + one-line meaning + best next move |
| Daily Check-in | 20–30 วินาที: Sleep, Energy, Stress, Mood, Movement และ input ที่จำเป็นเท่านั้น |
| Rhythm | 24-hour/weekly pattern visualization ที่เข้าใจง่ายก่อนสวย; เน้นช่วง energy/stress/recovery |
| Signals | pattern ที่ตรวจพบ พร้อม evidence, sample size และ confidence |
| Pattern Map | network ของ Sleep / Stress / Energy / Mood / Movement / Recovery; ใช้แนวคิด investigation อย่างผู้ใหญ่ |
| History / Auren Archive | เก็บ State Portrait รายวันเป็น gallery ที่สวยและค้นย้อนหลังได้ |
| Calibration | สื่อว่าระบบรู้จัก baseline ผู้ใช้มากขึ้น; ไม่ใช้ XP/level |
| Future You | trajectory จากพฤติกรรม/ข้อมูล ไม่ใช่ medical prediction; ต้องบอกข้อจำกัดชัด |
| Weekly / Monthly Intelligence | เล่า story จากข้อมูลจริงแบบ factual: อะไรเปลี่ยน อะไรสัมพันธ์ อะไรยังไม่ชัด |
| Share My State | สร้าง branded PNG locally; ผู้ใช้เลือกข้อมูลที่จะ share; ไม่รั่วข้อมูลละเอียด |

# 6. Health Intelligence & Trust Model

## 6.1 ชั้นของข้อมูล

| Label | ความหมาย |
| --- | --- |
| Observed | ข้อมูลที่ผู้ใช้กรอกหรือระบบรับมาโดยตรง |
| Calculated | ค่าที่คำนวณด้วยสูตรที่กำหนดและอธิบายได้ |
| Inferred | pattern/correlation ที่ตรวจพบจากข้อมูลหลายวัน |

ทุก score ต้องมี “Why this score?” และแสดง contributors ไม่ทำเลขกล่องดำ

ทุก signal ควรมี confidence: Low / Emerging / Moderate / High พร้อมจำนวน observation ที่ใช้

ไม่ใช้คำว่าความสัมพันธ์เชิงเหตุผลเมื่อมีเพียง correlation; เมื่อเหมาะสมต้องแจ้งว่า correlation ≠ causation

ไม่ reconstruct historical rank/insight ถ้าข้อมูลต้นฉบับไม่ถูกเก็บ — หลักเดียวกับความซื่อสัตย์ใน Velnox

Auren ต้องกล้าพูด “ยังไม่รู้” หรือ “ข้อมูลยังไม่พอ”

## 6.2 Personal Baseline

V1 ใช้ baseline ของผู้ใช้เองเป็นหลัก เช่น “วันนี้แข็งแรงกว่าค่าเฉลี่ย 30 วันของคุณ” หรือ “พลังงานต่ำกว่าปกติของคุณ” แทนการกล่าวว่าอยู่ Top x% ของประชากรโดยไม่มีฐานข้อมูลจริง

# 7. User Experience Standard

> UX PRIORITY<br>Trust > Usability > Clarity > Beauty > Delight

ผู้ใช้ครั้งแรกต้องเข้าใจวิธีใช้โดยแทบไม่ต้องเรียนรู้

หน้า Today ต้องตอบคำถาม “วันนี้ฉันเป็นอย่างไร?” ภายใน 5 วินาที

Check-in ต้องทำได้ด้วยมือเดียวบนมือถือและจบภายใน ~30 วินาที

เมนูหลักไม่ควรเกินจำนวนที่ผู้ใช้จำได้ง่าย; nested navigation ต้องมีเหตุผล

กราฟทุกอันต้องมี takeaway ไม่ใช่ให้ผู้ใช้ตีความเองทั้งหมด

empty/loading/error/offline states ต้องสวยและใช้ภาษาเดียวกับแบรนด์

รองรับ keyboard/focus, semantic labels, contrast, touch target และ Reduced Motion ตั้งแต่ต้น

animation ต้องไม่ block task และไม่ replay จนรำคาญ

## 7.1 Native Localization Standard — Non-Negotiable

Auren V1 เปิดใช้งานอย่างเป็นทางการ **2 ภาษา: English + Thai** โดยทั้งสองภาษาต้องมีคุณภาพระดับ native product copy ตั้งแต่ต้น ไม่ถือว่าภาษาใดเป็น “คำแปลรอง” ของอีกภาษา

> LOCALIZATION PRINCIPLE<br>Canonical truth คือ **meaning / intent** ไม่ใช่ประโยคภาษาอังกฤษ และทุกภาษาต้องถ่ายทอดเจตนาเดียวกันด้วยภาษาที่เป็นธรรมชาติที่สุดของตัวเอง

กฎบังคับ:

1. ใช้แนวคิด **Native Copywriting First** — ข้อความต้องอ่านเหมือนเจ้าของภาษาเขียนขึ้นมาโดยตรง ไม่ใช่ machine translation หรือคำแปลที่รักษาโครงประโยคต้นฉบับจนฟังแปลก

2. ใช้หลัก **Meaning parity, not word parity** — ความหมาย, intent, tone, trust boundary และ action ที่ผู้ใช้ต้องเข้าใจต้องเท่ากัน แต่คำศัพท์ ลำดับคำ ความยาว และโครงประโยคสามารถต่างกันได้ตามธรรมชาติของแต่ละภาษา

3. **English** ต้องเป็น natural international English: กระชับ ชัด ไม่ corporate, ไม่ robotic, ไม่ใช้ศัพท์เทคนิคเกินจำเป็น และไม่ใช้สำนวนที่ทำให้ผู้ใช้ต่างประเทศตีความยาก

4. **Thai** ต้องเป็นภาษาไทยธรรมชาติที่คนไทยอ่านครั้งเดียวเข้าใจ: ไม่แปลทื่อจากอังกฤษ, ไม่ใช้ภาษาราชการหรือศัพท์ประดิษฐ์โดยไม่จำเป็น, ไม่เรียงคำแบบภาษาอังกฤษ และไม่ทำให้ผู้ใช้ต้องถอดความ

5. Health / wellbeing copy ต้องมีความหมายเดียวที่ชัดเจน หลีกเลี่ยงคำกำกวม คำที่ทำให้ตกใจเกินข้อมูลจริง และ wording ที่สร้าง impression ว่า Auren กำลังวินิจฉัยโรคหรือให้คำแนะนำทางการแพทย์ที่ไม่มีฐาน

6. ทุก user-facing surface อยู่ภายใต้มาตรฐานเดียวกัน: onboarding, navigation, buttons, labels, check-in, State, Signals, Evidence, confidence, recommendations, settings, privacy/consent, empty/loading/error/offline states, notifications, share cards และ accessibility labels

7. ก่อนเขียน copy ให้กำหนด **intent / meaning brief** เมื่อข้อความมีความสำคัญหรือเสี่ยงต่อการตีความ เช่น:
   - ผู้ใช้ต้องเข้าใจอะไร
   - ต้องรู้สึกอย่างไร
   - ต้องทำอะไรต่อ
   - มี claim/trust boundary อะไรที่ห้ามเกิน
   จากนั้นเขียน EN และ TH เป็น native realizations ของ intent เดียวกัน

8. ห้ามใช้ source-language sentence เป็น localization key หรือ hard-code user-facing copy กระจัดกระจายใน HTML/JS เมื่อ implementation เริ่ม ให้ใช้ semantic message IDs / locale catalogs ที่มีโครงสร้างชัดเจนและรองรับภาษาเพิ่มในอนาคต

9. Supported language ต้อง **complete** ก่อน release: ห้ามปล่อย UI ผสม EN/TH แบบไม่ตั้งใจ, missing key, raw localization key, placeholder text หรือ silent fallback ที่ทำให้ผู้ใช้เห็นภาษาคนละชุดใน flow เดียวกัน ยกเว้น proper noun / canonical brand term ที่ตั้งใจคงรูปเดิม

10. Locale behavior ต้องถูกต้องแยกตามภาษา: date/time, number formatting, units, punctuation, capitalization, plural/grammar behavior และข้อความที่เกี่ยวกับเวลา/วันต้องไม่ใช้สมมติฐานจากภาษาเดียว

11. Layout QA ต้องทดสอบ EN และ TH แยกกันบน viewport จริง: text overflow, wrapping, truncation, button width, card height, line breaks, typography rhythm, accessibility labels และ mobile readability ห้ามบีบฟอนต์หรือทำให้ภาษาใดดูเป็น second-class UI เพียงเพื่อให้พอดี

12. Copy ที่อ่านแล้วต้องย้อนอ่าน, ตีความได้หลายแบบโดยไม่จำเป็น, ฟังเหมือน translation software, ผิดธรรมชาติของเจ้าของภาษา หรือทำให้ health claim เปลี่ยนความหมาย ถือเป็น **Localization QA FAIL / RELEASE BLOCKER**

13. การเพิ่มภาษาที่ 3+ ให้ทำจาก demand/strategy ที่มีเหตุผล ไม่เพิ่มเพียงเพราะ AI แปลได้ง่าย Architecture ต้อง multilingual-ready ตั้งแต่ V1 แต่ quality bar ของภาษาใหม่ต้องเท่ากับ EN/TH ก่อนเปิดใช้จริง

เป้าหมายคือผู้ใช้แต่ละภาษารู้สึกว่า “Auren ถูกสร้างมาสำหรับภาษาของฉัน” ไม่ใช่ “Auren ถูกแปลมาให้ฉันใช้”

# 8. Engineering Direction — Web-first, not web-limited

Auren เริ่มจาก Premium PWA เพราะเหมาะกับทีมเล็ก: iterate เร็ว, deploy ง่าย, ทำ UI/motion ระดับสูงได้ และไม่ต้องแบก native complexity ก่อนมี product-market fit

| Layer | แนวทางเริ่มต้น |
| --- | --- |
| UI | Semantic HTML + componentized CSS + vanilla/module JavaScript; ใช้ framework ต่อเมื่อ complexity พิสูจน์ว่าจำเป็น |
| Core visual | SVG/Canvas/WebGL/Three.js; progressive enhancement + fallback static Core |
| Data | IndexedDB เป็นหลักสำหรับ longitudinal data; localStorage สำหรับ lightweight preferences |
| PWA | manifest + Service Worker + install/offline shell + version/cache discipline |
| Analytics | privacy-conscious, opt-in/aggregate เท่าที่จำเป็น; ไม่ผูก critical UX กับ analytics |
| Backend | ไม่ต้องมีใน V1 ถ้าไม่จำเป็น; เพิ่มเมื่อ sync/AI/cloud/integration มี value ที่พิสูจน์แล้ว |
| Health integrations | อนาคตใช้ Apple Health / Health Connect / provider APIs; ไม่ต้องต่อ Bluetooth โดยตรงใน V1 |
| Entitlements | เตรียม free / plus / founder flags ใน architecture แต่ Early Access เปิด full experience |
| Localization | Intent-first locale catalogs + semantic message IDs; V1 ships EN/TH; no scattered hard-coded user-facing copy |

## 8.1 Suggested domain model (high level)

Profile & consent

Check-ins (immutable raw observations where practical)

Daily derived state / score breakdown

Personal baseline windows

Signals + evidence + confidence + provenance

Calibration metadata

State Portrait / share snapshot metadata

Experiments (future)

Settings / accessibility / privacy / entitlements

## 8.2 Repository Governance & Hygiene — Day Zero Contract

Auren repository ต้องถูกดูแลเหมือน production product ตั้งแต่ Day Zero: Git history คือ archive, repository คือ current working truth ไม่ใช่พื้นที่กองไฟล์สำรองหรือ scratchpad

Canonical document paths:

1. docs/product/AUREN_MASTER_PLAN.md = canonical Master Plan / Source of Truth สำหรับการทำงานประจำวัน

2. docs/handoff/AUREN_ROOM_MIGRATION_PROMPT.md = zero-question handoff / new-room startup prompt

3. `docs/reference/` ใช้ได้เฉพาะ presentation/export ที่ยัง current และจำเป็นจริง; ไม่ใช่ canonical source. ถ้า reference copy ล้าสมัยให้ลบออกแทนการเก็บ duplicate ที่อาจทำให้เข้าใจผิด

Repository hygiene rules:

1. Root directory ต้องสะอาด มีเฉพาะไฟล์ระดับ project ที่จำเป็นจริง เช่น README, LICENSE, .gitignore, .editorconfig, .gitattributes และ runtime entry files เมื่อเริ่ม implementation

2. ทุกไฟล์ต้องมีบ้านตามหน้าที่: product docs, handoff, design, architecture, engineering, QA, source, assets, tests, scripts; ห้ามโยน screenshot, backup, ZIP, temp export หรือไฟล์ทดลองไว้ root

3. ห้ามใช้ชื่อแบบ final-final, backup-old, copy-2 หรือเก็บไฟล์ obsolete เพียงเพราะเผื่อไว้; delete เมื่อเลิกใช้และใช้ Git history / tags / releases เป็น archive

4. ห้าม commit secrets, credentials, API keys, local environment files, caches, build junk, OS metadata, debug output หรือ generated temp files; .gitignore ต้องป้องกันตั้งแต่ Day Zero

5. Default คือไม่สร้าง empty folder หรือ placeholder ล่วงหน้า; สร้าง folder เมื่อมีไฟล์จริงตัวแรกเท่านั้น. `.gitkeep` ใช้ได้เฉพาะกรณีที่มีเหตุผลเชิงระบบชัดเจนและต้องลบทันทีเมื่อมีไฟล์จริง

6. main เป็น stable/canonical branch เริ่มต้น; งานที่มีขอบเขตชัดใช้ feature/* หรือ fix/* เมื่อจำเป็น และลบ branch หลัง merge เพื่อไม่สร้าง branch graveyard

7. Milestone binaries/packages ใช้ GitHub Releases / tags เมื่อถึงเวลาจริง ไม่ commit ZIP build ซ้ำๆ ลง source tree

8. ก่อน substantial implementation ทุกครั้ง: อ่าน Master Plan > inspect current repo/HEAD > กำหนด scope และ changed-file allowlist > implement > regression test > physical-device acceptance เมื่อเกี่ยวข้อง

9. การเปลี่ยน direction ที่กลายเป็นกติกาถาวรต้องอัปเดต AUREN_MASTER_PLAN.md ใน change เดียวกันหรือก่อน release เพื่อไม่ให้ code, design และเอกสารแยกความจริงกัน

10. GitHub remote write ยังต้องมีคำสั่ง/authorization จากพี่เบนซ์ใน turn ปัจจุบัน เว้นแต่พี่เบนซ์แก้กติกานี้อย่างชัดเจน

Repository cleanliness เป็นส่วนหนึ่งของ product quality; โครงสร้างรก เอกสารหลาย source of truth หรือไฟล์ขยะที่ทำให้ handoff สับสนถือเป็น engineering defect ไม่ใช่เรื่อง cosmetic


## 8.3 Build Number & Release Coherence Contract

Auren ห้ามมี Build No. / version metadata ค้างเติ่งหรือไม่ตรงกันระหว่างส่วนต่างๆ ของแอพ การเปลี่ยน runtime ที่ถูกส่งให้ผู้ใช้หรือขึ้น Production ต้องมี release identity ที่ coherent ทั้งระบบ

กฎบังคับ:

1. ทุก change batch ที่กระทบ runtime, behavior, UI/UX, logic, CSS/JS/HTML, runtime asset, manifest, Service Worker, cache behavior, PWA behavior หรือ production output ต้อง advance Build No. ก่อนส่ง/merge/deploy เว้นแต่เป็น docs-only change ที่ไม่กระทบตัวแอพจริง

2. เมื่อ implementation เริ่ม ให้กำหนด **Single Source of Truth สำหรับ Build No.** หนึ่งจุดเท่านั้น แล้วให้ส่วนอื่น derive/read จากต้นทางนั้นเท่าที่ architecture อนุญาต หลีกเลี่ยงการพิมพ์เลข build ซ้ำหลายไฟล์ด้วยมือ

3. ทุก surface ที่เกี่ยวข้องกับ build ต้อง match กัน 100% เช่น About/diagnostic UI, app metadata, manifest metadata ที่เราใช้, Service Worker/cache key ที่ผูกกับ release, release metadata, generated package metadata และ documentation ที่ระบุ current build

4. ก่อนส่งงานทุกครั้งต้อง search ทั้ง repo หา build/version value เก่าที่อาจตกค้าง และตรวจไฟล์ที่เกี่ยวข้องทั้งหมด ไม่อนุญาต stale build number แม้เพียงจุดเดียว

5. ถ้ามี App Version และ Build No. แยกกัน ต้องมี mapping ที่ชัดเจนและ coherent; ห้ามปล่อย version/build คู่เก่าค้างในคนละ surface

6. หมายเลข schema, data migration, cache schema หรือ protocol revision ที่มีความหมายอิสระจาก Build No. สามารถต่างกันได้ แต่ต้องตั้งชื่อให้ชัดว่าไม่ใช่ app build และห้ามทำให้ผู้ใช้/DEV เข้าใจว่าเป็น Build No. เดียวกัน

7. Build mismatch, stale build marker, cache release identity ไม่ตรง หรือ production package ใช้เลขคนละชุด ถือเป็น **QA FAIL / RELEASE BLOCKER** ต้องแก้ก่อนส่งให้พี่เบนซ์อัปโหลดหรือก่อน deploy

8. Docs-only / governance-only change ที่ไม่เปลี่ยน runtime ไม่ต้อง increment App Build No. เพื่อไม่สร้าง build ปลอม แต่ commit/document revision ต้องอัปเดตตามความจริง

เป้าหมายคือทุก release ของ Auren สามารถตอบได้ทันทีว่า “นี่คือ build ไหน” โดยไม่มีเลขหลงเหลือจาก release ก่อนหน้า

## 8.4 GitHub Commit Name Contract

ทุก change batch ที่บิ๊วส่งให้พี่เบนซ์นำขึ้น GitHub ต้องแนบ **Commit name พร้อมใช้** เสมอ

กฎบังคับ:

1. Commit name ต้องยาวไม่เกิน **50 ตัวอักษร** รวมช่องว่าง

2. บิ๊วต้องตรวจ character count ก่อนส่ง ไม่ให้พี่เบนซ์ต้องย่อเอง

3. ใช้ข้อความสั้น ชัด บอกการเปลี่ยนแปลงหลักของ batch; หลีกเลี่ยงชื่อกว้างแบบ `Update files` เมื่อสามารถระบุ intent ได้ดีกว่า

4. ถ้ามีหลาย independent upload/commit batches ให้แนบ commit name แยกสำหรับแต่ละ batch

5. เมื่อบิ๊วได้รับ authorization ให้ทำ GitHub remote write เอง commit ที่สร้างต้องยึดกฎ <= 50 ตัวอักษรเช่นเดียวกัน

6. ทุก final handoff ที่มีไฟล์สำหรับ GitHub ต้องมีบรรทัด `Commit name:` เป็นส่วนหนึ่งของ delivery checklist

กฎนี้เป็นส่วนหนึ่งของ handoff quality ไม่ใช่ optional convenience

# 9. Proven DNA from Existing Benedict Interactive Apps

กฎสำคัญ: ศึกษาและ reuse “หลักคิด/implementation pattern ที่พิสูจน์แล้ว” แต่ห้าม copy visual หรือ feature อย่างไม่มีเหตุผล Auren ต้องมี identity ของตัวเอง

## 9.1 Last Witness > Investigation, Continuity, Regression Discipline

Zero-question continuation: มี Source of Truth และ startup protocol ที่ห้องใหม่ต้องตรวจ repo/plan ก่อนถามผู้ใช้

Regression Firewall: แก้แบบ surgical, ระบุ changed-file allowlist, อย่าแตะ working systems โดยไม่จำเป็น

Preserve proven shell: reuse interaction language ที่ผ่าน acceptance แล้วก่อนสร้าง shell ใหม่

Physical-device truth: browser/static PASS ไม่เท่ากับ Android/iOS physical acceptance

Investigation DNA: Signal > Evidence > Pattern > Conclusion กลายเป็น Pattern Map / Why this insight? ของ Auren

Repo audited: grolygori789-crypto/last-witness · branch production-rebuild · canonical GAME_MASTER_PLAN.md

## 9.2 Velnox > Trust, Measurement Integrity, Premium Isolation

แยก scoring/math core ออกจาก presentation layer; premium.css/premium.js แสดงแนวทางเพิ่ม polish โดยไม่ทำ regression ต่อ core logic

Truthful UX: stage progress ที่ซื่อสัตย์ ไม่สร้าง countdown ปลอม; Auren ต้องใช้หลักเดียวกันกับ Calibration/analysis

Explainability: score / benchmark / confidence / provenance ถูกมองเป็น product trust ไม่ใช่ technical detail

Privacy-conscious local sharing: generate result card ใน browser และให้ผู้ใช้เลือกข้อมูลที่แชร์

Reduced Motion, responsive refinement, empty/error/toast และ trust surfaces ต้องเป็นส่วนหนึ่งของ product maturity

Repo audited: grolygori789-crypto/velnox · main · README V1.9.0 / premium layer / local share system

## 9.3 Little Ganesha Tarot > Ritual, Emotional Reward, Modular Product Craft

Deck Ritual พิสูจน์ว่าการเลือก/เปิดเผยผลสามารถมี moment of anticipation โดยยัง accessible; Auren ใช้เป็น Daily State Reveal ไม่ใช่เลียนแบบไพ่

Modular JS แยก engine, UI, storage, export, audio, support — Auren ควรแยก domain logic ออกจาก presentation และ integrations

Support ถูก isolate ไม่ผูกกับคุณภาพผลลัพธ์หรือ entitlement — ตรงกับ Early Access + Optional Support ของ Auren

PWA/version/cache discipline และ real-device acceptance ต้องยกมาใช้เต็มที่

Multilingual copy เป็น native experience ไม่ใช่แปลทื่อ; ถ้า Auren ทำหลายภาษาให้ใช้หลักนี้

Repo audited: grolygori789-crypto/little-ganesha-tarot · main · README V0.16.0 / js/deck-ritual.js / modular PWA structure

# 10. Monetization — Premium generosity first

> EARLY ACCESS<br>Full Auren Experience · Free during Early Access · Optional Support

ห้ามโฆษณาในผลิตภัณฑ์

ห้ามล็อก core insight ในช่วง Early Access; เป้าหมายคือเรียนรู้ retention และ product value

Support surface ใช้คำ “Support Auren” ไม่ใช้ aggressive donation prompt และไม่แทรกระหว่าง check-in/reveal

architecture มี free / plus / founder entitlements ไว้ได้ แต่ initial flags เปิดทุก core feature

อนาคต Auren+ ขาย “deeper intelligence” เช่น long-horizon patterns, experiments, integrations, advanced reports หรือ AI analysis ไม่ใช่ขายข้อมูลพื้นฐานคืนให้ผู้ใช้

ไม่สัญญา “Everything free forever” หรือ lifetime premium หากยังไม่รู้ต้นทุนระยะยาว

# 11. Marketing & Brand Growth

Marketing ไม่ขายคำว่า “Health App” เป็นพระเอก แต่ขาย curiosity และ self-understanding. ภาพต้องเหมือน design publication / luxury technology brand มากกว่าแอพฟรี

| Use | Core line |
| --- | --- |
| Brand tagline | Your body, understood. |
| Campaign direction | Know what changes you. |
| Curiosity headline | Your body has patterns. Most of them are invisible. |
| Product category | Personal Health Intelligence |

State Portrait / Share My State เป็น organic acquisition engine แต่ branding ต้อง restrained

Social content = beautiful intelligence: animation ของ Core + insight ที่พิสูจน์จากข้อมูล ไม่ใช่ “5 tips to…” แบบ generic

ไม่มีคำว่า FREE เป็น hero message; framing คือ Early Access / Full Experience / Founding Edition

# 12. Roadmap — 3 Generations

| Era | Promise | Core capability |
| --- | --- | --- |
| Auren 1 · Know Today | วันนี้ร่างกายฉันเป็นอย่างไร | Check-in, Core, State, Signals, Evidence, History |
| Auren 2 · Know Yourself | อะไรมีผลต่อฉัน | Personal baseline, Pattern Map, long-term intelligence, integrations |
| Auren 3 · Know What Works | ฉันควรเปลี่ยนอะไร | Personal experiments / N-of-1 analysis / causal discipline |

# 13. V1 Scope — สิ่งที่ต้องสร้างก่อน

V1 ต้องพิสูจน์ core loop ไม่ใช่พิสูจน์ว่าเราทำ feature ได้เยอะ

Brand shell + responsive mobile app shell

Splash / Core reveal / Reduced Motion fallback

Onboarding ที่สั้นและอธิบาย privacy/limits อย่างชัดเจน

Daily Check-in

Today State + explainable score breakdown

Basic Rhythm

Signals + evidence + confidence

History / State Archive

Basic Calibration

Settings: data/export/delete, motion, privacy, support, about

PWA install/offline shell/versioning

QA + physical Android acceptance

Pattern Map, Future You, deep monthly intelligence, AI chat และ experiments สามารถทำหลัง core loop เสถียร หรือทำเป็น controlled feature flag หากไม่เสี่ยงต่อ V1

# 14. QA, Release & Regression Contract

Production is truth: inspect current repo HEAD before every substantial change

Define exact scope and changed-file allowlist before patching

Do not opportunistically redesign unrelated surfaces during bug fix

Every change must test target behavior + accepted neighboring behavior

PWA build/cache/manifest/service-worker identities must remain coherent

Static/browser tests must be labeled honestly; real Android/iOS acceptance is a separate gate

Motion/Reduced Motion, touch, keyboard/focus, narrow-phone layout, offline/update flows and persistence are release requirements, not polish

Health calculation changes require fixture tests and regression snapshots of representative user histories

Never silently change score meaning without migration/version note

# 15. Success Metrics — ช่วง Pre-PMF

| Metric | เหตุผล |
| --- | --- |
| D1 / D7 / D30 retention | วัดว่าคนกลับมาเพราะเห็นคุณค่าหรือไม่ |
| Week-4 active retention | สำคัญกว่า download count สำหรับ daily wellness product |
| Check-in completion rate | วัด friction ของ core ritual |
| Time-to-understand Today | ต้องเข้าใจ state เร็ว ไม่ใช่อยู่ในแอพนาน |
| Signal open > evidence open | วัดว่า insight น่าสนใจและเชื่อถือได้หรือไม่ |
| Data continuity | ผู้ใช้กรอกต่อเนื่องพอให้ model เรียนรู้หรือไม่ |
| Voluntary support rate | วัด goodwill โดยไม่ทำลาย UX |
| Qualitative trust feedback | ผู้ใช้เข้าใจว่าข้อมูลไหน fact / inference / uncertainty หรือไม่ |

# 16. Decision Filter — ก่อนเพิ่มทุก Feature

1.  มันช่วยให้ผู้ใช้เข้าใจตัวเองดีขึ้นจริงหรือไม่?

2.  มันมี evidence/data ที่เพียงพอหรือกำลังสร้างภาพว่าฉลาดเกินจริง?

3.  ผู้ใช้เข้าใจได้โดยไม่ต้องเรียนรู้ interface หรือไม่?

4.  มันทำลายความสงบ ความหรู หรือ brand coherence หรือไม่?

5.  มันเพิ่ม privacy/regulatory/maintenance cost มากกว่าคุณค่าหรือไม่?

6.  เราสามารถทดสอบ correctness และ regression ได้หรือไม่?

7.  ถ้าตัด feature นี้ออก Auren สูญเสีย core promise หรือแค่สูญเสียของเล่น?

> DEFAULT ANSWER<br>ถ้าไม่ผ่านข้อสำคัญ ให้ “ไม่ทำตอนนี้” แม้ feature จะดูเท่หรือทำ marketing ได้ง่าย

# 17. New-Room Startup Protocol — Zero-Question Continuation

1. อ่าน docs/product/AUREN_MASTER_PLAN.md ให้ครบก่อนเสนอ architecture หรือ UI

2. อ่าน docs/handoff/AUREN_ROOM_MIGRATION_PROMPT.md ให้ครบ

3.  ตรวจ GitHub repos: last-witness / velnox / little-ganesha-tarot เพื่ออ้างอิง proven patterns; ห้าม copy แบบ blind

4.  ถ้ามี Auren repo แล้ว ให้ inspect current HEAD, branch, files, build/version/cache และสถานะงานก่อนแก้ทุกครั้ง

5.  ถ้า change กระทบ runtime ให้ advance Build No. และตรวจทุก build/version/cache surface ที่เกี่ยวข้องให้ coherent 100%; search หา stale build number ก่อนส่ง

6.  ทุกชุดไฟล์/patch ที่พี่เบนซ์ต้องอัปโหลด GitHub ต้องแนบ Commit name ที่ตรวจแล้วว่าไม่เกิน 50 ตัวอักษร

7.  ถ้า change แตะ user-facing copy / locale / date-time-number formatting / layout ที่มีข้อความ ต้องตรวจ Native Localization Standard สำหรับ EN และ TH; missing key, mixed-language UI, unnatural copy หรือ ambiguous health wording = release blocker

8.  สรุป current state ในใจแล้วตัดสินใจต่อเอง; อย่าถามพี่เบนซ์ให้เล่า vision, tagline, visual direction, monetization หรือ product principles ซ้ำ

9.  เมื่อเกิด conflict ให้ใช้ลำดับ: latest explicit instruction > current Auren Production > Auren Master Plan > approved assets > repo history > older chat memory

10.  ถ้าเป็น product/design/marketing trade-off ให้ตัดสินใจอย่างเจ้าของบริษัทและบอกเหตุผลสั้นๆ ไม่โยนการตัดสินใจกลับให้ผู้ใช้โดยไม่จำเป็น

# 18. Locked Foundation vs Evolvable Decisions

## Locked foundation (เปลี่ยนเมื่อมีเหตุผลระดับใหญ่เท่านั้น)

AUREN / Personal Health Intelligence / “Your body, understood.”

Auren Core / Living Orb เป็น signature identity

Light Luxury Wellness เป็น primary visual direction

Trust + explainability + personal baseline + privacy

User-friendly before spectacle

No diagnosis / pseudo-science / fabricated claims / dark patterns / ads

Early Access: full experience free + optional support; premium-ready architecture

Web-first PWA for V1; no Bluetooth requirement

Repository hygiene + Build No. coherence + Commit name <= 50 characters

V1 bilingual foundation: English + Thai with Native Copywriting First / Meaning parity / Localization QA release-blocker standard

## Evolvable by Full Authorized DEV

exact navigation count, card layout, scoring weights, check-in questions, color token values, typography choice, motion timing

whether Pattern Map/Future You ships in V1 or V1.x

data storage modules and whether/when a backend/framework becomes justified

future Auren+ packaging and pricing

campaign lines beyond core tagline

future AI/integration architecture

# 19. Source Audit Snapshot

Repos inspected during preparation of this foundation:

grolygori789-crypto/last-witness — production-rebuild — GAME_MASTER_PLAN.md: source-of-truth, zero-question protocol, regression firewall, UI preservation, physical-device acceptance

grolygori789-crypto/velnox — main — README.md V1.9.0: isolated premium layer, transparent measurement/benchmark, local privacy-conscious share, Reduced Motion, trust surfaces

grolygori789-crypto/little-ganesha-tarot — main — README.md V0.16.0 + js/deck-ritual.js: modular PWA, ritual interaction, accessibility, support isolation, real-device acceptance

Master Plan นี้เป็น foundation ไม่ใช่สิ่งห้ามเปลี่ยนตลอดกาล สิ่งที่ห้ามคือการเปลี่ยนโดยไม่เข้าใจเหตุผลเดิมหรือทำให้ Auren สูญเสียความน่าเชื่อถือและเอกลักษณ์
