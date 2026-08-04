import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: "dist/client",
    rollupOptions: {
      input: {
        demo: "demo.html"
      }
    }
  }
});
