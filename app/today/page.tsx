import { dailyFortune, getThaiDayLabel } from "../../data/daily-fortune";
import { MaterialList, Mascot, PageShell, PrimaryLink, TopBar, VideoPreview } from "../../components/fitfortune-ui";

export default function TodayPage() {
  const dayLabel = getThaiDayLabel();

  return (
    <PageShell className="today-page">
      <TopBar label="✦ ดวงสุขภาพวันนี้ ✦" />
      <div className="page-content today-content">
        <header className="fortune-heading">
          <p className="day-chip">{dayLabel}</p>
          <h1>ราศีกุมภ์กับดาวเสาร์</h1>
          <p>ดวงจะหนักที่</p>
          <strong className="fortune-word">ไหล่</strong>
        </header>

        <section className="fortune-reveal">
          <span className="fortune-accent accent-left" aria-hidden="true">⌁</span>
          <Mascot src="/assets/mascot/Mascot3.png" alt="มาสคอตกำลังหมุนไหล่" className="fortune-mascot mascot-gold" />
          <span className="fortune-accent accent-right" aria-hidden="true">⌁</span>
        </section>

        <section className="white-panel fortune-task-card">
          <strong>หมุนไหล่ข้างละ 10 ครั้ง<br />พร้อมแชร์ให้เพื่อน 5 คน</strong>
        </section>
        <p className="fortune-warning">แชร์ไม่ครบ ระวังไหล่ท่านอาจจะเคล็ด!</p>

        <section className="today-resources">
          <div className="resource-title"><span>แนะนำอุปกรณ์</span></div>
          <MaterialList materials={dailyFortune.mainExercise.materials.slice(0, 2)} />
          <div className="resource-title"><span>คลิปแนะนำ (สำหรับทุกกลุ่ม)</span></div>
          <VideoPreview label="ท่าหมุนไหล่" />
        </section>
      </div>
      <div className="bottom-action">
        <PrimaryLink href="/exercise?mode=main">เริ่มเลย!</PrimaryLink>
      </div>
    </PageShell>
  );
}
