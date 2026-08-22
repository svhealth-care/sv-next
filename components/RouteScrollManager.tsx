"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * Instantly land at the top on every route change.
 * Avoids smooth bottom→top scrolling that falsely triggers in-view animations.
 */
export function RouteScrollManager() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const previousBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        html.style.scrollBehavior = previousBehavior;
        return;
      }
    }

    window.scrollTo(0, 0);
    html.style.scrollBehavior = previousBehavior;
  }, [pathname]);

  return null;
}
