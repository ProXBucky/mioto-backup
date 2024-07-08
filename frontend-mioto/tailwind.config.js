/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': { 'max': '640px' },   // smartphone
        'md': { 'min': '641px', 'max': '1024px' }, // tablet
        'lg': { 'min': '1025px', 'max': '1280px' }, // laptop
        'xl': { 'min': '1281px' },  // larger laptop or desktop
        // 'lg': { 'min': '1025px' }, // laptop
      },
      colors: {
        main: '#5fcf86',
      },
      boxShadow: {
        'custom': '0 8px 24px 12px rgba(0,0,0,.08), 0 20px 24px -4px rgba(0,0,0,.08)',
      },
      fontFamily: {
        parfumerie: ['"Parfumerie Script Pro"', 'cursive'],
        copperlove: ['Copperlove', 'cursive'],
        greatvibes: ["Great Vibes", 'cursive'],
        dancingscript: ["Dancing Script", 'cursive'],
        opensans: ["Open Sans", 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.bg-gradient-custom': {
          background: 'linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, .7))',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}