"use client";

import { useEffect, useState } from "react";
import { Mascot, PageShell } from "./ui";

type CompleteAction = "challenge" | "share";
type CompleteActionCounts = Record<CompleteAction, number>;

const clickCountKey = "fitfortune_complete_action_clicks";
const emptyClickCounts: CompleteActionCounts = { challenge: 0, share: 0 };

function normalizeCount(value: unknown) {
  const count = Number(value);
  return Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
}

function readClickCounts(): CompleteActionCounts {
  if (typeof window === "undefined") return emptyClickCounts;
  try {
    const stored = JSON.parse(window.localStorage.getItem(clickCountKey) || "{}");
    return {
      challenge: normalizeCount(stored.challenge),
      share: normalizeCount(stored.share),
    };
  } catch {
    return emptyClickCounts;
  }
}

export function CongratsActions({ showCounts = false }: { showCounts?: boolean }) {
  const [shareStatus, setShareStatus] = useState("");
  const [clickCounts, setClickCounts] = useState<CompleteActionCounts>(emptyClickCounts);

  useEffect(() => {
    if (!showCounts) return;
    const frame = window.requestAnimationFrame(() => setClickCounts(readClickCounts()));
    return () => window.cancelAnimationFrame(frame);
  }, [showCounts]);

  function recordClick(action: CompleteAction) {
    const current = readClickCounts();
    const next = { ...current, [action]: current[action] + 1 };
    try {
      window.localStorage.setItem(clickCountKey, JSON.stringify(next));
    } catch {
      // Keep the in-page count working when browser storage is unavailable.
    }
    setClickCounts(next);
  }

  async function share() {
    recordClick("share");
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
          <span className="celebration-ring" aria-hidden="true" />
          <Mascot src="/assets/poses/Post5.png" alt="มาสคอตดีใจที่ทำภารกิจสำเร็จ" className="celebration-mascot" />
          <span className="star-pop star-one" aria-hidden="true">★</span>
          <span className="star-pop star-two" aria-hidden="true">✦</span>
          <span className="star-pop star-three" aria-hidden="true">★</span>
        </div>

        <section className="white-panel boost-card">
          <strong>อยากเฮลตี้ขึ้นอีกขั้นไหม?<br />มาลอง Challenge ต่อไปกันเลย!</strong>
          <p>หรือชวนเพื่อนเพิ่ม 5 คน<br />แชร์ไม่ครบ ระวังไหล่ท่านอาจจะเคล็ด</p>
        </section>

        <div className="action-stack">
          <a className="complete-action-card" href="/challenge" onClick={() => recordClick("challenge")}>
            <img className="action-icon" src="/assets/recommendations/Rec4.png" alt="" aria-hidden="true" />
            <b>เสริมดวง<br />เฉพาะตัว</b>
          </a>
          <button className="complete-action-card" type="button" onClick={share}>
            <img className="action-icon" src="/assets/recommendations/Rec5.png" alt="" aria-hidden="true" />
            <b>ส่งต่อ<br />ให้เพื่อน</b>
          </button>
          {shareStatus && <p className="share-status" role="status">{shareStatus}</p>}
          {showCounts && (
            <aside className="local-click-counts" aria-label="ยอดกดในอุปกรณ์นี้">
              <strong>ยอดกดในอุปกรณ์นี้</strong>
              <span>เสริมดวงเฉพาะตัว: <b>{clickCounts.challenge}</b> ครั้ง</span>
              <span>ส่งต่อให้เพื่อน: <b>{clickCounts.share}</b> ครั้ง</span>
              <small>ยอดนี้เก็บเฉพาะในเบราว์เซอร์ปัจจุบัน</small>
            </aside>
          )}
        </div>
        <p className="complete-note">
          <a href="https://lin.ee/Pwo0SPR" target="_blank" rel="noopener noreferrer">Add LINE OA เพื่อดูกิจกรรมอื่นๆ ของเรา</a>
        </p>
      </div>
    </PageShell>
  );
}
