"use client";
import { useEffect, useRef, useState } from "react";
import { services } from "@/data/services";
import { Globe, Smartphone, Settings, Brain, Eye, Zap, Lightbulb, Shield } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const iconMap: Record<string, React.ReactNode> = {
  Globe:      <Globe size={20} aria-hidden="true" />,
  Smartphone: <Smartphone size={20} aria-hidden="true" />,
  Settings:   <Settings size={20} aria-hidden="true" />,
  Brain:      <Brain size={20} aria-hidden="true" />,
  Eye:        <Eye size={20} aria-hidden="true" />,
  Zap:        <Zap size={20} aria-hidden="true" />,
  Lightbulb:  <Lightbulb size={20} aria-hidden="true" />,
  Shield:     <Shield size={20} aria-hidden="true" />,
};

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (prefersReduced) return;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" }
        }
      );
    };
    init();
  }, [prefersReduced]);

  const active = services.find((s) => s.id === activeId);

  return (
    <section
      id="servicos"
      ref={sectionRef}
      aria-label="Solucoes e servicos"
      style={{
        padding: "var(--section-pad-y) var(--section-pad-x)",
        background: "var(--color-bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "var(--content-width)", margin: "0 auto" }}>
        <div style={{ marginBottom: "1rem" }}>
          <span className="section-number">III — Capacidades</span>
        </div>
        <h2
          ref={titleRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h1)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--color-ivory)",
            marginBottom: "5rem",
            opacity: prefersReduced ? 1 : 0,
          }}
        >
          Solucoes
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "start",
        }}
        className="services-grid"
        >
          {/* Lista de servicos */}
          <div role="list">
            {services.map((service, i) => {
              const isActive = activeId === service.id;
              return (
                <div
                  key={service.id}
                  role="listitem"
                >
                  <button
                    onClick={() => setActiveId(isActive ? null : service.id)}
                    aria-expanded={isActive}
                    aria-controls={`service-detail-${service.id}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                      width: "100%",
                      padding: "1.5rem 0",
                      borderTop: "1px solid var(--color-border)",
                      background: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      color: isActive ? "var(--color-ivory)" : "var(--color-steel)",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={() => !isActive && setActiveId(service.id)}
                    onFocus={() => setActiveId(service.id)}
                    aria-label={`Ver detalhes sobre ${service.title}`}
                  >
                    {/* Numero */}
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.3em",
                      color: isActive ? "var(--color-magenta)" : "rgba(122,143,160,0.4)",
                      minWidth: "24px",
                      transition: "color 0.3s",
                    }}>
                      {service.number}
                    </span>

                    {/* Icone */}
                    <span style={{
                      color: isActive ? "var(--color-magenta)" : "rgba(122,143,160,0.5)",
                      transition: "color 0.3s",
                      flexShrink: 0,
                    }}>
                      {iconMap[service.icon]}
                    </span>

                    {/* Titulo */}
                    <span style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(0.95rem, 1.5vw, 1.2rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      flex: 1,
                    }}>
                      {service.title}
                    </span>

                    {/* Indicador */}
                    <span style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      border: `1px solid ${isActive ? "var(--color-magenta)" : "var(--color-border-light)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "border-color 0.3s, transform 0.3s",
                      transform: isActive ? "rotate(45deg)" : "none",
                      flexShrink: 0,
                    }}>
                      <span style={{
                        display: "block",
                        width: "6px",
                        height: "1px",
                        background: isActive ? "var(--color-magenta)" : "var(--color-steel)",
                        position: "relative",
                        transition: "background 0.3s",
                      }} />
                    </span>
                  </button>

                  {/* Acordeao mobile / detalhe inline */}
                  <div
                    id={`service-detail-${service.id}`}
                    role="region"
                    aria-label={`Detalhes sobre ${service.title}`}
                    style={{
                      maxHeight: isActive ? "300px" : "0",
                      overflow: "hidden",
                      transition: prefersReduced ? "none" : "max-height 0.4s ease",
                    }}
                    className="service-detail-mobile"
                  >
                    <div style={{ paddingBottom: "1.5rem", paddingLeft: "3.5rem" }}>
                      <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9rem",
                        lineHeight: 1.7,
                        color: "var(--color-steel)",
                        marginBottom: "1rem",
                      }}>
                        {service.description}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {service.tags.map((tag) => (
                          <span key={tag} className="tech-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Painel de detalhe desktop */}
          <div
            aria-live="polite"
            aria-label={active ? `Detalhes: ${active.title}` : "Passe o mouse sobre um servico para ver detalhes"}
            style={{
              position: "sticky",
              top: "8rem",
              padding: "3rem",
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              minHeight: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              transition: prefersReduced ? "none" : "all 0.3s ease",
            }}
            className="service-desktop-panel"
          >
            {active ? (
              <>
                <div style={{ color: "var(--color-magenta)", marginBottom: "1.5rem" }}>
                  {iconMap[active.icon]}
                </div>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                  fontWeight: 500,
                  fontStyle: "italic",
                  color: "var(--color-ivory)",
                  marginBottom: "1rem",
                }}>
                  {active.title}
                </h3>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  color: "var(--color-steel)",
                  marginBottom: "1.5rem",
                }}>
                  {active.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {active.tags.map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </>
            ) : (
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                fontStyle: "italic",
                color: "rgba(122,143,160,0.4)",
                textAlign: "center",
              }}>
                Selecione uma solucao para ver os detalhes
              </p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          .service-desktop-panel {
            display: none !important;
          }
          .service-detail-mobile {
            display: block !important;
          }
        }
        @media (min-width: 768px) {
          .service-detail-mobile {
            max-height: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
