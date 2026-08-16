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
          <h1>เริ่ดเลยล่ะ!</h1>
          <p>คุณได้ออกกำลังกาย<br />เสริมดวงสุขภาพแล้ววันนี้ ✦</p>
        </header>

        <div className="celebration-mascot-wrap">
          <span className="celebration-ring" />
          <Mascot src="/assets/poses/Post5.png" alt="มาสคอตดีใจที่ทำภารกิจสำเร็จ" className="celebration-mascot" />
          <span className="star-pop star-one">★</span>
          <span className="star-pop star-two">✦</span>
          <span className="star-pop star-three">★</span>
        </div>

        <section className="white-panel boost-card">
          <strong>อยากเฮลตี้ขึ้นอีกขั้นไหม?<br />มาลอง Challenge ต่อไปกันเลย!</strong>
          <p>หรือชวนเพื่อนเพิ่ม 5 คน<br />แชร์ไม่ครบ ระวังไหล่ท่านอาจจะเคล็ด</p>
        </section>

        <div className="action-stack">
          <a className="complete-action-card" href="/challenge"><img className="action-icon" src="/assets/recommendations/Rec4.png" alt="" /><b>เสริมดวง<br />เฉพาะตัว</b></a>
          <button className="complete-action-card" type="button" onClick={share}><img className="action-icon" src="/assets/recommendations/Rec5.png" alt="" /><b>ส่งต่อ<br />ให้เพื่อน</b></button>
          {shareStatus && <p className="share-status" role="status">{shareStatus}</p>}
        </div>
        <p className="complete-note"><a href="https://lin.ee/Pwo0SPR" target="_blank" rel="noreferrer">Add LINE OA เพื่อดูกิจกรรมอื่นๆ ของเรา</a></p>
      </div>
    </PageShell>
  );
}
