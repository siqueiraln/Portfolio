/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic, theme-aware tokens (mapped to CSS vars in index.css)
        bg:        'rgb(var(--bg) / <alpha-value>)',
        surface:   'rgb(var(--surface) / <alpha-value>)',
        card:      'rgb(var(--card) / <alpha-value>)',
        line:      'rgb(var(--line) / <alpha-value>)',
        'line-strong': 'rgb(var(--line-strong) / <alpha-value>)',
        ink:       'rgb(var(--ink) / <alpha-value>)',
        muted:     'rgb(var(--muted) / <alpha-value>)',
        subtle:    'rgb(var(--subtle) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          hover:   'rgb(var(--accent-hover) / <alpha-value>)',
          soft:    'rgb(var(--accent-soft) / <alpha-value>)',
        },
        'on-accent': 'rgb(var(--on-accent) / <alpha-value>)',
        whatsapp: {
          DEFAULT: '#25D366',
          hover:   '#1faa54',
        },
        // Legacy brand ramp kept for any stray reference; prefer semantic tokens.
        brand: {
          50:  '#f0eeff',
          100: '#e2deff',
          200: '#c9c4ff',
          300: '#a8a3d8',
          400: '#9290c3',
          500: '#7875b5',
          600: '#535c91',
          700: '#3d4578',
          800: '#1b1a55',
          900: '#0f1340',
          950: '#070f2b',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Special Gothic Expanded One"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:      '0 1px 2px rgb(var(--shadow) / 0.04), 0 8px 24px rgb(var(--shadow) / 0.06)',
        'card-hover': '0 2px 4px rgb(var(--shadow) / 0.06), 0 16px 40px rgb(var(--shadow) / 0.10)',
      },
      keyframes: {
        modalIn: {
          from: { opacity: '0', transform: 'scale(0.97) translateY(8px)' },
          to:   { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        modalIn: 'modalIn 0.22s cubic-bezier(0.16,1,0.3,1)',
      },
    },
  },
  plugins: [],
}
