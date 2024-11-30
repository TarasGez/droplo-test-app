import type { Config } from 'tailwindcss'

export default {
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        primary: '#101828',
        secondary: '#344054',
        tertiary: '#475467',
        quaternary: '#667085',
        'body-bg': '#F5F5F5',
        'primary-bg': '#FFFFFF',
        'secondary-bg': '#F9FAFB',
        'primary-border': '#D0D5DD',
        'secondary-border': '#EAECF0',
        'quaternary-border': '#667085',
        'primary-button': '#7F56D9',
        'primary-button-hover': '#6B46C1',
        'secondary-button': '#6941C6',
      },
      height: {
        '19.5': '78px',
      },
    },
  },
  plugins: [],
} satisfies Config
