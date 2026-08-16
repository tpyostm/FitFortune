"use client";

import { useEffect, useRef, useState } from "react";
import { dailyFortune } from "../data/daily-fortune";
import { Mascot, PageShell, TopBar } from "./fitfortune-ui";

export function ExerciseTimer({ challenge = false }: { challenge?: boolean }) {
  const exercise = challenge ? dailyFortune.challengeExercise : dailyFortune.mainExercise;
  const [timeLeft, setTimeLeft] = useState(exercise.durationSec);
  const [running, setRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [poseFrame, setPoseFrame] = useState(0);
  const completed = useRef(false);
  const progress = ((exercise.durationSec - timeLeft) / exercise.durationSec) * 360;
  const poseSequence = exercise.poses?.length
    ? [exercise.poses[0], exercise.poses[1], exercise.poses[2], exercise.poses[1]]
    : [exercise.mascot];
  const idlePose = exercise.poses?.length ? "/assets/poses/Post1.png" : exercise.mascot;

  useEffect(() => {
    setPoseFrame(0);
    if (!running || !exercise.poses || exercise.poses.length < 3) return;
    const poseTimer = window.setInterval(() => {
      setPoseFrame((current) => (current + 1) % 4);
    }, 700);
    return () => window.clearInterval(poseTimer);
  }, [running, exercise.poses]);

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
      const key = "fitfortune_sessions";
      const previous = JSON.parse(window.localStorage.getItem(key) || "[]");
      previous.push({ mode: challenge ? "challenge" : "main", durationSec: exercise.durationSec, completedAt: new Date().toISOString() });
      window.localStorage.setItem(key, JSON.stringify(previous.slice(-20)));
    } catch {
      // The experience still works when browser storage is unavailable.
    }
    const next = window.setTimeout(() => window.location.assign("/complete"), 850);
    return () => window.clearTimeout(next);
  }, [timeLeft, hasStarted, challenge, exercise.durationSec]);

  function toggleTimer() {
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
              <span>{hasStarted ? running ? "กำลังทำอยู่!" : "พักหายใจก่อนได้" : "เริ่มได้เลย!"}</span>
            </div>
          </div>
          <Mascot src={running ? poseSequence[poseFrame] ?? exercise.mascot : idlePose} alt={`มาสคอตกำลังทำท่า${exercise.name}`} className="timer-mascot" />
        </div>

        <section className="exercise-steps">
          <h2>{challenge ? "ทำ Plank แตะไหล่ (ค่อย ๆ ทำ)" : "ท่าหมุนไหล่ (ทำตามง่ายๆ)"}</h2>
          <div className="step-grid">
            {["วงไปด้านหน้า\n10 ครั้ง", "วงไปด้านหลัง\n10 ครั้ง", "สลับข้าง\nทำครบ 2 เซ็ต"].map((label, index) => (
              <div className="step-card" key={label}>
                <Mascot src={exercise.poses?.[index] ?? exercise.mascot} alt="" className={`step-mascot step-${index + 1}`} />
                <span>{index + 1}. {label.split("\n").map((line) => <span key={line}>{line}</span>)}</span>
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
        {hasStarted && timeLeft > 0 && <p className="timer-status">{running ? "กำลังจับเวลา..." : "พักได้ หายใจลึก ๆ นะ"}</p>}
      </div>
    </PageShell>
  );
}
