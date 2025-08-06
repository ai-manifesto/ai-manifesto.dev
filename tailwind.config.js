/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      // Use existing breakpoints to match our current system
      screens: {
        sm: '640px',
        md: '768px',   // matches our @media (max-width: 768px)
        lg: '1024px',  // matches our @media (min-width: 1024px)
        xl: '1200px',  // matches our @media (min-width: 1200px)
        '2xl': '1536px',
      },
      // Extend with your design system colors if needed
      colors: {
        // We can add CSS custom properties here later if needed
      },
      // Add custom spacing that matches your current system
      spacing: {
        18: '4.5rem', // For any custom spacing you might need
      },
    },
  },
  plugins: [],
  // Important: This prevents Tailwind from interfering with your custom CSS
  corePlugins: {
    preflight: false, // Disable Tailwind's CSS reset to preserve your custom styles
  },
}
