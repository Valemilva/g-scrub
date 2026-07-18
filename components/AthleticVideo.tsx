"use client";

import { useEffect, useRef } from "react";

// 33s Athletic Care brand film (silent). Same behavior as the golf
// CommercialVideo: autoplays muted + loops as an ambient brand film, unless
// the visitor prefers reduced motion, in which case it stays paused behind the
// poster with native controls. Dark section with the cyan accent.
export default function AthleticVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      video.controls = true;
    } else {
      video.play().catch(() => {
        video.controls = true;
      });
    }
  }, []);

  return (
    <section
      id="film"
      className="scroll-mt-20 border-t border-white/[0.06] bg-[#0b0b0b] py-[clamp(56px,8vw,104px)]"
    >
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="mx-auto mb-9 max-w-[620px] text-center">
          <p className="m-0 text-[12px] font-extrabold tracking-[0.3em] text-[#4fc7ec] uppercase">
            See It In Action
          </p>
          <h2 className="m-0 mt-3 font-heading text-[clamp(28px,4vw,44px)] leading-[1.05] font-extrabold tracking-[-0.015em] text-white">
            Clean kicks, in seconds.
          </h2>
        </div>

        <div className="overflow-hidden rounded-[20px] border border-[rgba(24,183,230,0.22)] shadow-[0_40px_80px_-34px_rgba(0,0,0,0.7)]">
          <video
            ref={videoRef}
            className="block aspect-video w-full"
            poster="/images/gscrub-athletic-commercial-poster.jpg"
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source
              src="/videos/gscrub-athletic-commercial.webm"
              type="video/webm"
            />
            <source
              src="/videos/gscrub-athletic-commercial.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  );
}
