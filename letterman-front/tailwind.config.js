/** @type {import('tailwindcss').Config} */

// const { start } = require('repl');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['Dongle', 'sans-serif'],
      },
      colors: {
        grey: '#D9D9D9',
        purple: '#CAD6FF',
        'regal-blue': '#243c5a',
        button: '#677DC6',
        holder: '#9CA6C5',
        background: '#0E1733',
        subBackground: '#ECF0FF',
      },
      width: {
        128: '40rem',
        w43: '43rem',
        w38: '38rem',
        winput: '580px',
      },
    },
  },
  plugins: [],
};
