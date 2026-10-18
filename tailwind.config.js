/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f6f3ee',
        ink: '#111111',
        red: { DEFAULT: '#e0222d', deep: '#b3131d' },
        night: '#0c0c0e',
        mute: '#8a857b',
      },
      fontFamily: {
        display: ['"Archivo Black"', '"Noto Sans SC"', 'sans-serif'],
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        cnserif: ['"Noto Serif SC"', '"Songti SC"', 'SimSun', 'serif'],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(.22,1,.36,1)',
      },
    },
  },
  plugins: [],
}
