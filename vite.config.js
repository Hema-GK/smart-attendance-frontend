// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       // Add 'capacitor-wifi' here. This is the "Don't panic" list for Vite.
//       external: ['capacitor-wifi', '@capacitor-community/wifi'] 
//     }
//   }
// })



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      /**
       * CRITICAL: We tell Rollup to treat these as "external" modules.
       * This prevents the build from failing on Vercel/Web environments
       * where these native Android plugins do not exist.
       */
      external: [
        'capacitor-wifi', 
        '@capacitor-community/wifi'
      ],
      output: {
        // This ensures the app doesn't crash if it tries to call an external at runtime
        globals: {
          'capacitor-wifi': 'Wifi',
          '@capacitor-community/wifi': 'Wifi'
        }
      }
    }
  }
})