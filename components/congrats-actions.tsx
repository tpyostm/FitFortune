"use client";

import { useState } from "react";
import { Mascot, PageShell } from "./fitfortune-ui";

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
      <div className="page-content complete-content">
        <header className="celebration-heading">
          <span className="celebration-confetti" aria-hidden="true">╲ ✦ · ✧ · ✦ ╱</span>
          <h1>CONGRATS!</h1>
          <p>คุณได้ออกกำลังกาย<br />เสริมดวงสุขภาพแล้ววันนี้ ✦</p>
        </header>

        <div className="celebration-mascot-wrap">
          <span className="celebration-ring" />
          <Mascot src="/assets/mascot/Mascot4.png" alt="มาสคอตดีใจที่ทำภารกิจสำเร็จ" className="celebration-mascot mascot-gold" />
          <span className="star-pop star-one">★</span>
          <span className="star-pop star-two">✦</span>
          <span className="star-pop star-three">★</span>
        </div>

        <section className="white-panel boost-card">
          <strong>สุขภาพดี เริ่มจากตัวเรา<br />ทำต่อเนื่อง ชีวิตก็จะปัง!</strong>
          <p>อยากเฮลตี้ขึ้นอีกขั้น?<br />มาลอง Challenge ต่อไปกันเลย!</p>
        </section>

        <div className="action-stack">
          <a className="complete-action-card" href="/challenge"><span className="action-icon star-icon">★</span><b>เสริมดวง<br />เฉพาะตัว</b></a>
          <button className="complete-action-card" type="button" onClick={share}><span className="action-icon share-icon">➤</span><b>ส่งต่อ<br />ให้เพื่อน</b></button>
          <a className="complete-action-card" href="https://line.me/R/ti/p/@fitfortune" target="_blank" rel="noreferrer"><span className="action-icon line-icon">LINE</span><b>Add<br />LINE OA</b></a>
          {shareStatus && <p className="share-status" role="status">{shareStatus}</p>}
        </div>
        <p className="complete-note">ทำตัววันนี้ พรุ่งนี้จะดีกว่าเดิมแน่นอน! ☺</p>
      </div>
    </PageShell>
  );
}
