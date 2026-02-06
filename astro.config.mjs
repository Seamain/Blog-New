import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Global error handler to prevent circular structure JSON errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Prevent the default behavior of throwing
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Prevent the default behavior of exiting
});

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