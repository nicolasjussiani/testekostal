import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Nicolas Giussani",
  tagline: "Engenheiro de Computacao & Desenvolvedor",
  bio: "Estudante de Engenharia da Computacao apaixonado por construir solucoes reais. Atuo nas intersecoes entre software, inteligencia artificial, redes e experiencias digitais — sempre com foco em impacto pratico e qualidade de execucao.",
  location: "Sao Paulo, Brasil",
  education: "Engenharia da Computacao",
  email: "nicolas@default.dev", // Substituir pelo email real
  cvUrl: "/assets/cv-nicolas-giussani.pdf", // Substituir pelo CV real
  social: [
    {
      platform: "GitHub",
      url: "https://github.com/nicolasjussiani", // Substituir se necessario
      label: "nicolasjussiani no GitHub",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/nicolas-giussani", // Substituir pelo URL real do LinkedIn
      label: "Nicolas Giussani no LinkedIn",
    },
    {
      platform: "Email",
      url: "mailto:nicolas@default.dev", // Substituir pelo email real
      label: "Enviar email para Nicolas",
    },
  ],
  technologies: [
    "Python",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Flutter",
    "Flask",
    "OpenCV",
    "YOLO",
    "TensorFlow",
    "Pandas",
    "SQL",
    "Linux",
    "Docker",
    "Git",
    "Redes",
    "Ciberseguranca",
  ],
  timeline: [
    {
      year: "2022",
      title: "Inicio em Engenharia da Computacao",
      description: "Ingresso na graduacao com foco em desenvolvimento de software e sistemas embarcados.",
    },
    {
      year: "2023",
      title: "Primeiros projetos profissionais",
      description: "Desenvolvimento de aplicacoes desktop com Python e automacoes para pequenas empresas.",
    },
    {
      year: "2024",
      title: "1o Lugar — Hackacripto",
      description: "Vencedor da competicao de criptografia e seguranca digital com solucao inovadora.",
    },
    {
      year: "2025",
      title: "3o Lugar — II Maratona UNAERP",
      description: "Reconhecimento em maratona de programacao com projeto de visao computacional.",
    },
    {
      year: "2025",
      title: "Default – Solucoes Tecnologicas",
      description: "Fundacao da marca para reunir projetos de software, IA e solucoes digitais.",
    },
  ],
};
