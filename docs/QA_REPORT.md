# FITFORTUNE QA & Refactor Report

วันที่ตรวจ: 2026-08-17  
สถานะ: ผ่านการตรวจรับหลัง refactor

## สรุปผล

- Build สำเร็จ
- TypeScript check สำเร็จ
- ESLint สำเร็จโดยไม่มี error หรือ warning
- Automated tests ผ่าน 9/9 รายการ
- Production dependency audit พบ 0 vulnerability
- ตรวจครบ 6 route หลักบนขนาดมือถือมาตรฐานและจอเตี้ย
- ไม่พบภาพเสีย, horizontal overflow, control ไม่มีชื่อ, alt หาย, duplicate id หรือ console error

## ปัญหาที่พบและแก้ไข

1. ชุดทดสอบเดิมยังตรวจหน้า loading ของ starter และล้มเหลวทั้งหมด
   - เปลี่ยนเป็น smoke tests ของ FITFORTUNE จริง ครอบคลุมทุก route, metadata, runtime asset และ starter-file cleanup
2. ESLint พบการ set state ตรงใน effect 2 จุด
   - ย้ายการ reset pose ไปที่ action เริ่ม/ทำต่อ
   - โหลด click counters แบบ deferred และรับ `counts=1` จาก server route
3. หน้า Challenge timer ใช้ข้อความขั้นตอนของท่าหมุนไหล่
   - เปลี่ยนเป็นขั้นตอน Plank: ตั้งท่า, แตะไหล่สลับ, เกร็งลำตัว
4. ข้อมูลแนะนำอุปกรณ์และ JSX ถูกเขียนซ้ำในหน้า 2 และหน้า 5
   - สร้างข้อมูลกลางและ `RecommendationGrid` ที่ใช้ร่วมกัน
5. Timer pose loop ผูกกับจำนวนเฟรมแบบ hard-code
   - เปลี่ยนให้วนตามจำนวนเฟรมจริงจากข้อมูลกิจกรรม
6. Session history อาจบันทึกไม่ได้หากข้อมูลเดิมใน localStorage ไม่ใช่ array
   - เพิ่มการตรวจชนิดและ fallback เป็น array ว่าง
7. หน้าเปิดไพ่ไม่ cleanup navigation timeout เมื่อ component ถูกถอด
   - เพิ่ม timeout ref และ cleanup
8. Metadata ไม่มี favicon ที่ระบุชัดเจน
   - เพิ่ม `/favicon.svg` ใน metadata

## Refactor และการจัดโครงสร้าง

- รวม component หลักไว้ใน `components/fitfortune/`
- รวมข้อความ อุปกรณ์ และข้อมูลกิจกรรมไว้ใน `content/fitfortune.ts`
- แยก asset ที่หน้าเว็บใช้จริงไว้ใน `public/assets/`
- ย้ายภาพอ้างอิงเดิมไป `docs/reference/`
- ย้าย asset ต้นฉบับที่ไม่ได้ใช้ runtime ไป `source-assets/`
- ย้ายสำเนา Rec ต้นฉบับไป `source-assets/recommendations/` และกันออกจาก Git/deployment
- ลบโฟลเดอร์ `Card/` และ `Mascot/` ที่เป็นไฟล์ซ้ำ โดยยังมีสำเนาที่ใช้งาน/สำเนาต้นฉบับอยู่ในโครงสร้างใหม่และในประวัติ Git
- ลบ starter-only auth, D1 example, Drizzle files/dependencies, default icons และ social images เวอร์ชันเก่าที่ไม่ได้ใช้งาน
- ปรับ README ให้ตรงกับ FITFORTUNE และคำสั่งตรวจงานปัจจุบัน

## Browser test matrix

| รายการ | ผลลัพธ์ |
|---|---|
| เปิดไพ่ `/` → `/today` | ผ่าน |
| `/today` → main timer | ผ่าน |
| Pose idle `Post1` | ผ่าน |
| Pose loop `Post2 → Post3 → Post4 → Post3` | ผ่าน |
| Pause แล้วเวลาไม่เดินและกลับ `Post1` | ผ่าน |
| จับเวลาครบแล้วไป `/complete` | ผ่าน |
| แผง `/complete?counts=1` | ผ่าน |
| LINE OA URL | ถูกต้อง (`https://lin.ee/Pwo0SPR`) |
| `/complete` → `/challenge` | ผ่าน |
| Challenge CTA ไม่ทับกล่องประโยชน์ | ผ่าน ระยะ 24px ที่ 390×844 และ 390×720 |
| Challenge step copy | ผ่าน เป็นขั้นตอน Plank |
| Challenge mascot ขณะจับเวลา | ผ่าน คงภาพท่า Challenge |
| Responsive 390×844 และ 360×720 | ผ่าน ไม่มีแนวนอนล้น |
| Broken images | 0 |
| Browser console error/warning | 0 |
| Controls ไม่มี accessible name | 0 |
| Images ไม่มี `alt` | 0 |

## Dependency audit

- `npm audit --omit=dev`: 0 vulnerability
- รัน `npm audit fix` แบบไม่ force แล้ว ลดผลตรวจรวมจาก 17 เหลือ 11 รายการ
- รายการที่เหลืออยู่ใน development/build toolchain ที่ล็อกเวอร์ชันไว้ เช่น vinext, Vite และ Cloudflare tooling
- ไม่ใช้ `npm audit fix --force` เพราะจะเปลี่ยน dependency ออกนอกช่วงเวอร์ชันที่โปรเจกต์ล็อกและเพิ่มความเสี่ยงต่อ build/deployment

## ข้อจำกัดที่ยังตั้งใจคงไว้

- Click counters เป็นยอดเฉพาะ browser/device เพราะยังไม่มี backend
- ไม่กดยืนยันแชร์จริงระหว่าง automated browser QA เพื่อไม่เปิด share sheet หรือส่งข้อมูลภายนอก แต่ตรวจปุ่ม, fallback code และ link structure แล้ว

## GitHub Pages QA

- เพิ่ม static client build แยกที่ `npm run build:pages` โดยใช้ component และ style ชุดเดียวกับแอพหลัก
- ตรวจครบ 6 route ภายใต้ base path `/FitFortune/`
- ไม่พบรูปเสีย, horizontal overflow, asset ที่หลุดไป root path หรือ console error/warning
- ตรวจการเปิดไพ่จากหน้าแรกไปหน้า Today และลิงก์เข้า Timer ทั้ง Main/Challenge แล้ว
- จับเวลา Main ครบ 30 วินาทีและ redirect ไป `/FitFortune/complete/` สำเร็จ
- `npm test` ของ vinext/OpenAI Sites ยังคงผ่าน 9/9 หลังเพิ่ม GitHub Pages
