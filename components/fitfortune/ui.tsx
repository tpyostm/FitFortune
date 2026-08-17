import type { ReactNode } from "react";
import { appHref, assetPath } from "./paths";

type ClassNameProp = { className?: string };

function classNames(...values: (string | undefined)[]) {
  return values.filter(Boolean).join(" ");
}

export function PageShell({ children, className }: { children: ReactNode } & ClassNameProp) {
  return (
    <main className={classNames("app-stage", className)}>
      <section className={classNames("phone-canvas inner-canvas", className)}>
        <img className="effect-sparkle-sheet" src={assetPath("/assets/effects/Effect2.png")} alt="" aria-hidden="true" />
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
      <a className="back-button" href={appHref(backHref)} aria-label="ย้อนกลับ">
        <img src={assetPath("/assets/ui/back-button.png")} alt="" aria-hidden="true" />
      </a>
      <span className="top-label">{label}</span>
      <span className="top-bar-spacer" aria-hidden="true" />
    </nav>
  );
}

export function PrimaryLink({ href, children, className }: { href: string; children: ReactNode } & ClassNameProp) {
  return (
    <a className={classNames("primary-button", className)} href={appHref(href)}>
      {children}
      <span aria-hidden="true">›</span>
    </a>
  );
}

export function Mascot({ src, alt, className }: { src: string; alt: string } & ClassNameProp) {
  return <img className={classNames("mascot", className)} src={assetPath(src)} alt={alt} />;
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
          <img src={assetPath(item.src)} alt="" aria-hidden="true" />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

// Lives in its own module because it holds modal state, and re-exported here
// so the pages keep importing every shared piece from one place.
export { VideoPreview } from "./video-preview";
