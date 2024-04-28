/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily : {
        antonio: ['Antonio', 'sans-serif']
      },
      colors : {
        'red': '#ff4654',
        'silver': '#ece7e1',
        'dark': '#0f1923'
      },
    },
  },
  plugins: [],
}
