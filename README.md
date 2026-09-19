# Portfolio Nicolas Giussani — Default Solucoes Tecnologicas

**"Tecnologia que ganha forma."**

Portfolio tecnologico imersivo com conceito "Renascenca Digital" — combinando estetica editorial classica com tecnologia contemporanea.

## Instalacao

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de producao
npm run build

# Preview da producao
npm start
```

## Estrutura do Projeto

```
src/
  app/              — Layout root, pagina principal, metadata
  components/
    layout/         — Header, Footer, CustomCursor, ScrollProgress
    navigation/     — SideNav (menu lateral com numeros romanos)
    sections/       — Hero, Projetos, Servicos, Sobre, Reconhecimentos, Contato
    three/          — Canvas Three.js para efeito de particulas no hero
  data/             — Conteudo centralizado (projetos, perfil, servicos, premios)
  hooks/            — Hooks customizados (reducedMotion, mediaQuery, etc)
  types/            — Tipos TypeScript compartilhados

public/
  assets/
    images/         — Substituir og-image.jpg e foto do perfil
    models/         — Modelos 3D GLB (opcional)
```

## Como Personalizar

### Trocar textos e dados
Todos os dados estao centralizados em `src/data/`:

- **`profile.ts`** — Nome, bio, email, redes sociais, tecnologias, timeline
- **`projects.ts`** — Projetos: titulo, descricao, tecnologias, categoria
- **`services.ts`** — Servicos oferecidos
- **`awards.ts`** — Premios e certificacoes

### Trocar links sociais
Em `src/data/profile.ts`, substitua os campos `url` com os links reais:
```ts
social: [
  { platform: "GitHub",   url: "https://github.com/SEU_USUARIO" },
  { platform: "LinkedIn", url: "https://linkedin.com/in/SEU_PERFIL" },
  { platform: "Email",    url: "mailto:SEU@EMAIL.COM" },
],
```

### Adicionar foto de perfil
1. Coloque a foto em `public/assets/images/nicolas-giussani.jpg`
2. Em `AboutSection.tsx`, substitua o SVG placeholder por:
   ```tsx
   import Image from "next/image";
   <Image src="/assets/images/nicolas-giussani.jpg" alt="Nicolas Giussani" fill objectFit="cover" />
   ```

### Trocar OG image
Coloque a imagem em `public/assets/images/og-image.jpg` (1200x630px)

### Configurar envio de formulario
Para integrar o formulario de contato:

1. Crie `src/app/api/contact/route.ts`
2. Configure a chave de API em `.env.local`
3. Em `ContactSection.tsx`, substitua o `setTimeout` pela chamada real

Opcoes de integracao:
- **Resend**: `RESEND_API_KEY`
- **Formspree**: Configure o endpoint no form
- **EmailJS**: `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`

## Deploy na Vercel

1. Faca push para o GitHub (ja configurado)
2. Acesse vercel.com e importe o repositorio
3. Configuracoes automaticas para Next.js
4. Defina variaveis de ambiente se necessario (API keys)

## Tecnologias

- **Next.js 15** com App Router
- **TypeScript** estrito
- **Tailwind CSS** + CSS custom properties (design tokens)
- **Three.js** — campo de particulas no hero
- **GSAP + ScrollTrigger** — sistema central de animacoes
- **Lucide React** — icones funcionais

## Assets a Substituir

| Asset | Local | Descricao |
|-------|-------|-----------|
| Foto de perfil | `public/assets/images/nicolas-giussani.jpg` | Foto real do Nicolas |
| OG Image | `public/assets/images/og-image.jpg` | Imagem para redes sociais (1200x630) |
| CV | `public/assets/cv-nicolas-giussani.pdf` | Curriculo em PDF |
| Favicon | `public/favicon.ico` | Icone do site |
| Links sociais | `src/data/profile.ts` | URLs reais do GitHub, LinkedIn, email |
| Email de contato | `src/data/profile.ts` | Email real para contato |

## Licenca

Projeto privado — Nicolas Giussani / Default Solucoes Tecnologicas
