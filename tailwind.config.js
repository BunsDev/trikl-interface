module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        textColor: "#222222",
        triklBlue: "#1400FF",
        triklGray: "#9A9A9A",
        triklOffWhite: "#F8FAFC",

        darkestBlue: "#151531",
        darkBlue: "#07004c",
        darkViolet: "#1b0033",
        lightBlue: "#bbd0ff",
        lightViolet: "#c489fb",
        lightAccent: "#4ee7ff",
        blueAccent: "#1100ff",
        violetAccent: "#7209b7",
        baseWhite: "#eae1f2",
        lightGrey: "#eae1f2",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
