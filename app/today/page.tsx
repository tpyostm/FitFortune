import { dailyFortune, getThaiDayLabel } from "../../data/daily-fortune";
import { MaterialList, Mascot, PageShell, PrimaryLink, TopBar, VideoPreview } from "../../components/fitfortune-ui";

export default function TodayPage() {
  const dayLabel = getThaiDayLabel();

  return (
    <PageShell className="today-page">
      <TopBar />
      <div className="page-content">
        <header className="fortune-heading">
          <p className="day-chip">☀ วันนี้{dayLabel}</p>
          <p className="section-kicker">ผลทำนายของคุณ</p>
          <h1>ดวงสุขภาพวันนี้</h1>
        </header>

        <section className="fortune-reveal">
          <div className="fortune-rays" aria-hidden="true" />
          <Mascot src="/assets/mascot/Mascot2.png" alt="มาสคอตกำลังคิดคำทำนาย" className="fortune-mascot" />
          <div className="fortune-bubble">
            <span>ดวงบอกว่า...</span>
            <strong>พักไหล่<br />แล้วไปต่อ!</strong>
          </div>
        </section>

        <section className="white-panel fortune-copy-card">
          <div className="focus-badge">โฟกัสวันนี้ · {dailyFortune.healthFocusArea}</div>
          <h2>{dailyFortune.fortuneTitle}</h2>
          <p>{dailyFortune.fortuneBody}</p>
          <div className="tiny-fortune">✦ {dailyFortune.shareWarningText}</div>
        </section>

        <section className="white-panel exercise-info-panel">
          <div className="panel-title-row">
            <div>
              <span className="section-kicker">ภารกิจเรียกพลัง</span>
              <h2>{dailyFortune.mainExercise.name}</h2>
            </div>
            <span className="duration-pill">30 วิ</span>
          </div>
          <VideoPreview />
          <h3>อุปกรณ์ที่ใช้</h3>
          <MaterialList materials={dailyFortune.mainExercise.materials} />
        </section>
      </div>
      <div className="bottom-action">
        <PrimaryLink href="/exercise?mode=main">เริ่มเลย!</PrimaryLink>
      </div>
    </PageShell>
  );
}
