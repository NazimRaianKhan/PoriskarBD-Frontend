/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#388E3C',
        secondary: '#A1887F',
        background: '#FAF3E0',
        accent: '#FF7043',
        textmain: '#3E2723',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(62,39,35,0.10)',
      },
      backgroundImage: {
        hero: 'linear-gradient(135deg, rgba(56,142,60,0.08), rgba(255,112,67,0.08))',
      },
    },
  },
  plugins: [],
};
