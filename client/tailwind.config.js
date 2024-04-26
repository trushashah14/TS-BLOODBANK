/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        'primary': '#3F497F'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
