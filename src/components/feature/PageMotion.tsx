"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Global pacing multiplier for the scroll-decode sequence. 1.3 = 30% slower.
const DECODE_SLOWDOWN = 1.3;

export function PageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window) || typeof Element.prototype.animate !== "function") return;

    const root = document.querySelector<HTMLElement>("main");
    if (!root) return;
    const candidates = Array.from(root.querySelectorAll<HTMLElement>(
      ".editorial > section:not(.hero) :is(h2,h3,h4,p,blockquote,li,summary,a,button,strong,span,[data-decode]), main > .container :is(h1,h2,h3,h4,p,li,a,button), main > article :is(h1,h2,h3,h4,p,li,a,button)"
    ));
    const targets = candidates.filter((element) => {
      if (element.closest(".sr-only, [aria-hidden='true'], svg, .experience-timeline, .experience-note") || !element.textContent?.trim()) return false;
      return !candidates.some((ancestor) => ancestor !== element && ancestor.contains(element));
    });
    const pending = new Map<HTMLElement, string>();
    const active = new Set<() => void>();
    let disposed = false;

    const layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    Object.assign(layer.style, { position: "fixed", inset: "0", pointerEvents: "none", zIndex: "25", overflow: "hidden" });
    document.body.appendChild(layer);

    const restore = (element: HTMLElement) => {
      const opacity = pending.get(element);
      if (opacity === undefined) return;
      element.style.opacity = opacity;
      pending.delete(element);
    };

    const reveal = (element: HTMLElement, delay: number) => {
      if (!element.isConnected || !pending.has(element)) { restore(element); return; }
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) { restore(element); return; }

      const clone = element.cloneNode(true) as HTMLElement;
      clone.removeAttribute("id");
      clone.querySelectorAll("[id]").forEach((item) => item.removeAttribute("id"));
      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("inert", "");
      clone.removeAttribute("data-decode");
      const properties = ["display", "font", "fontFamily", "fontSize", "fontWeight", "fontStyle", "lineHeight", "letterSpacing", "textAlign", "textTransform", "textDecoration", "whiteSpace", "wordBreak", "overflowWrap", "color", "backgroundColor", "padding", "border", "borderRadius", "boxSizing", "gap", "alignItems", "justifyContent", "flexDirection", "textShadow"] as const;
      const originals = [element, ...element.querySelectorAll<HTMLElement>("*")];
      const copies = [clone, ...clone.querySelectorAll<HTMLElement>("*")];
      copies.forEach((copy, index) => {
        const computed = getComputedStyle(originals[index]);
        properties.forEach((property) => { copy.style[property] = computed[property]; });
      });
      Object.assign(clone.style, {
        position: "absolute", left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`,
        height: `${rect.height}px`, margin: "0", opacity: "0", overflow: "hidden", pointerEvents: "none", zIndex: "2",
      });
      const walker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
      const textNodes: { node: Text; value: string }[] = [];
      while (walker.nextNode()) {
        const node = walker.currentNode as Text;
        textNodes.push({ node, value: node.data });
      }
      layer.appendChild(clone);

      const box = document.createElement("div");
      box.dataset.scrollBlueprint = "";
      Object.assign(box.style, { position: "absolute", boxSizing: "border-box", border: "1px solid rgba(100, 221, 235, .9)", boxShadow: "0 0 8px rgba(83, 216, 231, .15)", transformOrigin: "left top", opacity: "0", pointerEvents: "none" });
      layer.appendChild(box);
      let frame = 0;
      let stopped = false;
      let lastTextUpdate = 0;
      const started = performance.now() + delay;
      const boxDuration = 420 * DECODE_SLOWDOWN;
      const textDuration = Math.min(1610, Math.max(910, (element.textContent?.trim().length || 0) * 5.6)) * DECODE_SLOWDOWN;
      const total = textNodes.reduce((length, item) => length + item.value.length, 0);
      const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const finish = () => {
        if (stopped) return;
        stopped = true;
        cancelAnimationFrame(frame);
        restore(element);
        clone.remove();
        box.remove();
        active.delete(finish);
      };
      active.add(finish);
      const tick = (now: number) => {
        if (disposed || motion.matches || !element.isConnected || element.contains(document.activeElement)) { finish(); return; }
        const current = element.getBoundingClientRect();
        Object.assign(box.style, { left: `${current.left}px`, top: `${current.top}px`, width: `${current.width}px`, height: `${current.height}px` });
        Object.assign(clone.style, { left: `${current.left}px`, top: `${current.top}px` });
        const elapsed = now - started;
        if (elapsed >= 0) {
          const boxProgress = Math.min(elapsed / boxDuration, 1);
          box.style.opacity = elapsed > boxDuration + textDuration - 350 ? String(Math.max(0, (boxDuration + textDuration - elapsed) / 350)) : "0.9";
          box.style.clipPath = `inset(0 ${100 * (1 - boxProgress)}% ${100 * (1 - boxProgress)}% 0)`;
          if (elapsed >= boxDuration) {
            clone.style.opacity = "1";
            const progress = Math.min((elapsed - boxDuration) / textDuration, 1);
            if (now - lastTextUpdate > 50) {
              const resolved = Math.floor(total * progress);
              let offset = 0;
              for (const item of textNodes) {
                item.node.data = Array.from(item.value, (char, index) => {
                  if (offset + index < resolved || !/[A-Za-z0-9]/.test(char)) return char;
                  if (/[0-9]/.test(char)) return alphabet[Math.floor(Math.random() * 10)];
                  return alphabet[10 + Math.floor(Math.random() * 26)];
                }).join("");
                offset += item.value.length;
              }
              lastTextUpdate = now;
            }
            if (progress >= 1) { finish(); return; }
          }
        }
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const frameArea = (element: HTMLElement) => {
      const box = document.createElement("div");
      box.dataset.scrollBlueprint = "area";
      Object.assign(box.style, { position: "absolute", boxSizing: "border-box", border: "1px solid rgba(100, 221, 235, .72)", pointerEvents: "none", opacity: "0" });
      layer.appendChild(box);
      const start = performance.now();
      let frame = 0;
      let stopped = false;
      const finish = () => {
        if (stopped) return;
        stopped = true;
        cancelAnimationFrame(frame);
        box.remove();
        active.delete(finish);
      };
      active.add(finish);
      const tick = (now: number) => {
        if (disposed || motion.matches || !element.isConnected) { finish(); return; }
        const rect = element.getBoundingClientRect();
        const elapsed = now - start;
        const progress = Math.min(elapsed / 588, 1);
        Object.assign(box.style, {
          left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px`,
          clipPath: `inset(0 ${100 * (1 - progress)}% ${100 * (1 - progress)}% 0)`,
          opacity: String(elapsed < 700 ? 0.75 : Math.max(0, (1400 - elapsed) / 700)),
        });
        if (elapsed >= 1400) { finish(); return; }
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
      visible.forEach((entry, index) => {
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        if (!pending.has(element)) {
          try { frameArea(element); } catch { return; }
          return;
        }
        try { reveal(element, Math.min(index * 91, 560)); } catch { restore(element); }
      });
    }, { threshold: 0, rootMargin: "0px 0px -5% 0px" });

    targets.forEach((element) => {
      pending.set(element, element.style.opacity);
      element.style.opacity = "0";
      observer.observe(element);
    });
    root.querySelectorAll<HTMLElement>(".reference-heading, .about-columns > div, .flagship-panel, .recent-project, .award-card, .oss-card, .matrix-card, .experience-panel, .skill-card, .publication-list > div, .reference-contact").forEach((element) => observer.observe(element));
    const onFocus = (event: FocusEvent) => {
      const focused = event.target as Element;
      pending.forEach((_, element) => { if (element === focused || element.contains(focused)) restore(element); });
    };
    document.addEventListener("focusin", onFocus);
    const cleanup = () => {
      if (disposed) return;
      disposed = true;
      observer.disconnect();
      active.forEach((finish) => finish());
      pending.forEach((_, element) => restore(element));
      document.removeEventListener("focusin", onFocus);
      layer.remove();
    };
    const onMotionChange = () => { if (motion.matches) cleanup(); };
    motion.addEventListener("change", onMotionChange);
    return () => { motion.removeEventListener("change", onMotionChange); cleanup(); };
  }, [pathname]);

  return null;
}
