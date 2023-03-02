/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FB752A",
        secondary: "#FFCB45",
        tertiary: "#F1F1EA",
        highlight: "#101110",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        neuemachina: ["var(--font-ppneuemachina)", "sans-serif"],
        brocha: ["var(--font-brocha)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
