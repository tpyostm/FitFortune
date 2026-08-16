import { Mascot, PageShell, PrimaryLink, TopBar, VideoPreview } from "../../components/fitfortune-ui";

export default function TodayPage() {
  const recommendations = [
    { label: "ร่างกาย", src: "/assets/recommendations/Rec1.png" },
    { label: "หัวใจ", src: "/assets/recommendations/Rec2.png" },
    { label: "วิญญาณ", src: "/assets/recommendations/Rec3.png" },
  ];

  return (
    <PageShell className="today-page">
      <TopBar label="✦ ดวงสุขภาพวันนี้ ✦" />
      <div className="page-content today-content">
        <header className="fortune-heading">
          <p className="day-chip">วันเสาร์</p>
          <h1>ราหูโคจรทับดาวเสาร์</h1>
          <p>ดวงจะหนักที่</p>
          <strong className="fortune-word">“ไหล่”</strong>
        </header>

        <section className="fortune-reveal">
          <span className="fortune-accent accent-left" aria-hidden="true">⌁</span>
          <Mascot src="/assets/poses/Post6.png" alt="มาสคอตกำลังปวดไหล่" className="fortune-mascot" />
          <span className="fortune-accent accent-right" aria-hidden="true">⌁</span>
        </section>

        <section className="white-panel fortune-task-card">
          <strong>หมุนไหล่ข้างละ 10 ครั้ง<br /><span className="fortune-remedy">“เพื่อแก้เคล็ด”</span></strong>
        </section>
        <p className="fortune-warning">แชร์ไม่ครบ ระวังไหล่ท่านอาจจะเคล็ด!</p>

        <section className="today-resources">
          <div className="resource-title"><span>คำแนะนำ 3 ด้าน</span></div>
          <div className="recommendation-list">
            {recommendations.map((item) => (
              <div className="recommendation-item" key={item.label}>
                <img src={item.src} alt="" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="resource-title"><span>คลิปแนะนำ (สำหรับทุกกลุ่ม)</span></div>
          <VideoPreview label="หมุนไหล่คลายปวด ดูคลิป (30 วินาที)" coverSrc="/assets/video/shoulder-clip-cover.png" />
        </section>
      </div>
      <div className="bottom-action">
        <PrimaryLink href="/exercise?mode=main">เริ่มเลย!</PrimaryLink>
      </div>
    </PageShell>
  );
}
