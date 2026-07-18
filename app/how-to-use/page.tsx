import type { Metadata } from "next";
import Image from "next/image";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "How to Use G-SCRUB | Golf Shoe Cleaner Guide",
  description:
    "A simple foam, scrub, and wipe routine to clean your golf shoes with the G-SCRUB Shoe Cleaner Kit — plus care tips and safety notes.",
};

export default function HowToUsePage() {
  return (
    <PageShell
      eyebrow="Product Guide"
      title="How to use G-SCRUB"
      intro="The G-SCRUB Shoe Cleaner Kit is built around a simple routine: foam, scrub, wipe, and get back to the game. Here's how to get the best results."
    >
      <h2>The routine</h2>

      <h3>1. Foam</h3>
      <Image
        src="/images/gscrub-howto-foam.png"
        alt="Applying G-SCRUB foaming cleaner to a dirty golf shoe"
        width={1448}
        height={1086}
        className="!mt-4 !mb-5 block w-full rounded-[16px]"
      />
      <p>
        Apply the foaming cleaner directly to the dirty area of the golf shoe.
        There&rsquo;s no need to soak the shoe — a light, even layer of foam is
        enough to start lifting dirt, grass, and course debris.
      </p>

      <h3>2. Scrub</h3>
      <Image
        src="/images/gscrub-howto-scrub.png"
        alt="Scrubbing a golf shoe with the G-SCRUB brush"
        width={1448}
        height={1086}
        className="!mt-4 !mb-5 block w-full rounded-[16px]"
      />
      <p>
        Use the included brush to gently work the foam into soles, edges, and
        textured areas. Short back-and-forth strokes help loosen caked-on mud
        and sand without being harsh on the material.
      </p>

      <h3>3. Wipe</h3>
      <Image
        src="/images/gscrub-howto-wipe.png"
        alt="Wiping a golf shoe clean with the G-SCRUB microfiber towel"
        width={1448}
        height={1086}
        className="!mt-4 !mb-5 block w-full rounded-[16px]"
      />
      <p>
        Finish with the microfiber towel to wipe away the loosened dirt and
        foam for a clean look. Then let your shoes air dry.
      </p>

      <h3>4. Play</h3>
      <p>
        Keep the kit in your golf bag or car so your gear stays course-ready for
        the next round.
      </p>

      <h2>Tips &amp; good to know</h2>
      <ul>
        <li>
          <strong>A little goes a long way.</strong> One bottle typically lasts
          around 15&ndash;25 full cleanings, depending on how much you use per
          session.
        </li>
        <li>
          <strong>Safe on common shoe materials.</strong> The foaming formula is
          made for synthetic, mesh, and rubber commonly used in golf shoes.
        </li>
        <li>
          <strong>Bag-friendly.</strong> The kit is compact and built to travel,
          so quick post-round cleanups are easy.
        </li>
      </ul>

      <h2>Safety note</h2>
      <p>
        Always test on a small, hidden area first and follow the care
        instructions for your specific shoe material. G-SCRUB is designed for
        routine cleaning and gear care — not for altering or repairing footwear.
      </p>
    </PageShell>
  );
}
