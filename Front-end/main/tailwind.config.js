/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/**/*.html",
    "./frontend/js/**/*.js"
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      arima: ['Ariman', 'serif']
    },
    extend: {
      colors:{
        'primary': '#3b82f6',
        'primary1': '#e0194b'
      },
      backgroundImage: {
        'dynamic-gradient-1': 'linear-gradient(135deg, #3b4a6b, #2e3a57, #1f2a3e, #3b4a6b)', // Dark blues for a calm, serious feel
        'dynamic-gradient-2': 'linear-gradient(135deg, #3b4a6b, #583b4a, #4a2739, #3b4a6b)', // Dark blue to maroon for a moody, warm effect
        'dynamic-gradient-3': 'linear-gradient(135deg, #3b4a6b, #4a5063, #363c4b, #3b4a6b)', // Grayscale dark blues for a balanced, modern look
      },
      animation: {
        'gradient-slow': 'gradientAnimation 3s ease infinite',
        'gradient-medium': 'gradientAnimation 12s ease infinite',
      },
      keyframes: {
        gradientAnimation: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}