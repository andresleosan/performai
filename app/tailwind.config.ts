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
          50: '#f9f5ff',
          100: '#f3ebff',
          500: '#6C3E99',
          600: '#5a3375',
          700: '#4a2860',
          900: '#2a1640',
        },
        secondary: {
          50: '#f0f5ff',
          100: '#e0ebff',
          500: '#003A70',
          600: '#002855',
          700: '#001f3f',
          900: '#000d1a',
        },
        success: {
          50: '#f0fdf4',
          500: '#4CAF50',
          600: '#3d8b40',
          700: '#2d6830',
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
