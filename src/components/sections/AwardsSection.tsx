"use client";
import { useEffect, useRef } from "react";
import { awards } from "@/data/awards";
import { Trophy, Award, BookOpen } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const typeIcons: Record<string, React.ReactNode> = {
  award:         <Trophy size={16} aria-hidden="true" />,
  certification: <Award size={16} aria-hidden="true" />,
  course:        <BookOpen size={16} aria-hidden="true" />,
};
const typeColors: Record<string, string> = {
  award:         "var(--color-magenta)",
  certification: "var(--color-gold)",
  course:        "var(--color-steel)",
};

export default function AwardsSection() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReduced) return;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const items = sectionRef.current?.querySelectorAll("[data-award-item]") ?? [];
      gsap.fromTo(Array.from(items),
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, stagger: 0.12, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        }
      );
    };
    init();
  }, [prefersReduced]);

  const awardEntries = awards.filter((a) => a.type === "award");
  const otherEntries = awards.filter((a) => a.type !== "award");

  return (
    <section
      id="reconhecimentos"
      ref={sectionRef}
      aria-label="Reconhecimentos e certificacoes"
      style={{
        padding: "var(--section-pad-y) var(--section-pad-x)",
        background: "var(--color-bg)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "var(--content-width)", margin: "0 auto" }}>
        <div style={{ marginBottom: "1rem" }}>
          <span className="section-number">V — Conquistas</span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h1)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--color-ivory)",
            marginBottom: "5rem",
          }}
        >
          Reconhecimentos
        </h2>

        {/* Premios em destaque */}
        <div style={{ marginBottom: "5rem" }}>
          <h3 style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--color-steel)",
            marginBottom: "2.5rem",
          }}>
            Premios
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}>
            {awardEntries.map((award) => (
              <article
                key={award.id}
                data-award-item
                style={{
                  padding: "2.5rem",
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  position: "relative",
                  overflow: "hidden",
                  opacity: prefersReduced ? 1 : 0,
                }}
                aria-label={award.title}
              >
                {/* Numero grande de fundo */}
                <div aria-hidden="true" style={{
                  position: "absolute",
                  top: "-1rem",
                  right: "1rem",
                  fontFamily: "var(--font-display)",
                  fontSize: "8rem",
                  fontWeight: 300,
                  color: "rgba(192,20,78,0.04)",
                  lineHeight: 1,
                  userSelect: "none",
                }}>
                  {award.position.charAt(0)}
                </div>
                <div style={{ color: "var(--color-magenta)", marginBottom: "1rem" }}>
                  {typeIcons[award.type]}
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--color-magenta)",
                  letterSpacing: "0.15em",
                  marginBottom: "0.5rem",
                }}>
                  {award.year} — {award.position}
                </div>
                <h4 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "var(--color-ivory)",
                  marginBottom: "0.5rem",
                  lineHeight: 1.2,
                }}>
                  {award.title.replace(/^[0-9o]+ Lugar — /, "")}
                </h4>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "var(--color-steel)",
                  marginBottom: "1rem",
                }}>
                  {award.organization}
                </p>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  color: "rgba(122,143,160,0.7)",
                }}>
                  {award.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Certificacoes e cursos em linha do tempo */}
        <div>
          <h3 style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--color-steel)",
            marginBottom: "2.5rem",
          }}>
            Certificacoes & Formacoes
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {otherEntries.map((item, i) => (
              <div
                key={item.id}
                data-award-item
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: "2rem",
                  borderTop: "1px solid var(--color-border)",
                  padding: "1.5rem 0",
                  opacity: prefersReduced ? 1 : 0,
                  alignItems: "start",
                }}
                aria-label={item.title}
              >
                {/* Ano */}
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: typeColors[item.type] || "var(--color-steel)",
                  letterSpacing: "0.1em",
                  paddingTop: "0.25rem",
                }}>
                  {item.year}
                </div>

                {/* Conteudo */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <span style={{ color: typeColors[item.type] || "var(--color-steel)" }}>
                      {typeIcons[item.type]}
                    </span>
                    <h4 style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--color-ivory)",
                    }}>
                      {item.title}
                    </h4>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8rem",
                    color: "var(--color-steel)",
                    marginBottom: "0.5rem",
                  }}>
                    {item.organization}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.875rem",
                    lineHeight: 1.65,
                    color: "rgba(122,143,160,0.65)",
                  }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
