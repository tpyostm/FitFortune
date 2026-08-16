import Link from "next/link";
import type { ReactNode } from "react";

export function PageShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <main className="app-stage">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <section className={`phone-canvas inner-canvas ${className}`}>
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
      <Link className="back-button" href={backHref} aria-label="ย้อนกลับ">‹</Link>
      <span>{label}</span>
      <span className="top-bar-spacer" />
    </nav>
  );
}

export function PrimaryLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <Link className={`primary-button ${className}`} href={href}>{children}<span aria-hidden="true">›</span></Link>;
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

export function VideoPreview({ label = "คลิปตัวอย่าง" }: { label?: string }) {
  return (
    <div className="video-preview" role="img" aria-label={`${label} (ภาพตัวอย่าง)`}>
      <span className="video-orbit" />
      <span className="play-button" aria-hidden="true">▶</span>
      <span className="video-label">{label}</span>
    </div>
  );
}
