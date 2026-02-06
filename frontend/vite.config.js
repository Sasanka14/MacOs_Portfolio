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
      // existing aliases (updated for new structure)
      "#components": resolve(root, "src/app/desktop/components"),
      "#hoc": resolve(root, "src/app/desktop/hoc"),
      "#hooks": resolve(root, "src/hooks"),
      "#windows": resolve(root, "src/app/desktop/windows"),
      "#constants": resolve(root, "src/shared/constants"),
      "#store": resolve(root, "src/shared/store"),

      // ✅ ADD THESE (new shared layer)
      "#shared": resolve(root, "src/shared"),
      "#shared/constants": resolve(root, "src/shared/constants"),
      "#shared/store": resolve(root, "src/shared/store"),
    },
  },
});
