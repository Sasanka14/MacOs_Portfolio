import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // existing aliases (keep)
      "#components": resolve(root, "src/components"),
      "#constants": resolve(root, "src/constants"),
      "#store": resolve(root, "src/store"),
      "#hoc": resolve(root, "src/hoc"),
      "#hooks": resolve(root, "src/hooks"),
      "#windows": resolve(root, "src/windows"),

      // ✅ ADD THESE (new shared layer)
      "#shared": resolve(root, "src/shared"),
      "#shared/constants": resolve(root, "src/shared/constants"),
      "#shared/store": resolve(root, "src/shared/store"),
    },
  },
});
