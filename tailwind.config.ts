import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          700: '#625A55',
          600: '#6D645F',
          500: '#746A64',
          DEFAULT: '#746A64',
        },
        secondary: '#212121',
        neutral: {
          500: '#757575',
          300: '#DEDEDE',
          100: '#F5F5F5',
          50: '#FAFAFA',
          DEFAULT: '#757575',
        },
      },
      lineHeight: {
        'semi-loose': '24px',
      },
    },
  },
  plugins: [],
} satisfies Config;
