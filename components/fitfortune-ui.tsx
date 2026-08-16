import type { ReactNode } from "react";

export function PageShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <main className="app-stage">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <section className={`phone-canvas inner-canvas ${className}`}>
        <img className="effect-sparkle-sheet" src="/assets/effects/Effect2.png" alt="" aria-hidden="true" />
        <MagicDust />
        {children}
      </section>
    </main>
  );
}

export function MagicDust() {
  return (
    <div className="magic-dust" aria-hidden="true">
      <i>✦</i><i>✧</i><i>•</i><i>✦</i><i>·</i>
    </div>
  );
}

export function TopBar({ backHref = "/", label = "FITFORTUNE" }: { backHref?: string; label?: string }) {
  return (
    <nav className="top-bar" aria-label="เมนูหน้า">
      <a className="back-button" href={backHref} aria-label="ย้อนกลับ">
        <img src="/assets/ui/back-button.png" alt="" aria-hidden="true" />
      </a>
      <span className="top-label">{label}</span>
      <span className="top-bar-spacer" />
    </nav>
  );
}

export function PrimaryLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <a className={`primary-button ${className}`} href={href}>{children}<span aria-hidden="true">›</span></a>;
}

export function Mascot({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <img className={`mascot ${className}`} src={src} alt={alt} />;
}

export function MaterialList({ materials }: { materials: { name: string; icon: string }[] }) {
  return (
    <div className="material-list">
      {materials.map((item) => (
        <div className="material-item" key={item.name}>
          <span className="material-icon" aria-hidden="true">{item.icon}</span>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export function VideoPreview({
  label = "คลิปตัวอย่าง",
  description = "หมุนไหล่คลายปวด ดูคลิป (1:30 นาที)",
  mascotSrc = "/assets/poses/Post2.png",
  coverSrc,
  className = "",
}: {
  label?: string;
  description?: string;
  mascotSrc?: string;
  coverSrc?: string;
  className?: string;
}) {
  if (coverSrc) {
    return (
      <div className={`video-preview has-cover ${className}`} role="img" aria-label={`${label} (ภาพปกคลิป)`}>
        <img className="video-cover" src={coverSrc} alt="" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={`video-preview ${className}`} role="img" aria-label={`${label} (ภาพตัวอย่าง)`}>
      <img className="video-mascot" src={mascotSrc} alt="" />
      <span className="play-button" aria-hidden="true">▶</span>
      <span className="video-copy"><b>{label}</b>{description && <small>{description}</small>}</span>
    </div>
  );
}
