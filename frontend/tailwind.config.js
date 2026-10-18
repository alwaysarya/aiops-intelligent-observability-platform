/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        apple: {
          blue: '#0071E3', blueHover: '#0077ED', cyan: '#5AC8FA',
          teal: '#2DD4BF', green: '#30D158', purple: '#AF52DE',
          indigo: '#5E5CE6', orange: '#FF9F0A', red: '#FF453A',
          pink: '#FF6B9D', yellow: '#FFD60A',
        },
        ink: { bg: '#FBFBFD', card: '#FFFFFF', grey: '#F5F5F7' },
        text: { primary: '#1D1D1F', secondary: '#6E6E73', tertiary: '#86868B', muted: '#AEAEB2' },
        dark: { bg: '#0A0A0F', darker: '#050508', card: '#14141A' }
      },
      fontFamily: { sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Inter', 'sans-serif'] },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.04)',
        'card-hover': '0 20px 60px -15px rgba(0,0,0,0.1)',
        'button-glow': '0 12px 40px -8px rgba(0,113,227,0.6)',
        'dark-card': '0 30px 80px -20px rgba(0,0,0,0.4)',
        'nav-dropdown': '0 20px 60px -15px rgba(0,0,0,0.15), 0 4px 20px -4px rgba(0,0,0,0.08)',
      },
      animation: {
        'blob': 'blob 12s ease-in-out infinite',
        'shimmer': 'shimmer 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-dot': 'pulseDot 1.5s ease-in-out infinite',
      },
      keyframes: {
        blob: { '0%, 100%': { transform: 'scale(1)', opacity: '0.35' }, '50%': { transform: 'scale(1.15)', opacity: '0.55' } },
        shimmer: { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-40px)' } },
        pulseDot: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.3' } },
      },
    },
  },
  plugins: [],
}
