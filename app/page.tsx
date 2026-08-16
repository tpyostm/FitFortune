"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [opening, setOpening] = useState(false);

  function openFortune() {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => router.push("/today"), 1180);
  }

  return (
    <main className="app-stage landing-stage">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <section className="phone-canvas landing-canvas">
        <div className="sparkles" aria-hidden="true">
          <span>✦</span><span>✧</span><span>✦</span><span>·</span><span>✧</span>
        </div>

        <header className="landing-copy">
          <p className="eyebrow">FITFORTUNE</p>
          <h1>ดวงวันนี้<br /><strong>จะดีไหมนะ?</strong></h1>
          <p>เปิดไพ่ดูพลังสุขภาพประจำวัน<br />แล้วไปขยับร่างกายด้วยกัน!</p>
        </header>

        <button
          className={`fortune-pick ${opening ? "is-opening" : ""}`}
          type="button"
          onClick={openFortune}
          aria-label="แตะเพื่อเปิดไพ่สุขภาพประจำวัน"
        >
          <span className="card-aura" />
          <span className="card-flipper">
            <span className="card-face card-back">
              <img src="/assets/cards/card-back.png" alt="ไพ่ปริศนา FITFORTUNE" />
            </span>
            <span className="card-face card-front">
              <img src="/assets/cards/card-front.png" alt="ไพ่ FITFORTUNE ที่เปิดแล้ว" />
            </span>
          </span>
        </button>

        <button className="tap-hint" type="button" onClick={openFortune}>
          <span>{opening ? "กำลังเปิดคำทำนาย..." : "แตะที่ไพ่เพื่อเปิดดวง!"}</span>
          <span className="tap-hand" aria-hidden="true">☝</span>
        </button>
      </section>
    </main>
  );
}
