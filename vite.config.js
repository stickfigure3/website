import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  // Use absolute paths during dev to avoid SPA reload issues; keep relative base for build.
  base: command === "build" ? "./" : "/",
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
}));
