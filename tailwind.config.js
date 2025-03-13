/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          'dark-primary': '#111827',
          'dark-secondary': '#10141c',
          'accent': '#3B82F6', // Blue accent color
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          pulse: {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.8 },
          },
        },
        animation: {
          fadeIn: 'fadeIn 0.8s ease-in-out forwards',
          slideUp: 'slideUp 0.6s ease-out forwards',
          float: 'float 3s ease-in-out infinite',
          pulse: 'pulse 2s ease-in-out infinite',
        },
      },
    },
    plugins: [],
  }