/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {colors: {
      main: '#121212',
      caption: '#333333',
      primary: '#004aad',
      primary_hover: '#003e92',
      button: '#336ebd',
      button_hover: '#004aad',
      m_background: '#d9d9d9',
      underline: '#333333'
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
  },
},
plugins: [],
}

