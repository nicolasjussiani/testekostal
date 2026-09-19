"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={headerRef}
      className="header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: "var(--z-header)",
        padding: "1.5rem var(--section-pad-x)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background-color 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease",
        backgroundColor: scrolled ? "rgba(9,9,10,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.04)" : "none",
      }}
      role="banner"
    >
      {/* MARCA */}
      <Link
        href="/"
        aria-label="Default Solucoes Tecnologicas — Inicio"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          textDecoration: "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-ivory)",
          }}
        >
          Default
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.08em",
            color: "var(--color-steel)",
          }}
        >
          Solucoes Tecnologicas
        </span>
      </Link>

      {/* INDICADOR */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.15em",
          color: "var(--color-steel)",
          display: "none",
        }}
        className="header-edition"
      >
        Portfolio&nbsp;/&nbsp;2025
      </span>

      {/* CTA */}
      <button
        onClick={() => scrollToSection("#contato")}
        aria-label="Ir para secao de contato"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontFamily: "var(--font-sans)",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--color-ivory)",
          background: "none",
          border: "1px solid rgba(250,247,240,0.2)",
          padding: "0.5rem 1.2rem",
          borderRadius: "var(--radius-sm)",
          cursor: "pointer",
          transition: "border-color 0.25s, color 0.25s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-magenta)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--color-magenta)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(250,247,240,0.2)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--color-ivory)";
        }}
      >
        Fale comigo
        <ArrowUpRight size={12} aria-hidden="true" />
      </button>

      <style>{`
        @media (min-width: 768px) {
          .header-edition { display: block !important; }
        }
      `}</style>
    </header>
  );
}
