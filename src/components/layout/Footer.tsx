export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      role="contentinfo"
      style={{
        padding: "2rem var(--section-pad-x)",
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        letterSpacing: "0.12em",
        color: "var(--color-steel)",
        textTransform: "uppercase",
      }}>
        &copy; {year} Nicolas Giussani — Default Solucoes Tecnologicas
      </p>
      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        letterSpacing: "0.1em",
        color: "rgba(122,143,160,0.4)",
      }}>
        Tecnologia que ganha forma.
      </p>
    </footer>
  );
}
