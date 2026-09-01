/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        kachang: {
          pink: '#FF6B8B',
          softpink: '#FFE5EC',
          coral: '#FF8E72',
          green: '#48BB78',
          softgreen: '#E6F4EA',
          yellow: '#ECC94B',
          softyellow: '#FEF9C3',
          purple: '#9F7AEA',
          softpurple: '#F3E8FF',
          dark: '#1E293B',
          card: '#FFFFFF',
          bg: '#F8F9FA'
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'float': '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 25px rgba(255, 107, 139, 0.35)',
      },
      keyframes: {
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(0.98)' },
        },
        drip: {
          '0%': { transform: 'translateY(0) scaleY(1)', opacity: '0.8' },
          '50%': { transform: 'translateY(8px) scaleY(1.4)', opacity: '1' },
          '100%': { transform: 'translateY(16px) scaleY(1)', opacity: '0' },
        }
      },
      animation: {
        'bounce-slow': 'bounceSlow 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'drip': 'drip 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
