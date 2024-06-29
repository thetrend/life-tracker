/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        app: {
          primary: '#F83073',
          accent: {
            light: '#A2FF56',
            dark: '#8C49EB',
          },
          bg: {
            dark: '#101023',
            light: '#f7f7f7',
          },
        },
      },
    },
  },
  plugins: [],
}
