import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#e0f2fe',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#082f49',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0369a1',
          600: '#0c4a6e',
          700: '#082f49',
          900: '#0c1e2e',
        },
        success: {
          50: '#f0fdf4',
          500: '#4CAF50',
          600: '#3d8b40',
          700: '#2d6830',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        danger: {
          50: '#fef2f2',
          500: '#E74C3C',
          600: '#c0392b',
          700: '#922b21',
        },
      },
    },
  },
} satisfies Config
