/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: "#eb8480",
        yellow: "#e9dfaa",
        blue: "#d3e5e8",
        green: "#c0ddc6"
      }
    }
  },
  plugins: []
}
