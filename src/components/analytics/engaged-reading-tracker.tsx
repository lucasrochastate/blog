"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

import { ENGAGED_READING } from "@/lib/constants";

/**
 * Métrica norte: leitura engajada.
 * Dispara um evento quando o leitor permanece tempo mínimo E rola o suficiente.
 */
export function EngagedReadingTracker({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const fired = useRef(false);
  const start = useRef(Date.now());
  const maxScroll = useRef(0);

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY + window.innerHeight;
      const height = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        1,
      );
      maxScroll.current = Math.max(maxScroll.current, scrolled / height);
      maybeTrack();
    }

    function maybeTrack() {
      if (fired.current) return;
      const elapsed = (Date.now() - start.current) / 1000;
      if (
        elapsed >= ENGAGED_READING.minSeconds &&
        maxScroll.current >= ENGAGED_READING.minScrollRatio
      ) {
        fired.current = true;
        track("engaged_reading", {
          slug,
          title,
          seconds: Math.round(elapsed),
          scroll: Number(maxScroll.current.toFixed(2)),
        });
      }
    }

    const interval = window.setInterval(maybeTrack, 5000);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("scroll", onScroll);
    };
  }, [slug, title]);

  return null;
}
