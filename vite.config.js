import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/acessooh-ui/", // 👈 apenas o nome do repo entre barras
});
