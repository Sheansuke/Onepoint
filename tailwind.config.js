module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#14b8a6',

          secondary: '#0f172a',

          accent: '#1FB2A6',

          neutral: '#FFFFFF',

          'base-100': '#f8fafc',

          info: '#0ea5e9',

          success: '#36D399',

          warning: '#f59e0b',

          error: '#ef4444'
        }
      }
    ]
  },
  theme: {
    extend: {},
    colors: {
      main: {
        primary: '#14b8a6',
        50: '#F0FDFA',
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        400: '#2dd4bf',
        500: '#14b8a6',
        600: '#0d9488',
        700: '#0f766e',
        800: '#115e59',
        900: '#134e4a'
      },
      main2: {
        primary: '#0f172a',
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a'
      },
      mainError: {
        primary: '#ef4444',
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d'
      },
      mainWarning: {
        primary: '#f59e0b',
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f'
      },
      mainInfo: {
        primary: '#0ea5e9',
        50: '#f0f9ff',
        100: '#E0F2FE',
        200: '#BAE6FD',
        300: '#7DD3FC',
        400: '#38BDF8',
        500: '#0EA5E9',
        600: '#0284C7',
        700: '#0369A1',
        800: '#075985',
        900: '#0C4A6E'
      }
    },
    fontFamily: {
      sans: ['Roboto']
    }
  },
  plugins: [require('daisyui')]
}
