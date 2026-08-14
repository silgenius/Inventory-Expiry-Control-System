export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b'
        },
        navy: {
          50: '#f4f6f9',
          100: '#e5e9f0',
          200: '#c7cedd',
          300: '#9aa7c2',
          400: '#67779f',
          500: '#465a82',
          600: '#354569',
          700: '#293656',
          800: '#1c2540',
          900: '#0f1526'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(15, 21, 38, 0.04), 0 1px 3px 0 rgba(15, 21, 38, 0.06)',
        popover: '0 10px 30px -5px rgba(15, 21, 38, 0.15)'
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem'
      }
    }
  },
  plugins: []
}
