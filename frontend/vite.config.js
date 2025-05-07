// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from "vite";
import tailwindcssVite from "@tailwindcss/vite";


export default defineConfig({
  plugins: [tailwindcssVite()],
});
