/** @type {import('tailwindcss').Config} */

const INK = 'rgb(45 45 45)';

/**
 * Hand-drawn radii.
 * These are deliberately irregular ellipses - the system has no straight lines.
 * Reach for `rounded-wobbly*` instead of `rounded-*` anywhere visible.
 */
const wobblyLg = '320px 18px 300px 22px / 22px 300px 18px 320px';
const wobblyMd = '210px 14px 190px 16px / 16px 190px 14px 210px';
const wobblySm = '110px 9px 95px 11px / 11px 95px 9px 110px';
const wobbly = '255px 15px 225px 15px / 15px 225px 15px 255px';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: 'rgb(253 251 247 / <alpha-value>)',
          card: 'rgb(255 255 255 / <alpha-value>)',
          deep: 'rgb(242 237 227 / <alpha-value>)',
          muted: 'rgb(229 224 216 / <alpha-value>)',
        },
        postit: {
          DEFAULT: 'rgb(255 249 196 / <alpha-value>)',
          soft: 'rgb(255 244 163 / <alpha-value>)',
        },
        ink: {
          DEFAULT: `rgb(45 45 45 / <alpha-value>)`,
          soft: 'rgb(90 87 81 / <alpha-value>)',
          faint: 'rgb(138 133 124 / <alpha-value>)',
          night: 'rgb(36 33 29 / <alpha-value>)',
        },
        marker: {
          DEFAULT: 'rgb(255 77 77 / <alpha-value>)',
          soft: 'rgb(255 227 227 / <alpha-value>)',
        },
        ballpoint: {
          DEFAULT: 'rgb(45 93 161 / <alpha-value>)',
          soft: 'rgb(227 235 247 / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'rgb(180 83 9 / <alpha-value>)',
          soft: 'rgb(251 191 36 / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['Kalam', 'ui-rounded', '"Segoe UI"', 'sans-serif'],
        hand: ['"Patrick Hand"', 'ui-rounded', '"Segoe UI"', 'sans-serif'],
        sans: ['"Patrick Hand"', 'ui-rounded', '"Segoe UI"', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        wobbly,
        'wobbly-sm': wobblySm,
        'wobbly-md': wobblyMd,
        'wobbly-lg': wobblyLg,
      },
      boxShadow: {
        hard: `4px 4px 0 0 ${INK}`,
        'hard-sm': `2px 2px 0 0 ${INK}`,
        'hard-lg': `8px 8px 0 0 ${INK}`,
        'hard-marker': `4px 4px 0 0 rgb(255 77 77)`,
        'hard-ballpoint': `4px 4px 0 0 rgb(45 93 161)`,
        paper: '3px 3px 0 0 rgb(45 45 45 / 0.1)',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wobble: {
          '0%, 100%': { transform: 'rotate(-1.5deg)' },
          '50%': { transform: 'rotate(1.5deg)' },
        },
      },
      animation: {
        bounce: 'bounce 3s ease-in-out infinite',
        wobble: 'wobble 6s ease-in-out infinite',
      },
    },
  },
  experimental: {
    customGroupVariants: true,
  },
}