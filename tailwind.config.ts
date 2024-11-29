import type { Config } from 'tailwindcss'

export default {
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        background: {
          'bg-secondary': '#F9FAFB',
        },
        border: {
          'border-primarry': '#D0D5DD',
          'border-secondary': '#EAECF0',
        },
        'button-primary-bg': '#7F56D9',
        'button-primary-hover': '#6B46C1',
        gray: {
          50: '#f9fafb',
          100: '#f4f4f5',
          200: '#e4e4e7',
          800: '#1f2937',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
