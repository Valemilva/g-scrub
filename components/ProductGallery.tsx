"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

// Store-style gallery: large main image + a thumbnail strip you click to
// switch. Falls back gracefully to a single image if only one is provided.
export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div>
      <div className="overflow-hidden rounded-[18px] border border-[rgba(17,17,17,0.09)] bg-white">
        <Image
          key={main}
          src={main}
          alt={alt}
          width={1000}
          height={1000}
          priority
          className="block aspect-square w-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2.5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={`h-16 w-16 overflow-hidden rounded-[11px] border-2 transition-colors ${
                i === active
                  ? "border-green-primary"
                  : "border-[rgba(17,17,17,0.12)] hover:border-[rgba(17,17,17,0.3)]"
              }`}
            >
              <Image
                src={src}
                alt=""
                width={120}
                height={120}
                className="block h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
