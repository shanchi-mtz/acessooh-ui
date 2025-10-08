// src/utils/checkEnv.js
export function checkEnvVars() {
  console.log("🔑 VITE_MAPBOX_TOKEN:", import.meta.env.VITE_MAPBOX_TOKEN || "❌ NÃO ENCONTRADO");
}
