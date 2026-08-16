"use client";

import { useState } from "react";

export default function Home() {
  const [opening, setOpening] = useState(false);

  function openFortune() {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => window.location.assign("/today"), 1180);
  }

  return (
    <main className="app-stage landing-stage">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <section className="phone-canvas landing-canvas draft-landing">
        <img className="effect-sparkle-sheet landing-sparkle-sheet" src="/assets/effects/Effect2.png" alt="" aria-hidden="true" />
        <div className="sparkles" aria-hidden="true">
          <span>★</span><span>✦</span><span>★</span><span>✧</span><span>★</span><span>✦</span>
        </div>

        <header className="landing-copy">
          <p className="eyebrow">FITFORTUNE</p>
          <h1>MUTELO<br />PICK A CARD</h1>
          <p>สุขภาพดีก็เริ่มที่การ “เลือก”<br />ลุ้นรับคำแนะนำดี ๆ สำหรับวันนี้</p>
        </header>

        <div className="landing-card-scene">
          <img className="landing-orbit" src="/assets/effects/Effect1.png" alt="" aria-hidden="true" />
          <span className="leaf-silhouette leaf-left" aria-hidden="true" />
          <span className="leaf-silhouette leaf-right" aria-hidden="true" />
          <span className="card-shadow-layer card-shadow-left" aria-hidden="true" />
          <span className="card-shadow-layer card-shadow-right" aria-hidden="true" />
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
          <span className="card-pedestal" aria-hidden="true"><i /><b /></span>
        </div>

        <button className="tap-hint" type="button" onClick={openFortune}>
          <span>{opening ? "กำลังพลิกไพ่..." : "กดแล้วพลิกไพ่เลย!"}</span>
          <span className="tap-hand" aria-hidden="true">☝</span>
        </button>
      </section>
    </main>
  );
}
