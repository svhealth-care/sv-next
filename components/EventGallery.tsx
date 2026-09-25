"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import type { EventImage } from "@/lib/events";

type EventGalleryProps = {
  images: EventImage[];
  title: string;
};

export function EventGallery({ images, title }: EventGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, showNext, showPrev]);

  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.map((image, index) => {
          const portrait = image.height >= image.width;
          return (
            <div key={image.src} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-surface text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                aria-label={`Open photo ${index + 1} of ${images.length}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 640px) 92vw, (max-width: 1100px) 45vw, 30vw"
                  className={cn(
                    "h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                    portrait ? "min-h-70" : "min-h-45",
                  )}
                />
                <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy/35 via-transparent to-transparent opacity-0 transition group-hover:opacity-100 motion-reduce:transition-none" />
              </button>
            </div>
          );
        })}
      </div>

      {mounted && activeImage
        ? createPortal(
            <div
              className="fixed inset-0 z-200 flex items-center justify-center bg-ink/85 p-3 backdrop-blur-sm sm:p-6"
              role="presentation"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl flex-col items-center sm:max-h-[calc(100dvh-3rem)]"
                onMouseDown={(event) => event.stopPropagation()}
              >
                <h2 id={titleId} className="sr-only">
                  {title} photo gallery
                </h2>

                <button
                  type="button"
                  onClick={close}
                  className="absolute right-0 top-0 z-50 grid size-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label="Close gallery"
                >
                  <X size={18} aria-hidden="true" />
                </button>

                <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
                  <button
                    type="button"
                    onClick={showPrev}
                    className="absolute left-0 z-40 grid size-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-2"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={20} aria-hidden="true" />
                  </button>

                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    width={activeImage.width}
                    height={activeImage.height}
                    sizes="92vw"
                    className="max-h-[min(78dvh,900px)] w-auto max-w-full rounded-2xl object-contain shadow-card"
                    priority
                  />

                  <button
                    type="button"
                    onClick={showNext}
                    className="absolute right-0 z-40 grid size-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-2"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={20} aria-hidden="true" />
                  </button>
                </div>

                <p className="mt-4 text-center text-sm font-semibold text-white/80">
                  {(activeIndex ?? 0) + 1} / {images.length}
                </p>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
