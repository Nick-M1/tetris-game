/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    fontFamily: {
      PressStart2P: ["PressStart2P", "sans-serif"],
      'kanit-bold': ["KanitBold", "sans-serif"],
      'kanit-medium': ["KanitMedium", "sans-serif"],
    },


    extend: {
      height: {
        screen: ['100vh', '100dvh'],
      },
      width: {
        screen: ['100vw', '100dvw'],
      },
      backgroundImage: {
        'home-background': "url('assets/HomePageBackground.jpeg')",
        'activegame-background': "url('assets/pattern.svg')",
      },

      margin: {
        0.25: '1px'
      },
      borderWidth: {
        3: '3px'
      },
      blur: {
        xs: '2px',
      },


      keyframes: {
        bounceRight: {
          '0%, 100%': {transform: 'translateX(-25%)'},
          '50%': {transform: 'translateX(0%)'},
        },
      },
      animation: {
        bounceRight: 'bounceRight 1s infinite',
      },
    },
  },
  plugins: [],
}

