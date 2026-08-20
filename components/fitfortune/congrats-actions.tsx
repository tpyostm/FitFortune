"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Mascot, PageShell } from "./ui";
import { appHref, appShareUrl, assetPath } from "./paths";

type CompleteAction = "challenge" | "share";
type CompleteActionCounts = Record<CompleteAction, number>;

// Tallies used to live in localStorage, which could only ever say how often
// this one browser tapped. They are counted server-side now so the panel can
// answer how many taps came from everyone.
const countsApi = "https://fitfortune-counter.tpyostm.workers.dev";

function normalizeCount(value: unknown) {
  const count = Number(value);
  return Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
}

function toCounts(payload: unknown): CompleteActionCounts | null {
  if (!payload || typeof payload !== "object") return null;
  const raw = payload as Record<string, unknown>;
  return { challenge: normalizeCount(raw.challenge), share: normalizeCount(raw.share) };
}

export function CongratsActions({ showCounts = false }: { showCounts?: boolean }) {
  const [shareStatus, setShareStatus] = useState("");
  const [clickCounts, setClickCounts] = useState<CompleteActionCounts | null>(null);
  const [countsFailed, setCountsFailed] = useState(false);
  // The page-load read and a tap's write are in flight at the same time when
  // someone taps early. Whichever was issued last is the current truth, so
  // stamp each request and let a late reply for an older one drop.
  const latestRequest = useRef(0);

  const applyCounts = useCallback((payload: unknown, requestId: number) => {
    if (requestId < latestRequest.current) return false;
    const counts = toCounts(payload);
    if (counts) setClickCounts(counts);
    return Boolean(counts);
  }, []);

  useEffect(() => {
    if (!showCounts) return;
    const abort = new AbortController();
    const requestId = ++latestRequest.current;

    fetch(`${countsApi}/counts`, { signal: abort.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        if (!applyCounts(payload, requestId)) setCountsFailed(true);
      })
      .catch(() => {
        if (!abort.signal.aborted) setCountsFailed(true);
      });

    return () => abort.abort();
  }, [showCounts, applyCounts]);

  function recordClick(action: CompleteAction) {
    const requestId = ++latestRequest.current;

    // `keepalive` so the challenge card, which is a link, can navigate away
    // without the browser dropping the request in flight.
    fetch(`${countsApi}/hit/${action}`, { method: "POST", keepalive: true })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => applyCounts(payload, requestId))
      .catch(() => {
        // A tap that fails to record still has to complete for the visitor.
      });
  }

  async function share() {
    recordClick("share");
    const shareData = {
      title: "FITFORTUNE",
      text: "วันนี้ฉันขยับร่างกายตามคำทำนายแล้ว! มาเปิดดวงสุขภาพด้วยกัน ✦",
      url: appShareUrl(),
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
          <a className="complete-action-card" href={appHref("/challenge")} onClick={() => recordClick("challenge")}>
            <img className="action-icon" src={assetPath("/assets/recommendations/Rec4.png")} alt="" aria-hidden="true" />
            <b>ไปกันต่อ</b>
          </a>
          <button className="complete-action-card" type="button" onClick={share}>
            <img className="action-icon" src={assetPath("/assets/recommendations/Rec5.png")} alt="" aria-hidden="true" />
            <b>ชวนเพื่อน<br />มาเสริมดวง</b>
          </button>
          {shareStatus && <p className="share-status" role="status">{shareStatus}</p>}
          {showCounts && (
            <aside className="click-counts" aria-label="ยอดกดทั้งหมด">
              <strong>ยอดกดทั้งหมด</strong>
              {clickCounts ? (
                <>
                  <span>ไปกันต่อ: <b>{clickCounts.challenge}</b> ครั้ง</span>
                  <span>ชวนเพื่อนมาเสริมดวง: <b>{clickCounts.share}</b> ครั้ง</span>
                  <small>นับรวมจากผู้ใช้ทุกคน</small>
                </>
              ) : (
                <span>{countsFailed ? "โหลดยอดไม่สำเร็จ" : "กำลังโหลด..."}</span>
              )}
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
