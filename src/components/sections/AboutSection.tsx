"use client";
import { useEffect, useRef } from "react";
import { ExternalLink, Mail, FileText, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AboutSection() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (prefersReduced) return;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const els = sectionRef.current?.querySelectorAll("[data-anim]") ?? [];
      gsap.fromTo(Array.from(els),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        }
      );
    };
    init();
  }, [prefersReduced]);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      aria-label="Sobre Nicolas Giussani"
      style={{
        padding: "var(--section-pad-y) var(--section-pad-x)",
        background: "var(--color-bg-alt)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grade decorativa */}
      <div className="tech-grid" aria-hidden="true" style={{ opacity: 0.04 }} />

      <div style={{ maxWidth: "var(--content-width)", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "1rem" }} data-anim>
          <span className="section-number">IV — Identidade</span>
        </div>

        <h2
          ref={titleRef}
          data-anim
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h1)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--color-ivory)",
            marginBottom: "5rem",
            maxWidth: "20ch",
            opacity: prefersReduced ? 1 : 0,
          }}
        >
          Engenharia com proposito.
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap: "6rem",
          alignItems: "start",
        }}
        className="about-grid"
        >
          {/* Coluna da foto + links */}
          <div>
            {/* Placeholder de foto */}
            <div
              data-anim
              style={{
                aspectRatio: "3/4",
                background: "linear-gradient(135deg, var(--color-forest) 0%, var(--color-bg) 100%)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                marginBottom: "2rem",
                position: "relative",
                overflow: "hidden",
                opacity: prefersReduced ? 1 : 0,
              }}
              aria-label="Foto de Nicolas Giussani (placeholder — substituir pela foto real)"
            >
              {/* SVG geometrico como placeholder elegante */}
              <svg viewBox="0 0 300 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden="true">
                <defs>
                  <radialGradient id="photo-glow" cx="50%" cy="40%" r="50%">
                    <stop offset="0%" stopColor="#183628" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#09090a" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect x="0" y="0" width="300" height="400" fill="url(#photo-glow)" />
                <circle cx="150" cy="140" r="60" fill="none" stroke="rgba(122,143,160,0.15)" strokeWidth="1" />
                <circle cx="150" cy="140" r="45" fill="rgba(122,143,160,0.05)" />
                {/* Silhueta simplificada */}
                <ellipse cx="150" cy="110" rx="28" ry="30" fill="rgba(122,143,160,0.1)" />
                <ellipse cx="150" cy="200" rx="55" ry="50" fill="rgba(122,143,160,0.06)" />
                {/* Texto de placeholder */}
                <text x="150" y="320" textAnchor="middle" fill="rgba(122,143,160,0.3)" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
                  FOTO A SUBSTITUIR
                </text>
              </svg>
            </div>

            {/* Links sociais */}
            <div data-anim style={{ display: "flex", flexDirection: "column", gap: "0.75rem", opacity: prefersReduced ? 1 : 0 }}>
              {profile.social.map((link) => {
                const icons: Record<string, React.ReactNode> = {
                  GitHub: <ExternalLink size={16} aria-hidden="true" />,
                  LinkedIn: <ExternalLink size={16} aria-hidden="true" />,
                  Email: <Mail size={16} aria-hidden="true" />,
                };
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target={link.platform !== "Email" ? "_blank" : undefined}
                    rel={link.platform !== "Email" ? "noopener noreferrer" : undefined}
                    aria-label={link.label}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.85rem",
                      color: "var(--color-steel)",
                      padding: "0.5rem 0",
                      borderBottom: "1px solid var(--color-border)",
                      transition: "color 0.25s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-magenta)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-steel)"; }}
                  >
                    {icons[link.platform]}
                    {link.platform}
                  </a>
                );
              })}

              {/* CV */}
              <a
                href={profile.cvUrl}
                download
                aria-label="Baixar curriculo de Nicolas Giussani em PDF"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  color: "var(--color-steel)",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid var(--color-border)",
                  transition: "color 0.25s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-gold)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-steel)"; }}
              >
                <FileText size={16} aria-hidden="true" />
                Curriculo (PDF)
              </a>
            </div>
          </div>

          {/* Coluna de texto */}
          <div>
            {/* Bio */}
            <div data-anim style={{ marginBottom: "3rem", opacity: prefersReduced ? 1 : 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <MapPin size={14} color="var(--color-steel)" aria-hidden="true" />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-steel)", letterSpacing: "0.1em" }}>
                  {profile.location}
                </span>
              </div>
              <h3 style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                fontWeight: 600,
                color: "var(--color-ivory)",
                marginBottom: "0.5rem",
              }}>
                {profile.name}
              </h3>
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-magenta)",
                marginBottom: "1.5rem",
              }}>
                {profile.tagline}
              </p>
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "var(--color-steel)",
                maxWidth: "55ch",
              }}>
                {profile.bio}
              </p>
            </div>

            {/* Tecnologias */}
            <div data-anim style={{ marginBottom: "3rem", opacity: prefersReduced ? 1 : 0 }}>
              <h4 style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-steel)",
                marginBottom: "1rem",
              }}>
                Tecnologias
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {profile.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div data-anim style={{ opacity: prefersReduced ? 1 : 0 }}>
              <h4 style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-steel)",
                marginBottom: "2rem",
              }}>
                Trajetoria
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {profile.timeline.map((item, i) => (
                  <div key={item.year} style={{ display: "flex", gap: "1.5rem" }}>
                    {/* Linha vertical */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: i === profile.timeline.length - 1 ? "var(--color-magenta)" : "var(--color-border-light)", border: "1px solid var(--color-border-light)", flexShrink: 0 }} />
                      {i < profile.timeline.length - 1 && (
                        <div style={{ width: "1px", flex: 1, minHeight: "2rem", background: "var(--color-border)", margin: "4px 0" }} />
                      )}
                    </div>
                    {/* Conteudo */}
                    <div style={{ paddingBottom: "2rem" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-magenta)", letterSpacing: "0.1em" }}>
                        {item.year}
                      </span>
                      <h5 style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 600, color: "var(--color-ivory)", margin: "0.25rem 0" }}>
                        {item.title}
                      </h5>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--color-steel)", lineHeight: 1.6 }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}

