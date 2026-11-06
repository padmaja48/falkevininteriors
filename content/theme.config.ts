/**
 * Theme tokens — injected as CSS variables in the root layout.
 * Swap these values per client without touching component code.
 */
export const theme = {
  colors: {
    background: "#F6F3EC",
    secondary: "#E8E2D6",
    text: "#1A1A1A",
    deep: "#12261F",
    accent: "#C5A059",
    muted: "#6B635B",
    white: "#FFFFFF",
    overlay: "rgba(11, 30, 25, 0.5)",
  },
  fonts: {
    heading: "var(--font-heading)",
    body: "var(--font-body)",
  },
  radii: {
    none: "0",
    sm: "2px",
    md: "4px",
  },
} as const;

export type Theme = typeof theme;

/** CSS custom properties string for :root (without --color- prefix; maps to Tailwind) */
export function themeToCssVars(): string {
  return `
    --background: ${theme.colors.background};
    --secondary: ${theme.colors.secondary};
    --text: ${theme.colors.text};
    --deep: ${theme.colors.deep};
    --accent: ${theme.colors.accent};
    --muted: ${theme.colors.muted};
    --white: ${theme.colors.white};
    --overlay: ${theme.colors.overlay};
    --radius-sm: ${theme.radii.sm};
    --radius-md: ${theme.radii.md};
  `.trim();
}
