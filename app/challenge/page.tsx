import { dailyFortune } from "../../data/daily-fortune";
import { MaterialList, Mascot, PageShell, PrimaryLink, TopBar } from "../../components/fitfortune-ui";

export default function ChallengePage() {
  const exercise = dailyFortune.challengeExercise;

  return (
    <PageShell className="challenge-page">
      <TopBar backHref="/complete" label="" />
      <div className="page-content challenge-content">
        <header className="challenge-heading">
          <h1>Challenge ต่อไป<br />เพิ่มความแข็งแรงให้ไหล่! <span>✦</span></h1>
          <p>ท่าที่ยากขึ้นอีกนิด แต่เห็นผลชัวร์ 💪</p>
        </header>

        <div className="challenge-hero">
          <div>
            <h2>ท่า {exercise.name}</h2>
            <p>(สำหรับผู้เริ่มต้น)</p>
            <span className="video-time">00:30</span>
            <span className="challenge-play" aria-hidden="true">▶</span>
          </div>
          <Mascot src="/assets/mascot/Mascot6.png" alt="มาสคอตพร้อมทำชาเลนจ์" className="challenge-mascot mascot-gold" />
        </div>

        <section className="white-panel challenge-video-panel">
          <div className="resource-title"><span>แนะนำอุปกรณ์</span></div>
          <MaterialList materials={exercise.materials} />
        </section>

        <section className="white-panel benefits-card">
          <div className="resource-title"><span>ประโยชน์</span></div>
          <ul>
            <li>เสริมความแข็งแรงกล้ามเนื้อไหล่</li>
            <li>ช่วยลดอาการปวดและตึง</li>
            <li>เพิ่มบุคลิกภาพและความมั่นใจ</li>
          </ul>
        </section>
      </div>
      <div className="bottom-action">
        <PrimaryLink href="/exercise?mode=challenge">เริ่ม Challenge!</PrimaryLink>
        <p className="after-challenge">↑ เมื่อพร้อมแล้ว ไปลุยกันเลย!</p>
      </div>
    </PageShell>
  );
}
