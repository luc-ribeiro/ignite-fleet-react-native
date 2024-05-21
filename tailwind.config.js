/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx", "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'brand-light': '#00B37E',
        'brand-mid': '#00875F',
        gray: {
          800: '#202024',
          700: '#29292E',
          600: '#323238',
          500: '#505059',
          400: '#7C7C8A',
          300: '#8D8D99',
          200: '#C4C4CC',
          100: '#E1E1E6'
        },
        white: '#FFFFFF',
        red: {
          500: '#F75A68'
        }
      },
      fontFamily: {
        regular: "Roboto_400Regular",
        bold: "Roboto_700Bold",
      },
      fontSize: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
        xxxl: 32
      }
    },
  },
  plugins: [],
}

