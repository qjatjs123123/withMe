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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      keyframes: {
        fillAnimation: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        fill: 'fillAnimation 0.5s ease-out',
      },
    },
  },
  plugins: [],
};
