module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#f8f9fa',
          text: '#1e1e1e',
          accent: '#2563eb',
        },
        dark: {
          background: '#121212',
          text: '#f4f4f5',
          accent: '#3b82f6',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};