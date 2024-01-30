import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue2";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  define: {
    BASE_API_URL: JSON.stringify(
      "https://contacts-ap.pockethost.io/api/collections/"
    ),
  },
});
