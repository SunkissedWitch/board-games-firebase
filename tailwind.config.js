/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "lofi"
      // {
      //   lofi: {
      //     ...require("daisyui/src/theming/themes")["lofi"],
      //     accent: "#48a3f6",
      //   },
      // },
    ],
  },
}
