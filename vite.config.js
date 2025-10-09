import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";

export default defineConfig({
  plugins: [
    react(),
    commonjs(), // 🔥 garante compatibilidade com pacotes CommonJS
  ],
  optimizeDeps: {
    include: ["react-map-gl", "mapbox-gl"], // força Vite a pré-bundlar
  },
  //base: "/acessooh-ui/", // 👈 mantém suporte ao GitHub Pages
  base: "./", // 👈 mantém suporte ao GitHub Pages
});