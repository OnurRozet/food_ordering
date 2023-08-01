/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    container: {
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1140px",
        "2xl": "1140px",
      },
    },
    colors:{
      primary: "#ffbe33",
      secondary: "#222831",
      white:"#ffffff",
      azure:"#F0F8FF",
      lightgray:"#D3D3D3",
      black:"#000000",
      transparent:"#RRGGBB",
      danger: "#ff0000",
      gray:"#808080",
      success: "#00ff00",
      orange:"#FFA500"
    },
    fontFamily: {
      dancing: ["Dancing Script", "cursive"],
      sans:["Open Sans","sans-serif"]
    },
  },
  plugins: [],
}
