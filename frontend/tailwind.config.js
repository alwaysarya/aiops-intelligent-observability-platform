/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        text: { primary: '#1D1D1F', secondary: '#6E6E73', tertiary: '#86868B' },
      },
      fontFamily: { sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Inter', 'sans-serif'] },
      keyframes: {
        shimmer: { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        pulseDot: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.3' } },
      },
      animation: {
        shimmer: 'shimmer 8s ease-in-out infinite',
        pulseDot: 'pulseDot 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
