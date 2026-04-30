/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Ayla Property brand palette (sampled from current site)
        gold: {
          DEFAULT: '#C2A973',
          dark: '#A8915F',
          light: '#D4BF8E',
        },
        olive: {
          DEFAULT: '#6F7A39',
          dark: '#5C6530',
        },
        brown: {
          DEFAULT: '#5C2E1F',
          dark: '#3F1F15',
        },
        cream: '#F5EDE0',
        beige: '#DCD4C4',
      },
      fontFamily: {
        serif: ['Marcellus', 'Cormorant Garamond', 'serif'],
        sans: ['"Open Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Marcellus', 'serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
