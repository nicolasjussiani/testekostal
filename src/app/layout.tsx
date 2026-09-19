import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nicolas Giussani — Default Solucoes Tecnologicas",
  description:
    "Portfolio de Nicolas Giussani, engenheiro de computacao e desenvolvedor especializado em IA, visao computacional, desenvolvimento web, mobile e solucoes personalizadas.",
  keywords: [
    "Nicolas Giussani",
    "Default Solucoes Tecnologicas",
    "portfolio",
    "engenharia computacao",
    "desenvolvimento web",
    "inteligencia artificial",
    "visao computacional",
    "flutter",
    "react",
    "python",
    "sao paulo",
  ],
  authors: [{ name: "Nicolas Giussani", url: "https://github.com/nicolasjussiani" }],
  creator: "Nicolas Giussani",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Nicolas Giussani — Default Solucoes Tecnologicas",
    description:
      "Portfolio tecnologico imersivo. Engenharia, IA e experiencias digitais para transformar ideias em produtos reais.",
    siteName: "Default Solucoes Tecnologicas",
    images: [
      {
        url: "/assets/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nicolas Giussani — Default Solucoes Tecnologicas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicolas Giussani — Default Solucoes Tecnologicas",
    description: "Portfolio tecnologico imersivo. Engenharia, IA e experiencias digitais.",
    images: ["/assets/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 btn btn--primary">
          Pular para o conteudo principal
        </a>
        {children}
      </body>
    </html>
  );
}
