import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D87D4A",
        "primary-light": "#FBAF85",
        secondary: "#101010",
        "secondary-light": "#F1F1F1",
        "secondary-dark": "#000000",
        white: "#FFFFFF",
        "light-gray": "#FAFAFA",
        "medium-gray": "#F1F1F1",
        "dark-gray": "#4C4C4C",
        error: "#CD2C2C",
      },
      fontFamily: {
        manrope: ["var(--font-manrope)", "sans-serif"],
      },
      fontSize: {
        h1: ["56px", { lineHeight: "58px", letterSpacing: "2px", fontWeight: "700" }],
        h2: ["40px", { lineHeight: "44px", letterSpacing: "1.5px", fontWeight: "700" }],
        h3: ["32px", { lineHeight: "36px", letterSpacing: "1.15px", fontWeight: "700" }],
        h4: ["28px", { lineHeight: "38px", letterSpacing: "2px", fontWeight: "700" }],
        h5: ["24px", { lineHeight: "33px", letterSpacing: "1.7px", fontWeight: "700" }],
        h6: ["18px", { lineHeight: "24px", letterSpacing: "1.3px", fontWeight: "700" }],
        overline: ["14px", { lineHeight: "19px", letterSpacing: "10px", fontWeight: "400" }],
        subtitle: ["13px", { lineHeight: "25px", letterSpacing: "1px", fontWeight: "700" }],
        body: ["15px", { lineHeight: "25px", fontWeight: "500" }],
      },
      spacing: {
        "120": "120px",
        "165": "165px",
      },
      maxWidth: {
        "container": "1110px",
      },
    },
  },
  plugins: [],
};
export default config;
