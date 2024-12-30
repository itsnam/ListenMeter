/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          100: '#85d7ff',
          200: '#1fb6ff',
          300: '#009eeb',
          400: '#0077cc',
          500: '#0062a1',
          600: '#004085',
          700: '#002f59',
          800: '#001c3d',
          900: '#000f23',
        },
      },
      backgroundImage: {
        'home-background': 'linear-gradient(to right, #003366, #182B3A)',
      },
    },
  },
  plugins: [],
}

