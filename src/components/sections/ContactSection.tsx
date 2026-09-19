"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, ExternalLink, Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Nome e obrigatorio";
  if (!data.email.trim()) errors.email = "Email e obrigatorio";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Email invalido";
  if (!data.subject.trim()) errors.subject = "Assunto e obrigatorio";
  if (!data.message.trim()) errors.message = "Mensagem e obrigatoria";
  else if (data.message.trim().length < 20) errors.message = "Mensagem muito curta (minimo 20 caracteres)";
  return errors;
}

function Field({
  id, label, type = "text", value, error, onChange, multiline = false, placeholder,
}: {
  id: string; label: string; type?: string; value: string; error?: string;
  onChange: (v: string) => void; multiline?: boolean; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const baseStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--color-bg-card)",
    border: `1px solid ${error ? "var(--color-magenta)" : focused ? "rgba(250,247,240,0.3)" : "var(--color-border)"}`,
    borderRadius: "var(--radius-sm)",
    padding: "1rem 1.2rem",
    fontFamily: "var(--font-sans)",
    fontSize: "0.95rem",
    color: "var(--color-ivory)",
    outline: "none",
    resize: multiline ? "vertical" : undefined,
    minHeight: multiline ? "140px" : undefined,
    transition: "border-color 0.25s",
    display: "block",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: error ? "var(--color-magenta)" : "var(--color-steel)",
        }}
      >
        {label}
        {error && <span style={{ marginLeft: "0.5rem", fontWeight: 400, letterSpacing: 0, textTransform: "none" }}>— {error}</span>}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          style={baseStyle}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          style={baseStyle}
        />
      )}
      {error && (
        <span id={`${id}-error`} role="alert" style={{ display: "none" }}>{error}</span>
      )}
    </div>
  );
}

export default function ContactSection() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(formData);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setFormState("submitting");

    // ==================================================
    // CONFIGURACAO DE ENVIO
    // Para integrar com Resend, Formspree ou EmailJS:
    // 1. Crie um arquivo .env.local com a chave de API
    // 2. Crie uma rota em src/app/api/contact/route.ts
    // 3. Chame essa rota aqui ao inves do setTimeout
    // ==================================================
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(formData) });
      setFormState("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setFormState("error");
    }
  };

  const socialIcons: Record<string, React.ReactNode> = {
    GitHub:   <ExternalLink size={18} aria-hidden="true" />,
    LinkedIn: <ExternalLink size={18} aria-hidden="true" />,
    Email:    <Mail size={18} aria-hidden="true" />,
  };

  return (
    <section
      id="contato"
      ref={sectionRef}
      aria-label="Contato"
      style={{
        padding: "var(--section-pad-y) var(--section-pad-x)",
        background: "var(--color-bg-alt)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="tech-grid" aria-hidden="true" style={{ opacity: 0.04 }} />

      <div style={{ maxWidth: "var(--content-width)", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "1rem" }} data-anim>
          <span className="section-number">VI — Inicio</span>
        </div>

        <h2
          data-anim
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h1)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--color-ivory)",
            marginBottom: "1.5rem",
            maxWidth: "18ch",
            opacity: prefersReduced ? 1 : 0,
          }}
        >
          Vamos construir algo relevante?
        </h2>

        <p data-anim style={{
          fontFamily: "var(--font-sans)",
          fontSize: "1rem",
          lineHeight: 1.75,
          color: "var(--color-steel)",
          maxWidth: "50ch",
          marginBottom: "5rem",
          opacity: prefersReduced ? 1 : 0,
        }}>
          Disponivel para projetos, colaboracoes e consultorias. Respondo em ate 24 horas.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "6rem",
          alignItems: "start",
        }}
        className="contact-grid"
        >
          {/* Formulario */}
          <div data-anim style={{ opacity: prefersReduced ? 1 : 0 }}>
            {formState === "success" ? (
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "4rem 2rem",
                gap: "1.5rem",
                textAlign: "center",
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
              }}
              role="status"
              aria-live="polite"
              >
                <CheckCircle size={40} color="var(--color-magenta)" aria-hidden="true" />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontStyle: "italic", color: "var(--color-ivory)" }}>
                  Mensagem enviada!
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--color-steel)", maxWidth: "35ch" }}>
                  Obrigado pelo contato. Retornarei em breve.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="btn btn--outline"
                  style={{ marginTop: "1rem" }}
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Formulario de contato" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
                  <Field id="contact-name" label="Nome" value={formData.name} error={errors.name} onChange={(v) => setFormData((f) => ({ ...f, name: v }))} placeholder="Seu nome" />
                  <Field id="contact-email" label="Email" type="email" value={formData.email} error={errors.email} onChange={(v) => setFormData((f) => ({ ...f, email: v }))} placeholder="seu@email.com" />
                </div>
                <Field id="contact-subject" label="Assunto" value={formData.subject} error={errors.subject} onChange={(v) => setFormData((f) => ({ ...f, subject: v }))} placeholder="Sobre o que deseja falar?" />
                <Field id="contact-message" label="Mensagem" value={formData.message} error={errors.message} onChange={(v) => setFormData((f) => ({ ...f, message: v }))} multiline placeholder="Descreva seu projeto ou duvida..." />

                {formState === "error" && (
                  <div role="alert" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-magenta)", fontSize: "0.875rem" }}>
                    <AlertCircle size={16} aria-hidden="true" />
                    Erro ao enviar. Tente novamente ou use os canais diretos abaixo.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="btn btn--primary"
                  aria-label="Enviar mensagem de contato"
                  style={{
                    alignSelf: "flex-start",
                    opacity: formState === "submitting" ? 0.7 : 1,
                    cursor: formState === "submitting" ? "wait" : "pointer",
                  }}
                >
                  {formState === "submitting" ? "Enviando..." : "Enviar mensagem"}
                  <Send size={14} aria-hidden="true" />
                </button>
              </form>
            )}

            <style>{`
              @media (max-width: 480px) {
                .form-row { grid-template-columns: 1fr !important; }
              }
            `}</style>
          </div>

          {/* Coluna de info */}
          <div data-anim style={{ opacity: prefersReduced ? 1 : 0 }}>
            <div style={{
              padding: "2.5rem",
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              marginBottom: "2rem",
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--color-magenta)", marginBottom: "1rem" }}>
                STATUS
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} aria-hidden="true" />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 600, color: "var(--color-ivory)" }}>
                  Disponivel para projetos
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--color-steel)" }}>
                Aberto a freelances, consultorias e oportunidades de emprego.
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-steel)",
                marginBottom: "1.5rem",
              }}>
                Canais diretos
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {profile.social.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target={link.platform !== "Email" ? "_blank" : undefined}
                    rel={link.platform !== "Email" ? "noopener noreferrer" : undefined}
                    aria-label={link.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem 1.25rem",
                      background: "var(--color-bg-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-sm)",
                      color: "var(--color-ivory)",
                      textDecoration: "none",
                      transition: "border-color 0.25s, color 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      const a = e.currentTarget;
                      a.style.borderColor = "var(--color-magenta)";
                      a.style.color = "var(--color-magenta)";
                    }}
                    onMouseLeave={(e) => {
                      const a = e.currentTarget;
                      a.style.borderColor = "var(--color-border)";
                      a.style.color = "var(--color-ivory)";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      {socialIcons[link.platform]}
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 500 }}>
                        {link.platform}
                      </span>
                    </div>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}

