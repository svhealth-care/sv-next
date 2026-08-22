"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  once?: boolean;
  amount?: number;
};

function createVariants(
  y: number,
  scale: number,
  reduce: boolean | null,
): Variants {
  return {
    hidden: reduce
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y, scale },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 48,
  scale = 0.97,
  once = true,
  amount = 0.18,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      variants={createVariants(y, scale, reduce)}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
