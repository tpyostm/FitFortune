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

## ยอดกดปุ่มหน้า complete

ยอดกด "ไปกันต่อ" และ "ชวนเพื่อนมาเสริมดวง" นับรวมจากผู้ใช้ทุกคน เก็บใน Cloudflare D1
ผ่าน Worker เล็ก ๆ ใน `counter-worker/` (เว็บยังเป็น static บน GitHub Pages เรียก API นี้เฉย ๆ)

- ดูยอด: เปิด `/complete?counts=1`
- API: `GET /counts`, `POST /hit/challenge|share` ที่ `https://fitfortune-counter.tpyostm.workers.dev`
- deploy worker: `npx wrangler deploy --config counter-worker/wrangler.jsonc`
- รีเซ็ตยอด: `npx wrangler d1 execute fitfortune-counts --remote --config counter-worker/wrangler.jsonc --command "DELETE FROM counts"`

CORS จำกัดไว้ที่ origin ของเว็บ และรับเฉพาะชื่อ action สองตัวที่รู้จัก แต่ปลายทางเป็น
public endpoint จึงยังยิงตรงเพื่อปั่นยอดได้ — ถือเป็นตัวเลขคร่าว ๆ ไม่ใช่ตัวเลขที่กันการปลอมได้

## การเผยแพร่

โปรเจกต์นี้ deploy ผ่าน OpenAI Sites โดยใช้ค่าใน `.openai/hosting.json`

- Live site: <https://fitfortune-th.tomamimumemo.chatgpt.site>
- GitHub Pages: <https://tpyostm.github.io/FitFortune/>
