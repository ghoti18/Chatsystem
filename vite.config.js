import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    hmr: false,
    allowedHosts: ["unconstrainable-phillis-northwardly.ngrok-free.dev"],
    proxy: {
      "/auth": "http://localhost:5000",
      "/profile": "http://localhost:5000",
    },
  },
});