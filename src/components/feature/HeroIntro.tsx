"use client";

import { useEffect } from "react";

declare global {
  interface Window { portfolioIntroPlayed?: boolean }
}

export function HeroIntro() {
  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navigation && new URL(navigation.name).pathname !== "/") return;
    if (window.portfolioIntroPlayed || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = document.querySelector<HTMLElement>(".hero");
    if (!hero || typeof Element.prototype.animate !== "function") return;

    let frame = 0;
    let timer = 0;
    let layer: HTMLDivElement | undefined;
    let started = false;
    const oldGuides = Array.from(hero.querySelectorAll<HTMLElement>(".blueprint i"));

    const finish = () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      hero.removeAttribute("data-intro");
      layer?.remove();
      oldGuides.forEach((guide) => { guide.style.display = ""; });
    };

    frame = requestAnimationFrame(() => {
      if (window.portfolioIntroPlayed) return;
      const targets = Array.from(hero.querySelectorAll<HTMLElement>(
        ".hero-topline, .outline-word, .hero-intro, .hero-intro h1, .hero-actions, .identity-tile, .hero-side > div, .nameplate"
      ));
      if (!targets.length) return;
      layer = document.createElement("div");
      layer.setAttribute("aria-hidden", "true");
      layer.dataset.blueprintLayer = "";
      Object.assign(layer.style, { position: "absolute", inset: "0", pointerEvents: "none", zIndex: "5" });
      const boxes = targets.map((target, index) => {
        const box = document.createElement("div");
        box.dataset.blueprintBox = "";
        Object.assign(box.style, { position: "absolute", top: "0", left: "0", boxSizing: "border-box", border: "1px solid rgba(98, 220, 232, .9)", willChange: "transform, width, height", pointerEvents: "none" });
        layer?.appendChild(box);
        box.animate([
          { opacity: 0, clipPath: "inset(0 100% 100% 0)" },
          { opacity: 0.9, clipPath: "inset(0 0 0 0)", offset: 0.42 },
          { opacity: 0, clipPath: "inset(0 0 0 0)" },
        ], { duration: 2200, delay: Math.min(index * 70, 350), easing: "ease-out", fill: "both" });
        return { target, box };
      });
      hero.appendChild(layer);
      oldGuides.forEach((guide) => { guide.style.display = "none"; });
      window.portfolioIntroPlayed = true;
      started = true;
      hero.setAttribute("data-intro", "playing");

      const track = () => {
        const heroRect = hero.getBoundingClientRect();
        const measurements = boxes.map(({ target }) => target.getBoundingClientRect());
        boxes.forEach(({ box }, index) => {
          const rect = measurements[index];
          box.style.transform = `translate3d(${rect.left - heroRect.left}px, ${rect.top - heroRect.top}px, 0)`;
          box.style.width = `${rect.width}px`;
          box.style.height = `${rect.height}px`;
        });
        frame = requestAnimationFrame(track);
      };
      track();
      timer = window.setTimeout(finish, 2700);
    });

    return () => { if (started) finish(); else cancelAnimationFrame(frame); };
  }, []);
  return null;
}
