import { createContext, useContext, useEffect } from "react";

const ThemeContext = createContext();

const designTokens = {
  // Terminal CLI foundation
  "--background": "#0a0a0a",
  "--foreground": "#e4e4e5",
  "--card": "#121212",
  "--card-foreground": "#e4e4e5",
  "--muted": "#1a1a1a",
  "--muted-foreground": "#a1a1aa",
  "--border": "#2a2a2a",
  "--input": "#2a2a2a",

  // Terminal green (primary accent - interactive/code)
  "--accent": "#33ff00",
  "--terminal-green": "#33ff00",
  "--terminal-amber": "#ffb000",
  "--terminal-border": "#1f521f",
  "--terminal-text": "#1a1a1a",

  // Electric blue (secondary accent - CTAs, gradient highlights)
  "--accent-secondary": "#0052ff",
  "--electric-blue": "#0052ff",
  "--electric-blue-light": "#4d7cff",

  // Burnished gold (tertiary accent - premium details)
  "--accent-tertiary": "#b8860b",
  "--gold": "#b8860b",
  "--gold-light": "#d4a84b",

  "--accent-foreground": "#0a0a0a",
  "--ring": "#33ff00",
  "--error": "#ff4d4d",

  // Serif palette (adapted to dark)
  "--ivory": "#fafaf8",
  "--rich-black": "#1a1a1a",
  "--warm-gray": "#6b6b6b",
  "--warm-border": "#3a352d",

  // Hand-drawn palette
  "--paper-warm": "#fdfbf7",
  "--pencil-black": "#2d2d2d",
  "--correction-red": "#ff4d4d",
  "--postit-yellow": "#fff9c4",
};

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(designTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Handle reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleReducedMotion = (e) => {
      root.classList.toggle("reduce-motion", e.matches);
    };
    handleReducedMotion(mediaQuery);
    mediaQuery.addEventListener("change", handleReducedMotion);

    return () => {
      mediaQuery.removeEventListener("change", handleReducedMotion);
    };
  }, []);

  return children;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return { designTokens };
  }
  return context;
};

export default ThemeProvider;
