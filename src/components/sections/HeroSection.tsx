"use client";
import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function HeroSection() {
  const prefersReduced = useReducedMotion();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReduced) return;
    let gsap: typeof import("gsap").gsap;
    const init = async () => {
      const mod = await import("gsap");
      gsap = mod.gsap;
      const tl = gsap.timeline({ delay: 0.3 });
      tl
        .from(tagRef.current, { opacity: 0, y: 20, duration: 0.7, ease: "power2.out" })
        .from(titleRef.current, { opacity: 0, y: 60, duration: 1, ease: "power2.out" }, "-=0.4")
        .from(subtitleRef.current, { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" }, "-=0.5")
        .from(ctasRef.current, { opacity: 0, y: 20, duration: 0.7, ease: "power2.out" }, "-=0.4");
    };
    init();
  }, [prefersReduced]);

  // Parallax por cursor
  useEffect(() => {
    if (prefersReduced) return;
    const section = sectionRef.current;
    if (!section) return;
    const layers = section.querySelectorAll<HTMLElement>("[data-parallax]");
    let raf: number;
    let mx = 0, my = 0;
    const positions = Array.from(layers).map(() => ({ x: 0, y: 0 }));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const animate = () => {
      layers.forEach((layer, i) => {
        const depth = parseFloat(layer.dataset.parallax || "0.1");
        const tx = mx * depth * 20;
        const ty = my * depth * 15;
        positions[i].x = lerp(positions[i].x, tx, 0.06);
        positions[i].y = lerp(positions[i].y, ty, 0.06);
        layer.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
      });
      raf = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [prefersReduced]);

  const scrollToProjects = () => {
    document.querySelector("#projetos")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      ref={sectionRef}
      aria-label="Inicio — Nicolas Giussani"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--color-bg)",
      }}
    >
      {/* Grade tecnica de fundo */}
      <div className="tech-grid" aria-hidden="true" />

      {/* Canvas Three.js — complementar */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
        }}
        data-parallax="0.05"
      >
        <HeroCanvas />
      </div>

      {/* Composicao artistica decorativa */}
      <div
        aria-hidden="true"
        data-parallax="0.08"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "55%",
          zIndex: 3,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/* Circulo principal — figura classica interpretada geometricamente */}
        <div style={{
          position: "absolute",
          right: "-10%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "clamp(300px, 45vw, 700px)",
          height: "clamp(300px, 45vw, 700px)",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at 30% 40%, rgba(26,61,43,0.25) 0%, rgba(9,9,10,0) 70%)",
          border: "1px solid rgba(122,143,160,0.08)",
        }} />

        {/* Elipse de profundidade */}
        <div
          data-parallax="0.12"
          style={{
            position: "absolute",
            right: "10%",
            top: "20%",
            width: "clamp(200px, 30vw, 500px)",
            height: "clamp(200px, 30vw, 500px)",
            borderRadius: "50%",
            border: "1px solid rgba(192,20,78,0.12)",
          }}
        />

        {/* Linhas tecnicas verticais */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "10%",
              bottom: "10%",
              right: `${15 + i * 12}%`,
              width: "1px",
              background: `rgba(122,143,160,${0.04 + i * 0.02})`,
            }}
          />
        ))}

        {/* Elemento magenta — cubo de codigo */}
        <div
          data-parallax="0.18"
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "22%",
            top: "30%",
            width: "60px",
            height: "60px",
            border: "1px solid var(--color-magenta)",
            opacity: 0.4,
            transform: "rotate(15deg)",
            borderRadius: "var(--radius-sm)",
          }}
        />

        {/* Ponto dourado */}
        <div
          data-parallax="0.25"
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "35%",
            top: "55%",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--color-gold)",
            boxShadow: "0 0 20px var(--color-gold)",
            opacity: 0.7,
          }}
        />

        {/* Ponto magenta */}
        <div
          data-parallax="0.2"
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "18%",
            top: "65%",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "var(--color-magenta)",
            boxShadow: "0 0 16px var(--color-magenta)",
          }}
        />

        {/* Label flutuante — tecnologia */}
        <div
          data-parallax="0.14"
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "25%",
            top: "70%",
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            color: "rgba(122,143,160,0.5)",
            textTransform: "uppercase",
          }}
        >
          AI · Vision · Web
        </div>
      </div>

      {/* CONTEUDO PRINCIPAL */}
      <div
        id="main-content"
        style={{
          position: "relative",
          zIndex: 10,
          padding: "0 var(--section-pad-x)",
          paddingTop: "8rem",
          paddingBottom: "6rem",
          maxWidth: "var(--content-width)",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* Tag de categoria */}
        <div
          ref={tagRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          <span
            className="section-number"
            style={{ color: "var(--color-steel)" }}
          >
            I — Engenheiro & Desenvolvedor
          </span>
        </div>

        {/* TITULO HERO */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-hero)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "var(--color-ivory)",
            maxWidth: "14ch",
            marginBottom: "2rem",
          }}
        >
          Tecnologia
          <br />
          <span
            style={{
              fontStyle: "normal",
              fontWeight: 600,
              fontFamily: "var(--font-sans)",
              color: "var(--color-white)",
            }}
          >
            que ganha
          </span>
          <br />
          <em style={{ color: "var(--color-magenta)" }}>forma.</em>
        </h1>

        {/* SUBTITULO */}
        <p
          ref={subtitleRef}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "var(--color-steel)",
            maxWidth: "50ch",
            marginBottom: "3rem",
          }}
        >
          Engenharia, inteligencia artificial e experiencias digitais
          desenvolvidas para transformar ideias em produtos reais.
        </p>

        {/* CTAS */}
        <div
          ref={ctasRef}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <button
            onClick={scrollToProjects}
            className="btn btn--primary"
            aria-label="Ver projetos de Nicolas Giussani"
          >
            Explorar projetos
          </button>
          <button
            onClick={scrollToContact}
            className="btn btn--outline"
            aria-label="Entrar em contato com Nicolas Giussani"
          >
            Entrar em contato
          </button>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          animation: prefersReduced ? "none" : "scrollBounce 2s ease-in-out infinite",
        }}
      >
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          color: "var(--color-steel)",
          textTransform: "uppercase",
        }}>
          scroll
        </span>
        <ArrowDown size={14} color="var(--color-steel)" />
      </div>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.6; }
          50% { transform: translateX(-50%) translateY(6px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
