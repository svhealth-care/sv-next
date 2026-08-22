"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AppLink } from "@/components/ui/AppLink";
import type { BlogPost } from "@/lib/blog-posts";

type BlogPostGridProps = {
  posts: BlogPost[];
};

/** Sequential delay queue so cards animate one-by-one. */
let nextDelay = 0;
let resetTimer: ReturnType<typeof setTimeout> | null = null;
const DELAY_STEP = 0.14;
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

export function BlogPostGrid({ posts }: BlogPostGridProps) {
  return (
    <div className="blog-listing-grid">
      {posts.map((post) => (
        <BlogCardReveal key={post.id}>
          <BlogListingCard post={post} />
        </BlogCardReveal>
      ))}
    </div>
  );
}

function BlogCardReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.28 });
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
      initial={reduce ? false : { opacity: 0, y: 44, scale: 0.98 }}
      animate={
        ready
          ? { opacity: 1, y: 0, scale: 1 }
          : reduce
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 44, scale: 0.98 }
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function BlogListingCard({ post }: { post: BlogPost }) {
  return (
    <AppLink className="blog-listing-card" href={post.href}>
      <span className="blog-listing-media">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 760px) 92vw, (max-width: 1100px) 45vw, 31vw"
        />
        <span className="blog-listing-date">{post.date}</span>
      </span>
      <span className="blog-listing-body">
        <span className="blog-listing-meta">
          <span>{post.category}</span>
          <span aria-hidden="true">·</span>
          <span>S V Healthcare</span>
        </span>
        <span className="blog-listing-title">{post.title}</span>
        <span className="blog-listing-excerpt">{post.excerpt}</span>
        <span className="blog-listing-action holographic-btn">
          <span className="holographic-btn__label">
            Read article
            <ArrowRight size={14} />
          </span>
        </span>
      </span>
    </AppLink>
  );
}
