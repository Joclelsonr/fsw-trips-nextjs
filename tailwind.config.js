/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "search-background": "url('/world-map.png')",
      },
      colors: {
        primary: "#590BD8",
        primaryLight: "##DDD5EA",
        primaryDarker: "#312A4F",
        primaryGray: "##717171",
        primaryGrayLight: "##BBBFBF",
        primaryWalterWhite: "##F5F5F5",
      },
      textColor: {
        dark: "#717171",
      },
    },
  },
  plugins: [],
};
