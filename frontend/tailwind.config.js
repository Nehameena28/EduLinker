/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': 'rgb(31, 91, 120)',
        'custom-i-berry': 'rgb(221, 167, 123)',
        'custom-brown':'rgb(148,93,94)'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide') // 👈 add this line
  ],
}

