import { defineConfig,loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return{
     plugins: [react(),tailwindcss()],
    define: {
      // Expose specific environment variables to the client-side code
      'process.env.REACT_APP_GEMINI_API_KEY': JSON.stringify(env.REACT_APP_GEMINI_API_KEY),
      'process.env.REACT_APP_TMDB_KEY': JSON.stringify(env.REACT_APP_TMDB_KEY),
    },
  }
 
})
