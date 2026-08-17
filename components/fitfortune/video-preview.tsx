"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { assetPath } from "./paths";

type VideoPreviewProps = {
  label: string;
  coverSrc: string;
  /** YouTube id. Without one the cover stays a plain image, as it was. */
  youtubeId?: string;
  className?: string;
};

export function VideoPreview({ label, coverSrc, youtubeId, className }: VideoPreviewProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const trigger = triggerRef.current;
    body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open, close]);

  const cover = <img className="video-cover" src={assetPath(coverSrc)} alt="" aria-hidden="true" />;
  const classes = ["video-preview", className].filter(Boolean).join(" ");

  if (!youtubeId) {
    return (
      <div className={classes} role="img" aria-label={`${label} (ภาพปกคลิป)`}>
        {cover}
      </div>
    );
  }

  return (
    <>
      <button
        className={classes}
        type="button"
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-label={`เล่นคลิป ${label}`}
        aria-haspopup="dialog"
      >
        {cover}
      </button>

      {/* Portalled to the body because the canvas is `zoom`ed on wide screens,
          and a fixed overlay inside a zoomed subtree is scaled with it instead
          of covering the viewport. */}
      {open
        && createPortal(
          <div className="video-modal" role="dialog" aria-modal="true" aria-label={label}>
            {/* A real button rather than a click handler on the overlay, so
                closing by tapping outside costs no keyboard affordance. Hidden
                from assistive tech because the ✕ below already does this. */}
            <button
              className="video-modal-backdrop"
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={close}
            />
            <div className="video-modal-frame">
              <button className="video-modal-close" type="button" ref={closeRef} onClick={close} aria-label="ปิดคลิป">
                ✕
              </button>
              {/* Mounted only while open so closing actually stops playback. */}
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1`}
                title={label}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
