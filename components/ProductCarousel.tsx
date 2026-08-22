"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { AppLink } from "@/components/ui/AppLink";

const products = [
  {
    name: "Melatonin Tablet",
    category: "Sleep support",
    image: "/images/home/melatonin.webp",
    href: "/product/melatonin-tablet",
  },
  {
    name: "Vitamin C Tablet",
    category: "Daily wellness",
    image: "/images/home/vitamin-c.webp",
    href: "/product/vitamin-c-tablet",
  },
  {
    name: "Milk Thistle Extract Tablet",
    category: "Liver support",
    image: "/images/home/milk-thistle.webp",
    href: "/product/milk-thistle-extract-tablet",
  },
  {
    name: "Vitamin E 400 IU",
    category: "Antioxidant",
    image: "/images/home/vitamin-e.webp",
    href: "/product/vitamin-e-400-iu",
  },
  {
    name: "Fish Oil Softgel Capsule",
    category: "Omega nutrition",
    image: "/images/home/fish-oil.webp",
    href: "/product/fish-oil-softgel-capsule",
  },
  {
    name: "Calcium + Magnesium + Zinc Tablet",
    category: "Bone health",
    image: "/images/home/calcium.webp",
    href: "/product/calcium-magnesium-zinc-tablet",
  },
];

export function ProductCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: number) => {
    trackRef.current?.scrollBy({ left: direction * 330, behavior: "smooth" });
  };

  return (
    <div className="product-carousel">
      <div className="carousel-controls">
        <button type="button" onClick={() => scroll(-1)} aria-label="Previous products">
          <ArrowLeft />
        </button>
        <button type="button" onClick={() => scroll(1)} aria-label="Next products">
          <ArrowRight />
        </button>
      </div>
      <div className="product-track" ref={trackRef}>
        {products.map((product) => (
          <article className="product-card" key={product.href}>
            <AppLink href={product.href} className="product-card-link">
              <div className="product-image">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 78vw, 290px"
                />
              </div>
              <p>{product.category}</p>
              <h3>{product.name}</h3>
            </AppLink>
          </article>
        ))}
      </div>
    </div>
  );
}
