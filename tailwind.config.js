/** @type {import('tailwindcss').Config} */

import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        handwritten: ['Kalam', 'cursive'],
        'handwritten-2': ['Patrick Hand', 'cursive'],
      },
      colors: {
        // Terminal CLI foundation
        'terminal-bg': '#0a0a0a',
        'terminal-green': '#33ff00',
        'terminal-amber': '#ffb000',
        'terminal-border': '#1f521f',
        'terminal-text': '#1a1a1a',

        // Serif palette (adapted to dark)
        'ivory': '#fafaf8',
        'rich-black': '#1a1a1a',
        'warm-gray': '#6b6b6b',
        'gold': '#b8860b',
        'gold-light': '#d4a84b',
        'warm-border': '#3a352d',

        // Minimalist Modern accents
        'electric-blue': '#0052ff',
        'electric-blue-light': '#4d7cff',

        // Hand-drawn accents
        'paper-warm': '#fdfbf7',
        'pencil-black': '#2d2d2d',
        'correction-red': '#ff4d4d',
        'postit-yellow': '#fff9c4',

        // Unified token aliases
        background: '#0a0a0a',
        foreground: '#e4e4e5',
        muted: '#121212',
        'muted-foreground': '#a1a1aa',
        accent: '#33ff00',
        'accent-secondary': '#0052ff',
        'accent-tertiary': '#b8860b',
        'accent-foreground': '#0a0a0a',
        border: '#2a2a2a',
        card: '#121212',
        ring: '#33ff00',
        error: '#ff4d4d',
      },
      borderRadius: {
        wobbly: '255px 15px 225px 15px / 15px 225px 15px 255px',
        wobblyMd: '15px 225px 15px 255px / 225px 15px 255px 15px',
        terminal: '0px',
        xl: '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'glow-green': '0 0 14px rgba(51, 255, 0, 0.35)',
        'glow-blue': '0 0 24px rgba(0, 82, 255, 0.35)',
        'glow-gold': '0 0 20px rgba(184, 134, 11, 0.35)',
        'offset-sm': '3px 3px 0px 0px rgba(51, 255, 0, 0.35)',
        'offset-md': '4px 4px 0px 0px #33ff00',
        'terminal-card': '0 4px 12px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gradient-electric': 'linear-gradient(to right, #0052FF, #4D7CFF)',
        'gradient-electric-diagonal': 'linear-gradient(135deg, #0052FF, #4D7CFF)',
        'gradient-gold': 'linear-gradient(to right, #B8860B, #D4A84B)',
        'gradient-terminal': 'linear-gradient(135deg, #1f521f, #0a0a0a)',
      },
      animation: {
        blink: 'blink 1.05s steps(2, 1) infinite',
        pulse-glow: 'pulse-glow 2s ease-in-out infinite',
        'float-slow': 'float-slow 5s ease-in-out infinite',
        'float-slower': 'float-slower 7s ease-in-out infinite',
        'rotate-ring': 'rotate-ring 60s linear infinite',
        wobble: 'wobble 4s ease-in-out infinite',
        'bounce-gold': 'bounce-gold 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%, 100%': { opacity: '1' },
          '25%, 75%': { opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(51, 255, 0, 0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(51, 255, 0, 0.7)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slower': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'rotate-ring': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        wobble: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '25%': { transform: 'rotate(1.5deg)' },
          '50%': { transform: 'rotate(-1.5deg)' },
          '75%': { transform: 'rotate(1deg)' },
        },
        'bounce-gold': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.8' },
          '50%': { transform: 'translateY(-5px)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [tailwindScrollbar],
  experimental: {
    customGroupVariants: true,
  },
}
