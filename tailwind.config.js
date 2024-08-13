/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "mada-extra-light": ["Mada-ExtraLight", "sans-serif"],
        "mada-light": ["Mada-Light", "sans-serif"],
        "mada-regular": ["Mada-Regular", "sans-serif"],
        "mada-medium": ["Mada-Medium", "sans-serif"],
        "mada-semibold": ["Mada-SemiBold", "sans-serif"],
        "mada-Bold": ["Mada-Bold", "sans-serif"],
        "mada-ExtraBold": ["Mada-ExtraBold", "sans-serif"],
        "mada-black": ["Mada-Black", "sans-serif"],
      },
      colors: {
        primary: "#9654F4",
        "input-border": "#D9D8D8",
        "tab-item-gray": "#828282",
        "secondary-text": "#6E6E6E",
      },
    },
  },
  plugins: [],
};
