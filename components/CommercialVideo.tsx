"use client";

import { useEffect, useRef } from "react";
import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";

// 33s brand commercial (silent). Autoplays muted + loops as an ambient
// brand film — unless the visitor prefers reduced motion, in which case it
// stays paused behind the poster with native controls so they can play it
// on their own terms. The video renders paused on the server; this effect
// decides play-vs-controls on the client based on the motion preference.
export default function CommercialVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      video.controls = true;
    } else {
      video.play().catch(() => {
        // Autoplay can be blocked (e.g. data-saver); fall back to controls.
        video.controls = true;
      });
    }
  }, []);

  return (
    <section
      id="commercial"
      className="bg-green-deep py-[clamp(56px,8vw,104px)] text-white"
    >
      <div className="mx-auto max-w-[1100px] px-6">
        <Reveal className="mx-auto mb-9 max-w-[620px] text-center">
          <SectionEyebrow>See It In Action</SectionEyebrow>
          <h2 className="m-0 font-heading text-[clamp(28px,4vw,44px)] leading-[1.05] font-extrabold tracking-[-0.015em] text-white">
            Clean gear, in 33 seconds.
          </h2>
        </Reveal>

        <Reveal>
          <div className="overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.14)] shadow-[0_40px_80px_-34px_rgba(0,0,0,0.7)]">
            <video
              ref={videoRef}
              className="block aspect-video w-full"
              poster="/images/gscrub-commercial-poster.jpg"
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/videos/gscrub-commercial.webm" type="video/webm" />
              <source src="/videos/gscrub-commercial.mp4" type="video/mp4" />
            </video>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
