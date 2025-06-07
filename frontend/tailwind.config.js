module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#f5f7fa',
          surface: '#ffffff',
          text: '#1a1a1a',
          textSecondary: '#4b5563',
          primary: '#4f46e5',
          primaryLight: '#6366f1',
          secondary: '#10b981',
          accent: '#f59e0b',
        },
        dark: {
          background: '#0f172a',
          surface: '#1e293b',
          text: '#f8fafc',
          textSecondary: '#94a3b8',
          primary: '#818cf8',
          primaryDark: '#6366f1',
          secondary: '#34d399',
          accent: '#fbbf24',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};