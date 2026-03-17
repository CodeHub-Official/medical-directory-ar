/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066cc',
        secondary: '#f0f4f8',
        accent: '#ff6b35',
      },
      fontFamily: {
        arabic: ['Cairo', 'sans-serif'],
      },
      direction: ['ltr', 'rtl'],
    },
  },
  plugins: [],
  corePlugins: {
    direction: true,
  },
};
