/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'max-2xl': { 'max': '1399px' },
        'max-xl': { 'max': '1199px' },
        'max-lg': { 'max': '991px' },
        'max-md': { 'max': '767px' },
        'max-sm': { 'max': '500px' },
      },
      colors:{
        primary: '#060D1D',
        // pokemon types color
        bug: '#99CC33',
        dark: '#333333',
        dragon: '#7038F8',
        electric: '#FFCC33',
        fairy: '#FF99CC',
        fighting: '#FF3333',
        fire: '#FF6633',
        flying: '#6699FF',
        ghost: '#6666CC',
        grass: '#66CC33',
        ground: '#FFCC66',
        ice: '#99FFFF',
        normal: '#FFCC99',
        poison: '#AA66CC',
        psychic: '#AA66CC',
        rock: '#CC9966',
        steel: '#CCCCCC',
        water: '#3399FF',

      },
      safelist: [
        'bg-normal',
        'bg-fire',
        'bg-water',
        'bg-electric',
        'bg-grass',
        'bg-ice',
        'bg-fighting',
        'bg-poison',
        'bg-ground',
        'bg-flying',
        'bg-psychic',
        'bg-bug',
        'bg-rock',
        'bg-ghost',
        'bg-dragon',
        'bg-dark',
        'bg-steel',
        'bg-fairy',
      ],
      fontFamily: {
        primary: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}