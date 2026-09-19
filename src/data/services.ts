import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "web",
    number: "01",
    title: "Desenvolvimento Web",
    description:
      "Sites, sistemas e plataformas web com foco em performance, acessibilidade e experiencia do usuario. Do landing page ao sistema complexo.",
    icon: "Globe",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "APIs"],
  },
  {
    id: "mobile",
    number: "02",
    title: "Aplicativos Mobile",
    description:
      "Apps iOS e Android com Flutter ou React Native. Interfaces fluidas, integracao com APIs e publicacao nas lojas.",
    icon: "Smartphone",
    tags: ["Flutter", "React Native", "Dart", "Firebase"],
  },
  {
    id: "systems",
    number: "03",
    title: "Sistemas Personalizados",
    description:
      "Solucoes desktop e backend sob medida para automacao de processos, integracao de dados e fluxos de trabalho especificos.",
    icon: "Settings",
    tags: ["Python", "Electron", "Databases", "REST", "Automacao"],
  },
  {
    id: "ai",
    number: "04",
    title: "Inteligencia Artificial",
    description:
      "Modelos de ML/DL para classificacao, predicao e analise. Integracao de LLMs e APIs de IA em produtos existentes.",
    icon: "Brain",
    tags: ["TensorFlow", "PyTorch", "LLMs", "Scikit-learn"],
  },
  {
    id: "vision",
    number: "05",
    title: "Visao Computacional",
    description:
      "Deteccao de objetos, analise de imagens e video em tempo real. Aplicacoes industriais, urbanas e de seguranca.",
    icon: "Eye",
    tags: ["YOLO", "OpenCV", "Python", "TensorFlow"],
  },
  {
    id: "automation",
    number: "06",
    title: "Automacao de Processos",
    description:
      "Eliminacao de tarefas repetitivas com scripts, bots e integracao entre sistemas. Aumento de produtividade com ROI rapido.",
    icon: "Zap",
    tags: ["Python", "Selenium", "APIs", "Webhooks", "n8n"],
  },
  {
    id: "consulting",
    number: "07",
    title: "Consultoria em Tecnologia",
    description:
      "Analise de arquitetura, escolha de stack, revisao de codigo e planejamento tecnico para startups e empresas em crescimento.",
    icon: "Lightbulb",
    tags: ["Arquitetura", "Cloud", "DevOps", "Code Review"],
  },
  {
    id: "security",
    number: "08",
    title: "Redes e Ciberseguranca",
    description:
      "Configuracao de redes, hardening de sistemas, analise de vulnerabilidades e boas praticas de seguranca para ambientes corporativos.",
    icon: "Shield",
    tags: ["Linux", "Firewall", "VPN", "Pentest", "Cisco"],
  },
];
