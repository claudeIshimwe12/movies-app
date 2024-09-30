/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        red: "#FC4747",
        dark: {
          blue: "#10141E",
        },
        greyish: {
          blue: "#5A698F",
        },
        semi: {
          dark: {
            blue: "#161D2F",
          },
        },
      },
      fontSize: {
        hl: "32px",
        hm: "24px",
        hs: "24px",
        hxs: "18px",

        bm: "15px",
        bs: "13px",
      },
    },
  },
  plugins: [],
};
