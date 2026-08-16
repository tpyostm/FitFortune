"use client";

import { useState } from "react";
import { Mascot, PageShell, TopBar } from "./fitfortune-ui";

export function CongratsActions() {
  const [shareStatus, setShareStatus] = useState("");

  async function share() {
    const shareData = {
      title: "FITFORTUNE",
      text: "วันนี้ฉันขยับร่างกายตามคำทำนายแล้ว! มาเปิดดวงสุขภาพด้วยกัน ✦",
      url: window.location.origin,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus("แชร์แล้ว เยี่ยมมาก!");
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setShareStatus("คัดลอกลิงก์แล้ว!");
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") setShareStatus("ลองแชร์อีกครั้งนะ");
    }
  }

  return (
    <PageShell className="complete-page">
      <TopBar backHref="/today" label="FITFORTUNE" />
      <div className="page-content complete-content">
        <header className="celebration-heading">
          <span className="celebration-confetti" aria-hidden="true">✦ · ✧ · ✦</span>
          <p className="section-kicker">MISSION COMPLETE</p>
          <h1>เริ่ดเลย!</h1>
          <p>คุณขยับร่างกายสำเร็จ<br />พลังสุขภาพวันนี้เพิ่มขึ้นแล้ว</p>
        </header>

        <div className="celebration-mascot-wrap">
          <span className="celebration-ring" />
          <Mascot src="/assets/mascot/Mascot4.png" alt="มาสคอตดีใจที่ทำภารกิจสำเร็จ" className="celebration-mascot" />
          <span className="star-pop star-one">★</span>
          <span className="star-pop star-two">✦</span>
          <span className="star-pop star-three">★</span>
        </div>

        <section className="white-panel boost-card">
          <p>วันนี้คุณดูแลตัวเองแล้วหนึ่งอย่าง</p>
          <strong>อยากบูสต์ดวงให้ปังกว่านี้ไหม?</strong>
          <span>ลองชาเลนจ์ต่ออีก 30 วินาที!</span>
        </section>

        <div className="action-stack">
          <a className="primary-button" href="/challenge">บูสต์ดวงเฉพาะคุณ <span>›</span></a>
          <button className="secondary-button" type="button" onClick={share}>ส่งต่อให้เพื่อน <span aria-hidden="true">↗</span></button>
          <a className="line-button" href="https://line.me/R/ti/p/@fitfortune" target="_blank" rel="noreferrer">เพิ่มเพื่อน LINE OA <span aria-hidden="true">＋</span></a>
          {shareStatus && <p className="share-status" role="status">{shareStatus}</p>}
        </div>
      </div>
    </PageShell>
  );
}
