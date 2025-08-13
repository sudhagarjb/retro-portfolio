"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    let last = 0;

    function raf(time: number) {
      // Cap to ~60fps; skip frames if tab is hidden
      if (document.hidden) {
        rafId = requestAnimationFrame(raf);
        return;
      }
      const delta = time - last;
      if (delta < 14) {
        rafId = requestAnimationFrame(raf);
        return;
      }
      last = time;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return <>{children}</>;
} 