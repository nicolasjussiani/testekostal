import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "solarapp",
    number: "01",
    title: "SolarApp",
    subtitle: "Análise de Potencial Solar",
    description:
      "Plataforma para análise de potencial solar, simulação de geração de energia, cálculo de economia e agendamento de atendimento. Combina APIs de dados climáticos com geolocalização para entregar análises precisas por região.",
    technologies: ["Python", "Flask", "Google Maps", "Solar APIs", "JavaScript"],
    category: "Web Platform",
    color: "#1a3d2b",
    accentColor: "#c2185b",
    featured: true,
  },
  {
    id: "nfe-processor",
    number: "02",
    title: "Processador de NFe",
    subtitle: "Automação Tributária Desktop",
    description:
      "Aplicação desktop para leitura de XML de notas fiscais eletrônicas, conferência tributária automatizada, agrupamento inteligente de produtos e geração de relatórios em Excel. Elimina horas de trabalho manual.",
    technologies: ["Python", "CustomTkinter", "Pandas", "OpenPyXL"],
    category: "Desktop App",
    color: "#1a1a2e",
    accentColor: "#b8922a",
    featured: true,
  },
  {
    id: "urban-waste",
    number: "03",
    title: "Detecção de Lixo Urbano",
    subtitle: "Visão Computacional",
    description:
      "Sistema de visão computacional para detectar resíduos em imagens urbanas, gerar estatísticas por região e período, e apoiar a gestão pública de saneamento com dados precisos e mapas de calor.",
    technologies: ["YOLO", "OpenCV", "Python", "Street View API"],
    category: "Computer Vision",
    color: "#0d2137",
    accentColor: "#c2185b",
    featured: true,
  },
  {
    id: "web-mobile",
    number: "04",
    title: "Soluções Web & Mobile",
    subtitle: "Interfaces e Experiências Digitais",
    description:
      "Interfaces, aplicativos e experiências digitais desenvolvidas para empresas e projetos personalizados. Do protótipo ao produto, com foco em performance, acessibilidade e experiência do usuário.",
    technologies: ["React", "Next.js", "Flutter", "REST APIs", "Automações"],
    category: "Full Stack",
    color: "#1a0d2e",
    accentColor: "#b8922a",
    featured: false,
  },
];
