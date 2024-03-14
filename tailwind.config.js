/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      green : '#14A800',
      grean: {
        100: '#E7F6E7',
        200: '#B2E3B2',
        300: '#7FCE7F',
        400: '#4AA84A',
        500: '#14A800',
        600: '#128B00',
        700: '#0F6E00',
        800: '#0B5100',
        900: '#083400',
      },
      dark: {
        primary: '#1a1a1a',   // Main background color
        secondary: '#262626', // Secondary background color
        tertiary: '#333333',  // Tertiary background color
      },
      color: {
        primary: '#ffffff',   // Main text color
        secondary: '#b3b3b3', // Secondary text color
        tertiary: '#808080',  // Tertiary text color
      },
      yellow: {
        100: '#FFF9E7',
        200: '#FFF0B2',
        300: '#FFE77F',
        400: '#FFDE4A',
        500: '#FFD600',
        600: '#E6BE00',
        700: '#BFA700',
        800: '#997F00',
        900: '#705800',
      },
      purple: {
        100: '#F3E8FD',
        200: '#D1BDF7',
        300: '#AF92F3',
        400: '#8D67EF',
        500: '#6B3CEB',
        600: '#582EC9',
        700: '#4521A7',
        800: '#321485',
        900: '#1F075E',
      },
      blue: {
        100: '#E6F7FF',
        200: '#B3E0FF',
        300: '#80C9FF',
        400: '#4DB2FF',
        500: '#199BFF',
        600: '#1685E6',
        700: '#126FB3',
        800: '#0F5980',
        900: '#0B426E',
      },
      orange: {
        100: '#FFF2E6',
        200: '#FFD1B9',
        300: '#FFB289',
        400: '#FF924A',
        500: '#FF7400',
        600: '#E66A00',
        700: '#B85500',
        800: '#933F00',
        900: '#702A00',
      },
      red: {
        100: '#FFE6E6',
        200: '#FFB3B3',
        300: '#FF8080',
        400: '#FF4D4D',
        500: '#FF1A1A',
        600: '#E60000',
        700: '#B30000',
        800: '#800000',
        900: '#4D0000',
      },
      gray: {
        100: '#f7fafc',
        200: '#edf2f7',
        300: '#e2e8f0',
        400: '#cbd5e0',
        500: '#a0aec0',
        600: '#718096',
        700: '#4a5568',
        800: '#2d3748',
        900: '#1a202c',
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
