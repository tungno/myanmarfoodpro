import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allow the server to be accessible on all IP addresses
    port: 5173,  // Optional: Define the port
    strictPort: true  // Ensure that the specified port is used
  }
})
