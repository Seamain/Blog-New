import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap()],
  site: 'https://seamain.org',
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },

    plugins: [tailwindcss()],
  },
});