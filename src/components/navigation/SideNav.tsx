"use client";
import { useEffect, useState, useRef } from "react";
import { navItems } from "@/data/navigation";

export default function SideNav() {
  const [activeId, setActiveId] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: "var(--z-nav)",
            width: "3rem",
            height: "3rem",
            borderRadius: "50%",
            background: "var(--color-magenta)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <span style={{ display: "block", width: "16px", height: "1.5px", background: "white", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : "none" }} />
          <span style={{ display: "block", width: "16px", height: "1.5px", background: "white", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: "16px", height: "1.5px", background: "white", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none" }} />
        </button>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <nav
            aria-label="Navegacao principal"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: "var(--z-overlay)",
              background: "rgba(9,9,10,0.96)",
              backdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.href)}
                aria-current={activeId === item.id ? "page" : undefined}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: activeId === item.id ? "var(--color-magenta)" : "var(--color-ivory)",
                  transition: "color 0.25s",
                }}
              >
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--color-steel)" }}>
                  {item.roman}
                </span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.5rem", fontWeight: 600 }}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        )}
      </>
    );
  }

  return (
    <nav
      aria-label="Navegacao de secoes"
      style={{
        position: "fixed",
        left: "clamp(1rem, 2.5vw, 2rem)",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: "var(--z-nav)",
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem",
      }}
    >
      {navItems.map((item) => {
        const isActive = activeId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.href)}
            aria-label={`Navegar para ${item.label}`}
            aria-current={isActive ? "page" : undefined}
            title={item.label}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.25rem 0",
              color: isActive ? "var(--color-magenta)" : "var(--color-steel)",
              transition: "color 0.3s",
            }}
          >
            {/* Linha lateral */}
            <span
              style={{
                display: "block",
                width: isActive ? "24px" : "10px",
                height: "1px",
                background: isActive ? "var(--color-magenta)" : "var(--color-steel)",
                transition: "width 0.3s, background 0.3s",
              }}
            />
            {/* Numero romano */}
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                opacity: isActive ? 1 : 0.45,
                transition: "opacity 0.3s",
              }}
            >
              {item.roman}
            </span>
            {/* Label (visivel apenas no hover) */}
            <span
              className="sidenav-label"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                opacity: 0,
                transform: "translateX(-4px)",
                transition: "opacity 0.25s, transform 0.25s",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}

      <style>{`
        nav button:hover .sidenav-label {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </nav>
  );
}
