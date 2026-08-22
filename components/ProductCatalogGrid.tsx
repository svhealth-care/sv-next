"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { Product } from "@/lib/products";

type ProductCatalogGridProps = {
  products: Product[];
  heading?: string;
};

/** Sequential delay queue so cards animate 1-by-1, not a whole row at once. */
let nextDelay = 0;
let resetTimer: ReturnType<typeof setTimeout> | null = null;
const DELAY_STEP = 0.16;
const RESET_MS = 450;

function takeSequentialDelay() {
  if (resetTimer) clearTimeout(resetTimer);
  const delay = nextDelay;
  nextDelay += DELAY_STEP;
  resetTimer = setTimeout(() => {
    nextDelay = 0;
    resetTimer = null;
  }, RESET_MS);
  return delay;
}

export function ProductCatalogGrid({
  products,
  heading = "Product range",
}: ProductCatalogGridProps) {
  return (
    <section className="section product-catalog-section" id="catalog">
      <div className="container">
        <Reveal className="catalog-toolbar" y={36}>
          <div>
            <div className="eyebrow">
              <span />
              Product catalog
            </div>
            <h2 className="catalog-toolbar-title">{heading}</h2>
          </div>
          <p className="product-catalog-count">
            {`Showing ${products.length} products`}
          </p>
        </Reveal>

        <div className="product-grid">
          {products.map((product) => (
            <CatalogCardReveal key={product.slug}>
              <CatalogCard product={product} />
            </CatalogCardReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CatalogCardReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const [delay, setDelay] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!inView || ready) return;
    setDelay(reduce ? 0 : takeSequentialDelay());
    setReady(true);
  }, [inView, ready, reduce]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 42, scale: 0.98 }}
      animate={
        ready
          ? { opacity: 1, y: 0, scale: 1 }
          : reduce
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 42, scale: 0.98 }
      }
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function CatalogCard({ product }: { product: Product }) {
  return (
    <Link className="catalog-card" href={`/product/${product.slug}`}>
      <span className="catalog-card-media">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 760px) 90vw, (max-width: 1100px) 45vw, 23vw"
        />
      </span>
      <span className="catalog-card-body">
        <span className="catalog-card-form">{product.form}</span>
        <span className="catalog-card-title">{product.name}</span>
        <span className="catalog-card-action holographic-btn">
          <span className="holographic-btn__label">
            View product
            <ArrowRight size={14} />
          </span>
        </span>
      </span>
    </Link>
  );
}
