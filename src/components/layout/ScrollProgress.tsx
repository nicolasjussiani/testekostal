"use client";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div
      role="progressbar"
      aria-label="Progresso de leitura da pagina"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: "var(--z-header)",
        background: "transparent",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          background: "var(--color-magenta)",
          width: `${progress * 100}%`,
          transformOrigin: "left",
          transition: "width 0.1s linear",
          boxShadow: "0 0 8px var(--color-magenta)",
        }}
      />
    </div>
  );
}
