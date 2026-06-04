/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-15deg)' },
          '50%':       { transform: 'rotate(15deg)' },
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        wiggle:       'wiggle 1s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
