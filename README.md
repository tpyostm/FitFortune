# FITFORTUNE

เว็บแอพมือถือภาษาไทยที่เชื่อมคำทำนายสุขภาพกับกิจกรรมออกกำลังกายสั้น ๆ ตั้งแต่เปิดไพ่ ดูคำแนะนำ จับเวลา ไปจนถึงกิจกรรม Challenge

## เส้นทางหลัก

- `/` — เปิดไพ่สุขภาพประจำวัน
- `/today` — คำทำนาย คำแนะนำอุปกรณ์ และคลิปแนะนำ
- `/exercise?mode=main` — จับเวลาท่าหมุนไหล่
- `/complete` — หน้าสรุป แชร์ และไป Challenge ต่อ
- `/challenge` — รายละเอียด Plank แตะไหล่
- `/exercise?mode=challenge` — จับเวลา Challenge

## โครงสร้างโปรเจกต์

- `app/` — route และ style หลัก
- `components/fitfortune/` — UI, timer และ action ที่ใช้ร่วมกัน
- `content/` — ข้อความและข้อมูลกิจกรรมที่เป็นแหล่งข้อมูลกลาง
- `public/assets/` — asset ที่โหลดในหน้าเว็บจริง
- `source-assets/` — asset ต้นฉบับหรือไฟล์อ้างอิงที่ไม่รวมใน runtime
- `docs/` — ภาพอ้างอิงและรายงาน QA
- `tests/` — smoke tests ของทุก route, metadata และ asset references

## คำสั่งที่ใช้

```bash
npm run dev
npm run lint
npm run build
npm run build:pages
npm test
```

`npm test` จะ build แอพก่อน แล้วตรวจว่าแต่ละ route render ได้ มีข้อความสำคัญครบ ไม่มี starter UI หลงเหลือ และไม่มี asset reference ที่หายไป

## ข้อมูลที่เก็บในเครื่องผู้ใช้

- ประวัติการออกกำลังกายล่าสุดเก็บใน `localStorage` สูงสุด 20 รายการ
- ยอดกดหน้า complete เป็นยอดเฉพาะ browser/device นี้
- เปิด `/complete?counts=1` เพื่อดูแผงยอดกดสำหรับตรวจสอบ

## การเผยแพร่

โปรเจกต์นี้ deploy ผ่าน OpenAI Sites โดยใช้ค่าใน `.openai/hosting.json`

### GitHub Pages

`npm run build:pages` สร้าง static export ลง `dist/client/` (`BUILD_TARGET=pages` เปิด `output: "export"`
ส่วน build ปกติยังเป็น Cloudflare Worker ซึ่ง `npm test` ใช้ render)

เว็บเสิร์ฟจาก repo `tpyostm/tpyostm.github.io` ที่ domain root ไม่ใช่ subpath —
เพราะ vinext 1.0.0-beta.2 ใช้ `basePath` ร่วมกับ `output: "export"` ไม่ได้
(ดูเหตุผลใน `next.config.ts`) ตัว source ยังอยู่ repo นี้ workflow ฝั่งโน้น
จะ checkout มา build ให้ — ไฟล์ workflow อยู่ที่ `docs/deploy/github-pages.yml`

ข้อจำกัดของ static export: `?mode=challenge` และ `?counts=1` อ่านตอน build ไม่ได้
หน้าที่ prerender มาจึงเป็นค่า default แล้ว `useSearchFlag` แก้ค่าจาก URL ฝั่ง client
ก่อน browser paint
