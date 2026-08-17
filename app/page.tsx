"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [opening, setOpening] = useState(false);
  const navigationTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (navigationTimer.current !== null) window.clearTimeout(navigationTimer.current);
  }, []);

  function openFortune() {
    if (opening) return;
    setOpening(true);
    navigationTimer.current = window.setTimeout(() => window.location.assign("/today"), 1180);
  }

  return (
    <main className="app-stage landing-stage">
      <section className="phone-canvas landing-canvas">
        <img className="effect-sparkle-sheet landing-sparkle-sheet" src="/assets/effects/Effect2.png" alt="" aria-hidden="true" />
        <div className="sparkles" aria-hidden="true">
          <span>★</span><span>✦</span><span>★</span><span>✧</span><span>★</span><span>✦</span>
        </div>

        <header className="landing-copy">
          <p className="eyebrow">FITFORTUNE</p>
          <h1>ดวงวันนี้<br />จะดีไหมนะ?</h1>
          <p>เปิดไพ่รับคำแนะนำดีๆ<br />เพื่อสุขภาพคุณวันนี้</p>
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
          <span className="card-tap-label" aria-hidden="true">✦ {opening ? "กำลังเปิดดวง..." : "แตะไพ่เพื่อเปิดดวง"} ✦</span>
        </div>
      </section>
    </main>
  );
}
