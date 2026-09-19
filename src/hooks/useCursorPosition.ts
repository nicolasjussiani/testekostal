"use client";
import { useEffect, useState } from "react";

interface CursorPos { x: number; y: number; }

export function useCursorPosition(): CursorPos {
  const [pos, setPos] = useState<CursorPos>({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}
