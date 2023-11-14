/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridColumn: {
        'span-1/2': '1 / span 2',
      },
      colors: {
        highlighted: '#0F62FE',
      },
      fontSize: {
        xxs: '0.625rem',
      },
    },
  },
  plugins: [],
}
