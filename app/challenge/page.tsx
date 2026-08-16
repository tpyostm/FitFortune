import { dailyFortune } from "../../data/daily-fortune";
import { MaterialList, Mascot, PageShell, PrimaryLink, TopBar, VideoPreview } from "../../components/fitfortune-ui";

export default function ChallengePage() {
  const exercise = dailyFortune.challengeExercise;

  return (
    <PageShell className="challenge-page">
      <TopBar backHref="/complete" label="CHALLENGE" />
      <div className="page-content">
        <header className="challenge-heading">
          <p className="section-kicker">บูสต์ดวงเฉพาะคุณ</p>
          <h1>Challenge ต่อไป!</h1>
          <p>เพิ่มความแข็งแรงอีกนิด<br />แล้วรับพลังดี ๆ ไปทั้งวัน</p>
        </header>

        <div className="challenge-hero">
          <div>
            <span className="level-chip">LEVEL UP</span>
            <h2>{exercise.name}</h2>
            <p>{exercise.instruction}</p>
          </div>
          <Mascot src="/assets/mascot/Mascot6.png" alt="มาสคอตพร้อมทำชาเลนจ์" className="challenge-mascot" />
        </div>

        <section className="white-panel challenge-video-panel">
          <VideoPreview label="ดูท่า Plank แตะไหล่" />
          <div className="panel-title-row compact-row">
            <h3>เตรียมอุปกรณ์</h3>
            <span className="duration-pill">30 วิ</span>
          </div>
          <MaterialList materials={exercise.materials} />
        </section>

        <section className="white-panel safety-card">
          <span aria-hidden="true">♡</span>
          <div><strong>ฟังร่างกายตัวเองนะ</strong><p>หากรู้สึกเจ็บ ให้หยุดพักและเปลี่ยนเป็นท่าที่สบายขึ้นได้เลย</p></div>
        </section>
      </div>
      <div className="bottom-action">
        <PrimaryLink href="/exercise?mode=challenge">เริ่ม Challenge!</PrimaryLink>
      </div>
    </PageShell>
  );
}
