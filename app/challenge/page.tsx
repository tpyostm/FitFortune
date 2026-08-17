import { equipmentRecommendations } from "@/content/fitfortune";
import { PageShell, PrimaryLink, RecommendationGrid, TopBar, VideoPreview } from "@/components/fitfortune/ui";

export default function ChallengePage() {
  return (
    <PageShell className="challenge-page">
      <TopBar backHref="/complete" label="" />
      <div className="page-content challenge-content">
        <header className="challenge-heading">
          <h1>Challenge ต่อไป<br />เพิ่มความแข็งแรงให้ไหล่! <span>✦</span></h1>
          <p>ท่าที่ยากขึ้นอีกนิด แต่เห็นผลชัวร์ 💪</p>
        </header>

        <VideoPreview
          label="ท่า Plank แตะไหล่ สำหรับผู้เริ่มต้น"
          coverSrc="/assets/video/plank-shoulder-cover.png"
          className="challenge-cover"
        />

        <section className="white-panel challenge-video-panel">
          <div className="resource-title"><span>แนะนำอุปกรณ์</span></div>
          <RecommendationGrid items={equipmentRecommendations} className="challenge-recommendation-list" />
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
