# AUREN — PRIVACY POLICY / นโยบายความเป็นส่วนตัว

**Product:** Auren  
**Studio:** Benedict Interactive  
**Legal Version:** 1.0.0  
**Effective / Updated:** 28 August 2026  
**Status:** User-facing legal document

> English and Thai are maintained for meaning parity. Mandatory legal rights prevail over wording that applicable law does not permit to be waived.

---

# English

## 1. Privacy model

Auren is designed local-first. In the current build, no account is required and Benedict Interactive does not operate an Auren cloud database that receives your profile, check-ins or profile photo as part of the ordinary product flow.

This Policy describes the current released architecture, not every possible future feature.

## 2. Information you may enter

Depending on what you choose to use, Auren may store a display name, profile photo, age, sex used for health calculations, height, weight, activity level, training type and frequency, goals, optional waist circumference, optional measured body-fat percentage, and daily observations for sleep, energy, stress, mood and movement.

These fields are used to provide the body context, daily state, personal history and evidence-limited interpretations described in the product.

## 3. Health and sensitive information

Some information entered in Auren can be health-related or otherwise sensitive under applicable privacy law. You should enter only information you are comfortable storing on the device and only information you are authorised to provide.

The current local-first architecture is deliberately designed to avoid transmitting ordinary profile and check-in content to an Auren application server. If that architecture changes, the legal and consent model must change with it where required.

## 4. Where information is stored

Current user data is stored in browser/device storage, including the IndexedDB database named `auren` for profile and check-in records and local preferences for product settings. Profile photos are stored locally as part of the profile record.

Local storage is not the same as a cloud backup and is not separately encrypted by Auren. Protection therefore depends in part on your device, browser, operating system and access controls.

## 5. Profile photos

Auren uses a profile photo only for personal presentation in the current build. Auren does not perform face recognition, biometric identification, body-fat estimation, health inference, sex inference or body-shape analysis from the profile photo.

Removing the photo through Auren removes the locally stored profile-photo value used by the app.

## 6. What may leave the device

Auren does not use the phrase “nothing ever leaves your device” because a web/PWA still makes ordinary requests to the hosting infrastructure needed to load or update the application. A hosting provider, network provider, browser or operating-system service may receive ordinary technical metadata such as IP address, request time, user agent or similar connection information under its own policies.

The current Auren code does not intentionally include your locally stored profile, check-in values or profile photo in those ordinary hosting requests.

## 7. Analytics, advertising and trackers

The current build contains no Benedict Interactive advertising SDK, behavioural advertising SDK or product analytics SDK identified in the released runtime, and Auren does not sell local health-context data.

If analytics or advertising technology is added later, this Policy must be updated before use and any required consent or opt-out mechanism must be implemented.

## 8. Legal acknowledgement record

Auren stores a minimal local acknowledgement consisting of the accepted Legal Version and acceptance timestamp. For Legal Version 1.0.0, the record is stored as Auren local preferences and is used only to know whether the current material Terms have been acknowledged on that browser/device.

The acknowledgement record is not a remote identity record and does not prove who used the device.

## 9. Deletion and retention

Local profile, check-in and preference data generally remains until you delete it, use Auren’s data controls, clear browser/site storage, uninstall/remove the app or the browser/device removes it. Auren provides controls for deleting today’s check-in, deleting an Archive day where available, and erasing all local Auren data.

Erase all local data deletes the Auren IndexedDB database and Auren preference keys used by the current app, including the local legal-acknowledgement preference.

## 10. Data loss and device access

Anyone who can access your unlocked device or browser profile may be able to access locally stored Auren information. Use appropriate device-level security if the information is sensitive to you.

Browser storage can be cleared or lost. Auren currently does not provide server-side recovery.

## 11. Children and users without independent legal capacity

Auren is not intended to bypass parental, guardian or legal-consent requirements. If a person cannot legally make privacy or contractual choices independently, a parent, guardian or other legally authorised person should be involved.

The age field used for health-reference guardrails is not an age-verification system.

## 12. Future cloud, accounts, integrations and wearables

Any future cloud backup, account, multi-device sync, Apple Health/HealthKit, Android Health Connect, wearable or other external integration may create new data flows and third-party relationships.

Before such a feature processes health-related information remotely, Auren must disclose the source, destination, purpose, categories of information, retention and relevant choices, and obtain explicit consent or another lawful basis where applicable. Imported data must retain provenance.

## 13. Data-protection rights

Because the current Auren product does not ordinarily hold a server copy of your local profile and check-ins, many practical access, correction and deletion actions are performed directly on your device. If Benedict Interactive later becomes a remote controller of personal data, applicable access, correction, deletion, objection, portability and other rights must be supported as required by law.

Nothing in this Policy limits rights that applicable privacy law gives you.

## 14. Security

Local-first design reduces some transmission and central-database risks but does not eliminate privacy or security risk. Auren cannot guarantee the security of your device, browser, network, hosting provider or every future software defect.

Do not disclose personal health data in public bug reports or public repository issues.

## 15. International and third-party processing

A particular deployment or hosting provider may process ordinary web-request metadata in countries other than your own. That processing is governed by the relevant provider and applicable law.

Auren’s current product design does not intentionally send the substantive local health-context fields described above to Benedict Interactive merely because the app page is loaded.

## 16. Changes to this Policy

Material changes to data flows or health-information processing require this Policy to be updated. A change that materially affects user rights or obligations may also require a new legal acknowledgement or separate consent.

Privacy Policy Legal Version 1.0.0 is effective from 28 August 2026.

## 17. Contact

Privacy questions should use an official Benedict Interactive contact channel published with Auren or its repository when one is available. Do not include health data in a public contact channel.

---

# ภาษาไทย

## 1. โมเดลความเป็นส่วนตัว

Auren ออกแบบแบบ local-first ใน Build ปัจจุบันไม่ต้องมีบัญชี และ Benedict Interactive ไม่มีฐานข้อมูล Auren บนคลาวด์ที่รับโปรไฟล์ เช็กอิน หรือรูปโปรไฟล์ของผู้ใช้เป็นส่วนหนึ่งของ flow ปกติของผลิตภัณฑ์

นโยบายนี้อธิบายสถาปัตยกรรมของรุ่นที่เผยแพร่ในปัจจุบัน ไม่ได้อธิบายฟีเจอร์อนาคตทุกอย่างล่วงหน้า

## 2. ข้อมูลที่ผู้ใช้อาจกรอก

ตามฟีเจอร์ที่เลือกใช้ Auren อาจเก็บชื่อที่ให้เรียก รูปโปรไฟล์ อายุ เพศที่ใช้สำหรับการคำนวณสุขภาพ ส่วนสูง น้ำหนัก ระดับกิจกรรม ประเภทและความถี่การฝึก เป้าหมาย รอบเอว (ถ้าให้) เปอร์เซ็นต์ไขมันที่วัดมาแล้ว (ถ้าให้) และสิ่งที่รายงานรายวันเกี่ยวกับการนอน พลังงาน ความเครียด อารมณ์ และการเคลื่อนไหว

ข้อมูลเหล่านี้ใช้เพื่อสร้างบริบทร่างกาย ภาวะรายวัน ประวัติส่วนตัว และการตีความแบบจำกัดตามหลักฐานตามที่ผลิตภัณฑ์อธิบาย

## 3. ข้อมูลสุขภาพและข้อมูลอ่อนไหว

ข้อมูลบางอย่างใน Auren อาจเป็นข้อมูลเกี่ยวกับสุขภาพหรือข้อมูลอ่อนไหวตามกฎหมายคุ้มครองข้อมูลที่ใช้บังคับ ผู้ใช้ควรใส่เฉพาะข้อมูลที่ยอมรับได้ว่าจะเก็บไว้ในอุปกรณ์ และเฉพาะข้อมูลที่ตนมีอำนาจให้ได้

สถาปัตยกรรม local-first ปัจจุบันตั้งใจหลีกเลี่ยงการส่งเนื้อหาโปรไฟล์และเช็กอินตามปกติไปยัง application server ของ Auren หากสถาปัตยกรรมนี้เปลี่ยน กรอบกฎหมายและการขอความยินยอมต้องเปลี่ยนตามในส่วนที่กฎหมายกำหนด

## 4. ข้อมูลถูกเก็บที่ใด

ข้อมูลผู้ใช้ปัจจุบันเก็บใน browser/device storage รวมถึง IndexedDB ชื่อ `auren` สำหรับโปรไฟล์และเช็กอิน และ local preference สำหรับการตั้งค่าผลิตภัณฑ์ รูปโปรไฟล์ถูกเก็บในเครื่องเป็นส่วนหนึ่งของ profile record

Local storage ไม่ใช่ cloud backup และ Auren ไม่ได้เข้ารหัสข้อมูลนี้แยกอีกชั้นด้วยตัวแอป การป้องกันจึงขึ้นกับอุปกรณ์ เบราว์เซอร์ ระบบปฏิบัติการ และการควบคุมการเข้าถึงของผู้ใช้ด้วย

## 5. รูปโปรไฟล์

Auren ใช้รูปโปรไฟล์เพื่อการนำเสนอส่วนตัวเท่านั้นใน Build ปัจจุบัน และไม่ทำ face recognition, biometric identification, ประเมินเปอร์เซ็นต์ไขมัน สรุปสุขภาพ เดาเพศ หรือวิเคราะห์รูปร่างจากรูปโปรไฟล์

เมื่อผู้ใช้ลบรูปผ่าน Auren ค่ารูปโปรไฟล์ที่แอปเก็บไว้ในเครื่องจะถูกนำออกจาก profile record

## 6. อะไรอาจออกจากอุปกรณ์

Auren ไม่ใช้คำว่า “ไม่มีข้อมูลใดออกจากเครื่องเลย” เพราะ Web/PWA ยังต้องส่ง request ปกติไปยังโครงสร้างโฮสต์เพื่อโหลดหรืออัปเดตแอป ผู้ให้บริการโฮสต์ เครือข่าย เบราว์เซอร์ หรือระบบปฏิบัติการอาจได้รับ metadata ทางเทคนิคตามปกติ เช่น IP address เวลา request user agent หรือข้อมูลการเชื่อมต่อใกล้เคียงกันภายใต้นโยบายของตน

โค้ด Auren ปัจจุบันไม่ได้ตั้งใจแนบโปรไฟล์ เช็กอิน หรือรูปโปรไฟล์ที่เก็บในเครื่องไปกับ request โฮสต์ปกติดังกล่าว

## 7. Analytics โฆษณา และ tracker

Build ปัจจุบันไม่พบ Benedict Interactive advertising SDK, behavioural advertising SDK หรือ product analytics SDK ใน runtime ที่เผยแพร่ และ Auren ไม่ขายข้อมูลสุขภาวะที่เก็บในเครื่อง

หากเพิ่ม analytics หรือเทคโนโลยีโฆษณาในอนาคต ต้องปรับนโยบายนี้ก่อนใช้งานและจัดให้มี consent/opt-out ตามที่กฎหมายกำหนด

## 8. บันทึกการรับทราบข้อกำหนด

Auren เก็บบันทึกในเครื่องให้น้อยที่สุด ได้แก่ Legal Version ที่ยอมรับและเวลาที่กดยอมรับ สำหรับ Legal Version 1.0.0 ค่าดังกล่าวเก็บเป็น Auren local preference เพื่อทราบว่า browser/device นี้เคยรับทราบข้อกำหนดสาระสำคัญรุ่นปัจจุบันหรือยัง

บันทึกนี้ไม่ใช่ระบบยืนยันตัวตนระยะไกลและไม่ได้พิสูจน์ว่าใครเป็นผู้ใช้อุปกรณ์

## 9. การลบและระยะเวลาการเก็บ

ข้อมูลโปรไฟล์ เช็กอิน และ preference ในเครื่องโดยทั่วไปจะอยู่จนกว่าผู้ใช้จะลบ ใช้ Data Controls ของ Auren ล้าง browser/site storage ถอน/ลบแอป หรือเบราว์เซอร์/อุปกรณ์นำข้อมูลออก Auren มีการลบเช็กอินวันนี้ ลบวันใน Archive เมื่อมีข้อมูล และล้างข้อมูล Auren ในเครื่องทั้งหมด

การล้างข้อมูลในเครื่องทั้งหมดจะลบฐาน IndexedDB `auren` และ preference key ของ Auren ที่ระบบปัจจุบันใช้ รวมถึง preference ที่บันทึกการรับทราบ Legal Version

## 10. ข้อมูลสูญหายและการเข้าถึงอุปกรณ์

บุคคลที่เข้าถึงอุปกรณ์หรือ browser profile ที่ปลดล็อกแล้วอาจเข้าถึงข้อมูล Auren ที่เก็บในเครื่องได้ ควรใช้ระบบล็อกและความปลอดภัยระดับอุปกรณ์ที่เหมาะสมเมื่อข้อมูลมีความอ่อนไหว

Browser storage สามารถถูกล้างหรือสูญหาย และ Auren ปัจจุบันไม่มีระบบกู้คืนจาก server

## 11. เด็กและผู้ที่ยังไม่มีความสามารถให้ความยินยอมด้วยตนเอง

Auren ไม่ได้มีไว้เพื่อหลีกเลี่ยงข้อกำหนดเรื่องผู้ปกครองหรือความยินยอมตามกฎหมาย หากบุคคลยังไม่สามารถตัดสินใจเรื่อง privacy/สัญญาได้อย่างอิสระตามกฎหมาย ต้องมีบิดามารดา ผู้ปกครอง หรือผู้มีอำนาจตามกฎหมายเข้ามาเกี่ยวข้อง

ช่องอายุสำหรับ health-reference guardrail ไม่ใช่ระบบยืนยันอายุ

## 12. Cloud บัญชี Integrations และ Wearables ในอนาคต

Cloud backup บัญชี sync หลายอุปกรณ์ Apple Health/HealthKit, Android Health Connect, wearable หรือ external integration ในอนาคตอาจสร้าง data flow และความสัมพันธ์กับบุคคลที่สามแบบใหม่

ก่อนฟีเจอร์ดังกล่าวประมวลผลข้อมูลสุขภาพจากระยะไกล Auren ต้องเปิดเผยแหล่งที่มา ปลายทาง วัตถุประสงค์ ประเภทข้อมูล ระยะเวลาเก็บ และทางเลือกที่เกี่ยวข้อง พร้อมขอความยินยอมโดยชัดแจ้งหรือใช้ฐานกฎหมายอื่นที่เหมาะสมตามที่กฎหมายกำหนด และข้อมูลนำเข้าต้องรักษา provenance

## 13. สิทธิด้านข้อมูลส่วนบุคคล

เนื่องจาก Auren ปัจจุบันโดยปกติไม่ได้ถือสำเนา server ของโปรไฟล์และเช็กอินในเครื่อง การเข้าถึง แก้ไข และลบในทางปฏิบัติจำนวนมากจึงทำบนอุปกรณ์โดยตรง หากในอนาคต Benedict Interactive กลายเป็นผู้ควบคุมข้อมูลส่วนบุคคลจากการประมวลผลระยะไกล ต้องรองรับสิทธิการเข้าถึง แก้ไข ลบ คัดค้าน โอนย้าย และสิทธิอื่นตามกฎหมายที่ใช้บังคับ

นโยบายนี้ไม่จำกัดสิทธิใดที่กฎหมายคุ้มครองข้อมูลส่วนบุคคลให้แก่ผู้ใช้

## 14. ความปลอดภัย

Local-first ลดความเสี่ยงบางอย่างจากการส่งข้อมูลและฐานข้อมูลส่วนกลาง แต่ไม่ได้กำจัดความเสี่ยงด้าน privacy/security ทั้งหมด Auren ไม่สามารถรับประกันความปลอดภัยของอุปกรณ์ เบราว์เซอร์ เครือข่าย ผู้ให้บริการโฮสต์ หรือข้อบกพร่องซอฟต์แวร์ทุกกรณี

ห้ามเปิดเผยข้อมูลสุขภาพส่วนบุคคลใน bug report หรือ public repository issue

## 15. การประมวลผลข้ามประเทศและบุคคลที่สาม

deployment หรือผู้ให้บริการโฮสต์ที่ใช้จริงอาจประมวลผล metadata ของ web request ปกติในประเทศอื่น การประมวลผลดังกล่าวอยู่ภายใต้ผู้ให้บริการและกฎหมายที่เกี่ยวข้อง

การออกแบบผลิตภัณฑ์ปัจจุบันไม่ได้ตั้งใจส่งข้อมูลสุขภาวะสาระสำคัญที่เก็บในเครื่องไปยัง Benedict Interactive เพียงเพราะผู้ใช้เปิดหน้าแอป

## 16. การเปลี่ยนนโยบาย

การเปลี่ยน data flow หรือการประมวลผลข้อมูลสุขภาพอย่างมีสาระสำคัญต้องปรับนโยบายนี้ การเปลี่ยนที่มีผลต่อสิทธิหรือหน้าที่ของผู้ใช้อย่างมีสาระสำคัญอาจต้องรับทราบ Legal Version ใหม่หรือขอ consent แยกต่างหาก

Privacy Policy Legal Version 1.0.0 มีผลตั้งแต่ 28 สิงหาคม 2569 (2026)

## 17. การติดต่อ

คำถามด้านความเป็นส่วนตัวควรใช้ช่องทางทางการของ Benedict Interactive ที่เผยแพร่กับ Auren หรือ repository เมื่อมีช่องทางดังกล่าว และไม่ควรแนบข้อมูลสุขภาพในช่องทางสาธารณะ
