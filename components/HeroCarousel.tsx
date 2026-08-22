"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";

const slides = [
  {
    id: "trusted-healthcare-partner",
    image: "/images/home/hero-care.webp",
    eyebrow: "Trusted healthcare partner",
    title: "Bringing Loving Care To Health Care",
    text: "As a leading supplier of quality and cost-effective pharmaceutical products, we aim to become the most trusted brand.",
  },
  {
    id: "global-pharma-expertise",
    image: "/images/home/hero-lab.webp",
    eyebrow: "15+ years of expertise",
    title: "Best Pharma Exporter in India",
    text: "S V Healthcare has established a milestone that few companies can achieve. We have broken barriers and expanded overseas business in a short span of time since inception.",
  },
  {
    id: "accessible-global-medicine",
    image: "/images/home/hero-global.webp",
    eyebrow: "Accessible worldwide",
    title: "Accessible To Everyone Around The Globe",
    text: "Our mission is to make the best medicine affordable and accessible to everyone around the globe.",
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(() => new Set([0]));

  useEffect(() => {
    let intervalId = 0;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(
        () => setActive((current) => (current + 1) % slides.length),
        6500,
      );
    }, 12000);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    setLoaded((current) => {
      if (current.has(active)) return current;
      const next = new Set(current);
      next.add(active);
      return next;
    });
  }, [active]);

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Highlights">
      {slides.map((slide, index) => (
        <div
          className={`hero-slide ${index === active ? "is-active" : ""}`}
          key={slide.id}
          aria-hidden={index !== active}
        >
          {loaded.has(index) ? (
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              sizes="100vw"
              className="hero-image"
            />
          ) : null}
        </div>
      ))}
      <div className="hero-overlay" />

      <div className="container hero-content">
        <div className="hero-copy">
          <div className="eyebrow light">
            <span />
            {slides[active].eyebrow}
          </div>
          <h1>{slides[active].title}</h1>
          <p>{slides[active].text}</p>
          <div className="hero-actions">
            <ButtonLink className="max-sm:w-full" href="#about">
              Discover our story <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink
              className="max-sm:w-full"
              variant="ghost"
              href="#products"
            >
              Explore products
            </ButtonLink>
          </div>
        </div>

        <div className="hero-proof">
          <CheckCircle2 />
          <div>
            <strong>Globally compliant</strong>
            <span>WHO GMP · PIC/S · EU GMP · US FDA</span>
          </div>
        </div>
      </div>

      <div className="container hero-controls">
        <div className="hero-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={index === active ? "active" : ""}
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === active}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
