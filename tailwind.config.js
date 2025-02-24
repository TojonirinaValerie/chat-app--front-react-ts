/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        xsm: "410px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xlx: "1680px",
        xxl: "1980px",
      },
      colors: {
        myBlack: "#131313",
        "blue-bg": "#202329",
        "blue-dark": "#2e333d",
        "blue-ligth": "#6b8afd",
        white: "#ffffff",
        grey: "#a9aeba",
        "bg-ligth": "#676279",
        "bg-dark": "#2b2738",
        "input-bg": "#3b364c",
      },
      fontSize: {
        base: "1rem",
        md: "0.925rem",
        sm: "0.875rem",
        xs: "0.825rem",
        xxs: "0.75rem",
        xl: "2.5rem",
        lg: "1.2rem",
        xxl: "50px",
      },
    },
  },
  plugins: [],
};
