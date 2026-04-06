import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1858ae',
          dark: '#0f3f82',
          light: '#2d73d4',
        },
        accent: {
          DEFAULT: '#2d73d4',
          dark: '#1858ae',
          light: '#5b9af5',
        },
        dark: {
          bg: '#08080f',
          surface: '#0e0e1b',
          border: '#1a1a2e',
          muted: '#2a2a4a',
          text: '#f0f0f8',
          subtle: '#8888aa',
        },
        light: {
          bg: '#f8f8ff',
          surface: '#eeeeff',
          border: '#ddddf0',
          muted: '#ccccee',
          text: '#111128',
          subtle: '#666688',
        },
      },
      fontFamily: {
        logo: ['var(--font-borel)', 'cursive'],
        display: ['var(--font-unbounded)', 'sans-serif'],
        heading: ['var(--font-outfit)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'radial-primary': 'radial-gradient(circle, #1858ae22, transparent)',
        'gradient-luxury': 'linear-gradient(135deg, #08080f 0%, #0e0e1b 50%, #08080f 100%)',
      },
      animation: {
        'ticker': 'ticker 30s linear infinite',
        'clients': 'clients 25s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        clients: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(45, 115, 212, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(45, 115, 212, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'cinematic': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
    },
  },
  plugins: [],
}

export default config
