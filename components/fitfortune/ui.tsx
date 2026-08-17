import type { ReactNode } from "react";

type ClassNameProp = { className?: string };

function classNames(...values: (string | undefined)[]) {
  return values.filter(Boolean).join(" ");
}

export function PageShell({ children, className }: { children: ReactNode } & ClassNameProp) {
  return (
    <main className={classNames("app-stage", className)}>
      <section className={classNames("phone-canvas inner-canvas", className)}>
        <img className="effect-sparkle-sheet" src="/assets/effects/Effect2.png" alt="" aria-hidden="true" />
        <MagicDust />
        {children}
      </section>
    </main>
  );
}

function MagicDust() {
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
      <span className="top-bar-spacer" aria-hidden="true" />
    </nav>
  );
}

export function PrimaryLink({ href, children, className }: { href: string; children: ReactNode } & ClassNameProp) {
  return (
    <a className={classNames("primary-button", className)} href={href}>
      {children}
      <span aria-hidden="true">›</span>
    </a>
  );
}

export function Mascot({ src, alt, className }: { src: string; alt: string } & ClassNameProp) {
  return <img className={classNames("mascot", className)} src={src} alt={alt} />;
}

export function RecommendationGrid({
  items,
  className,
}: {
  items: readonly { label: string; src: string }[];
} & ClassNameProp) {
  return (
    <div className={classNames("recommendation-list", className)}>
      {items.map((item) => (
        <div className="recommendation-item" key={item.label}>
          <img src={item.src} alt="" aria-hidden="true" />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function VideoPreview({
  label,
  coverSrc,
  className,
}: {
  label: string;
  coverSrc: string;
} & ClassNameProp) {
  return (
    <div className={classNames("video-preview", className)} role="img" aria-label={`${label} (ภาพปกคลิป)`}>
      <img className="video-cover" src={coverSrc} alt="" aria-hidden="true" />
    </div>
  );
}
