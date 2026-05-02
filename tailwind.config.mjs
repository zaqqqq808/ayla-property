/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C2A973',
          dark: '#A8915F',
          light: '#D4BF8E',
        },
        olive: {
          DEFAULT: '#2A7A55',
          dark: '#1E6244',
        },
        brown: {
          DEFAULT: '#5C2E1F',
          dark: '#3F1F15',
        },
        cream: '#F5EDE0',
        beige: '#DCD4C4',
      },
      fontFamily: {
        sans: ['"Times New Roman"', 'Times', 'serif'],
        display: ['Lato', 'sans-serif'],
        serif: ['Cinzel', 'serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
