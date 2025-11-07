/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6E2BB9',
          dark: '#2B0A4A',
          light: '#8A4FD0'
        },
        secondary: {
          DEFAULT: '#4A158A',
          dark: '#350A6A',
          light: '#5F2AA0'
        },
        lilac: {
          DEFAULT: '#D8B4FE',
          light: '#E6D0FF',
          dark: '#C090F0'
        },
        pink: {
          DEFAULT: '#EC4899',
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843'
        },
        green: {
          DEFAULT: '#10B981',
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B'
        },
        red: {
          DEFAULT: '#EF4444',
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D'
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#F9FAFB',
          darker: '#F3F4F6'
        },
        border: {
          DEFAULT: '#E5E7EB',
          dark: '#D1D5DB'
        },
        text: {
          DEFAULT: '#111827',
          secondary: '#6B7280'
        },
        background: {
          DEFAULT: '#2B0A4A',
          dark: '#1A0533',
          light: '#3D1A6A'
        }
      },
      boxShadow: {
        soft: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        hover: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        modal: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      },
      borderRadius: {
        'md': '12px',
        'lg': '20px',
        'full': '9999px'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        ui: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(to right, #2D0A5A, #4A158A)',
      },
    },
  },
  plugins: [],
};