"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let raf: number;
    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onEnterCTA = () => {
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.borderColor = "var(--color-magenta)";
      ring.style.marginLeft = "-8px";
      ring.style.marginTop = "-8px";
    };
    const onLeaveCTA = () => {
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.borderColor = "rgba(250,247,240,0.4)";
      ring.style.marginLeft = "0";
      ring.style.marginTop = "0";
    };

    const interactives = document.querySelectorAll("a, button, [role=button]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterCTA);
      el.addEventListener("mouseleave", onLeaveCTA);
    });

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "var(--color-magenta)",
          pointerEvents: "none",
          zIndex: "var(--z-cursor)",
          mixBlendMode: "normal",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid rgba(250,247,240,0.4)",
          pointerEvents: "none",
          zIndex: "var(--z-cursor)",
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
        }}
      />
    </>
  );
}
