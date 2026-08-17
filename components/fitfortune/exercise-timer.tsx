"use client";

import { useEffect, useRef, useState } from "react";
import { exercises, poseFrameIntervalMs } from "@/content/fitfortune";
import { Mascot, PageShell, TopBar } from "./ui";
import { useSearchFlag } from "./use-search-flag";

const sessionStorageKey = "fitfortune_sessions";

export function ExerciseTimer({ challenge: challengeProp = false }: { challenge?: boolean }) {
  const challenge = useSearchFlag("mode", "challenge", challengeProp);
  // Every piece of timer state is seeded from the exercise, so re-key rather
  // than resync when a static export resolves the mode after hydration.
  return <Timer key={challenge ? "challenge" : "main"} challenge={challenge} />;
}

function Timer({ challenge }: { challenge: boolean }) {
  const mode = challenge ? "challenge" : "main";
  const exercise = exercises[mode];
  const [timeLeft, setTimeLeft] = useState<number>(exercise.durationSec);
  const [running, setRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [poseFrame, setPoseFrame] = useState(0);
  const completed = useRef(false);

  const progress = ((exercise.durationSec - timeLeft) / exercise.durationSec) * 360;
  const currentPose = running
    ? exercise.activePoses[poseFrame] ?? exercise.activePoses[0]
    : exercise.idlePose;
  const timerMessage = !hasStarted
    ? "เริ่มได้เลย!"
    : running
      ? "กำลังทำอยู่!"
      : "พักหายใจก่อนได้";

  useEffect(() => {
    if (!running || exercise.activePoses.length < 2) return;
    const poseTimer = window.setInterval(() => {
      setPoseFrame((current) => (current + 1) % exercise.activePoses.length);
    }, poseFrameIntervalMs);
    return () => window.clearInterval(poseTimer);
  }, [running, exercise.activePoses]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setTimeLeft((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (timeLeft !== 0 || !hasStarted || completed.current) return;
    completed.current = true;
    setRunning(false);

    try {
      const stored = JSON.parse(window.localStorage.getItem(sessionStorageKey) || "[]");
      const previous = Array.isArray(stored) ? stored : [];
      previous.push({ mode, durationSec: exercise.durationSec, completedAt: new Date().toISOString() });
      window.localStorage.setItem(sessionStorageKey, JSON.stringify(previous.slice(-20)));
    } catch {
      // The experience still works when browser storage is unavailable.
    }

    const next = window.setTimeout(() => window.location.assign("/complete"), 850);
    return () => window.clearTimeout(next);
  }, [timeLeft, hasStarted, mode, exercise.durationSec]);

  function toggleTimer() {
    if (!running) setPoseFrame(0);
    setHasStarted(true);
    setRunning((value) => !value);
  }

  return (
    <PageShell className="timer-page">
      <TopBar backHref={challenge ? "/challenge" : "/today"} label={challenge ? "✦ Challenge เริ่มแล้ว! ✦" : "✦ เริ่มออกกำลังกาย! ✦"} />
      <div className="page-content timer-content">
        <div className="timer-visual-wrap">
          <div className="timer-ring" style={{ "--timer-progress": `${progress}deg` } as React.CSSProperties}>
            <div className="timer-inner">
              <strong>{String(timeLeft).padStart(2, "0")}</strong>
              <span>{timerMessage}</span>
            </div>
          </div>
          <Mascot src={currentPose} alt={`มาสคอตกำลังทำท่า${exercise.name}`} className="timer-mascot" />
        </div>

        <section className="exercise-steps">
          <h2>{exercise.stepHeading}</h2>
          <div className="step-grid">
            {exercise.steps.map((step, index) => (
              <div className="step-card" key={step.lines.join("-")}>
                <Mascot src={step.pose} alt="" className={`step-mascot step-${index + 1}`} />
                <span>
                  {index + 1}. {step.lines.map((line) => <span key={line}>{line}</span>)}
                </span>
              </div>
            ))}
          </div>
        </section>
        <div className="form-cue">
          <span aria-hidden="true">✦</span>
          <p>{exercise.instruction}</p>
        </div>
      </div>

      <div className="bottom-action timer-actions">
        <button className="primary-button timer-button" type="button" onClick={toggleTimer} disabled={timeLeft === 0}>
          <span aria-hidden="true">{running ? "Ⅱ" : "▶"}</span>
          {timeLeft === 0 ? "สำเร็จแล้ว!" : running ? "หยุดชั่วคราว" : hasStarted ? "ทำต่อ" : "เริ่มจับเวลา"}
        </button>
        {hasStarted && timeLeft > 0 && <p className="timer-status" role="status">{running ? "กำลังจับเวลา..." : "พักได้ หายใจลึก ๆ นะ"}</p>}
      </div>
    </PageShell>
  );
}
