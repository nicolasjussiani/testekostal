"use client";
import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const isEven = index % 2 === 0;

  useEffect(() => {
    const card = cardRef.current;
    if (!card || prefersReduced) return;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    };
    init();
  }, [prefersReduced]);

  return (
    <article
      ref={cardRef}
      aria-label={`Projeto: ${project.title}`}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "3rem",
        alignItems: "center",
        padding: "5rem 0",
        borderTop: "1px solid var(--color-border)",
        opacity: prefersReduced ? 1 : 0,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
        className="project-grid"
      >
        {/* Numero + info */}
        <div style={{ order: isEven ? 1 : 2 }}>
          {/* Numero grande */}
          <div
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(5rem, 10vw, 12rem)",
              fontWeight: 300,
              color: "rgba(122,143,160,0.08)",
              lineHeight: 1,
              marginBottom: "-2rem",
              userSelect: "none",
            }}
          >
            {project.number}
          </div>

          {/* Categoria */}
          <div className="section-number" style={{ marginBottom: "1rem" }}>
            {project.category}
          </div>

          {/* Titulo */}
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 500,
              fontStyle: "italic",
              lineHeight: 1.1,
              color: "var(--color-ivory)",
              marginBottom: "0.5rem",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-magenta)",
              marginBottom: "1.5rem",
            }}
          >
            {project.subtitle}
          </p>

          {/* Descricao */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "var(--color-steel)",
              maxWidth: "45ch",
              marginBottom: "2rem",
            }}
          >
            {project.description}
          </p>

          {/* Tags de tecnologia */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
            {project.technologies.map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>

          {/* CTA */}
          <button
            className="btn btn--ghost"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-ivory)",
              borderBottom: "1px solid var(--color-border-light)",
              paddingBottom: "0.25rem",
              transition: "color 0.25s, border-color 0.25s",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              btn.style.color = "var(--color-magenta)";
              btn.style.borderColor = "var(--color-magenta)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.color = "var(--color-ivory)";
              btn.style.borderColor = "var(--color-border-light)";
            }}
            aria-label={`Ver projeto ${project.title}`}
          >
            Ver projeto
            <ArrowUpRight size={14} aria-hidden="true" />
          </button>
        </div>

        {/* Visual do projeto */}
        <div
          style={{
            order: isEven ? 2 : 1,
            aspectRatio: "4/3",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            position: "relative",
            background: `linear-gradient(135deg, ${project.color} 0%, #09090a 100%)`,
            border: "1px solid var(--color-border)",
          }}
        >
          {/* Elemento visual abstrato especifico para cada projeto */}
          <ProjectVisual project={project} />
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .project-grid {
            grid-template-columns: 1fr !important;
          }
          .project-grid > div {
            order: unset !important;
          }
        }
      `}</style>
    </article>
  );
}

function ProjectVisual({ project }: { project: typeof projects[0] }) {
  const svgStyle = {
    position: "absolute" as const,
    inset: 0,
    width: "100%",
    height: "100%",
  };

  if (project.id === "solarapp") {
    return (
      <svg viewBox="0 0 400 300" style={svgStyle} aria-hidden="true">
        <defs>
          <radialGradient id="solar-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#b5892a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#09090a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="150" r="120" fill="url(#solar-glow)" />
        <circle cx="200" cy="150" r="50" fill="none" stroke="#b5892a" strokeWidth="1" strokeOpacity="0.4" />
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle) => (
          <line key={angle}
            x1="200" y1="150"
            x2={200 + 90 * Math.cos((angle * Math.PI) / 180)}
            y2={150 + 90 * Math.sin((angle * Math.PI) / 180)}
            stroke="#b5892a" strokeWidth="0.5" strokeOpacity="0.2"
          />
        ))}
        {/* Paineis solares */}
        {[[-60,-40],[20,-40],[-60,10],[20,10]].map(([x,y], i) => (
          <rect key={i} x={200 + x} y={150 + y} width="70" height="40" rx="2"
            fill="none" stroke="#b5892a" strokeWidth="0.8" strokeOpacity="0.5" />
        ))}
        <line x1="50" y1="30" x2="350" y2="270" stroke="#b5892a" strokeWidth="0.3" strokeOpacity="0.15" />
        <circle cx="200" cy="150" r="8" fill="#b5892a" opacity="0.5" />
      </svg>
    );
  }

  if (project.id === "nfe-processor") {
    return (
      <svg viewBox="0 0 400 300" style={svgStyle} aria-hidden="true">
        <defs>
          <pattern id="doc-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="20" x2="20" y2="20" stroke="#8fa0b0" strokeWidth="0.3" strokeOpacity="0.3" />
            <line x1="20" y1="0" x2="20" y2="20" stroke="#8fa0b0" strokeWidth="0.3" strokeOpacity="0.3" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="400" height="300" fill="url(#doc-grid)" />
        {[0,1,2].map((i) => (
          <g key={i} transform={`translate(${80 + i * 20}, ${50 + i * 20})`}>
            <rect width="160" height="200" rx="2" fill="#111112" stroke="#2e2e30" strokeWidth="1" />
            {[0,1,2,3,4,5,6].map((j) => (
              <line key={j} x1="16" y1={30 + j * 22} x2="144" y2={30 + j * 22} stroke="#8fa0b0" strokeWidth="0.8" strokeOpacity={0.3 - j * 0.03} />
            ))}
            <rect x="16" y="16" width="60" height="8" rx="1" fill="#c0144e" opacity="0.4" />
          </g>
        ))}
        <circle cx="320" cy="240" r="30" fill="none" stroke="#b5892a" strokeWidth="1" strokeOpacity="0.4" />
        <text x="311" y="245" fill="#b5892a" fontSize="10" fontFamily="JetBrains Mono, monospace" opacity="0.7">xlsx</text>
      </svg>
    );
  }

  if (project.id === "urban-waste") {
    return (
      <svg viewBox="0 0 400 300" style={svgStyle} aria-hidden="true">
        <defs>
          <radialGradient id="detect-glow" cx="50%" cy="60%" r="40%">
            <stop offset="0%" stopColor="#c0144e" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#09090a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="400" height="300" fill="url(#detect-glow)" />
        {/* Caixas de deteccao */}
        {[[60,80,90,60],[180,100,100,70],[280,60,80,80],[100,180,70,60],[240,160,110,80]].map(([x,y,w,h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="1"
            fill="none" stroke="#c0144e" strokeWidth="1.5" strokeOpacity={0.3 + i * 0.1}
            strokeDasharray={i === 2 ? "0" : "4 2"}
          />
        ))}
        {/* Indicadores de confianca */}
        {[[60,78],[180,98],[280,58]].map(([x,y], i) => (
          <g key={i}>
            <rect x={x} y={y - 14} width={36} height={12} rx="1" fill="#c0144e" opacity="0.7" />
            <text x={x + 4} y={y - 4} fill="white" fontSize="7" fontFamily="JetBrains Mono, monospace">
              {88 - i * 5}%
            </text>
          </g>
        ))}
        {/* Nuvem de pontos */}
        {Array.from({ length: 40 }, (_, i) => (
          <circle key={i}
            cx={60 + (i % 8) * 40 + Math.sin(i * 1.3) * 10}
            cy={220 + Math.floor(i / 8) * 12 + Math.cos(i * 0.9) * 5}
            r="1.5" fill="#8fa0b0" opacity="0.4"
          />
        ))}
        {/* Linha de escaneamento */}
        <line x1="0" y1="150" x2="400" y2="150" stroke="#c0144e" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 8" />
      </svg>
    );
  }

  // web-mobile default
  return (
    <svg viewBox="0 0 400 300" style={svgStyle} aria-hidden="true">
      <defs>
        <linearGradient id="web-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b5892a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#c0144e" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="300" fill="url(#web-grad)" />
      {/* Janela de browser */}
      <rect x="60" y="60" width="280" height="180" rx="6" fill="#111112" stroke="#2e2e30" strokeWidth="1" />
      <rect x="60" y="60" width="280" height="28" rx="6" fill="#1a1a1c" />
      <circle cx="80" cy="74" r="5" fill="#8fa0b0" opacity="0.3" />
      <circle cx="96" cy="74" r="5" fill="#8fa0b0" opacity="0.3" />
      <circle cx="112" cy="74" r="5" fill="#b5892a" opacity="0.5" />
      {/* Linhas de codigo */}
      {[0,1,2,3,4,5].map((i) => (
        <line key={i} x1="80" y1={108 + i * 22} x2={80 + 100 + (i % 3) * 60} y2={108 + i * 22}
          stroke={i === 2 ? "#c0144e" : "#8fa0b0"} strokeWidth="1.5" strokeOpacity="0.4"
        />
      ))}
      {/* Mobile */}
      <rect x="290" y="160" width="45" height="75" rx="6" fill="#111112" stroke="#b5892a" strokeWidth="1" strokeOpacity="0.5" />
      <rect x="295" y="170" width="35" height="55" rx="2" fill="#1a1a1c" />
    </svg>
  );
}

export default function ProjectsSection() {
  const prefersReduced = useReducedMotion();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (prefersReduced) return;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        }
      );
    };
    init();
  }, [prefersReduced]);

  return (
    <section
      id="projetos"
      aria-label="Projetos"
      style={{
        padding: "var(--section-pad-y) var(--section-pad-x)",
        background: "var(--color-bg-alt)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "var(--content-width)", margin: "0 auto" }}>
        {/* Cabecalho da secao */}
        <div style={{ marginBottom: "1rem" }}>
          <span className="section-number">II — Trabalhos Selecionados</span>
        </div>
        <h2
          ref={titleRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h1)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--color-ivory)",
            marginBottom: "1rem",
            opacity: prefersReduced ? 1 : 0,
          }}
        >
          Projetos
        </h2>
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: "1rem",
          color: "var(--color-steel)",
          maxWidth: "55ch",
          marginBottom: "2rem",
          lineHeight: 1.75,
        }}>
          Cada projeto e uma resposta a um problema real. Da visao computacional a automacao
          tributaria, do desenvolvimento web a analise de energia solar.
        </p>

        {/* Lista de projetos */}
        <div>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
