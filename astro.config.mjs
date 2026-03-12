import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // IMPORTANT: update to your actual Cloudflare Pages URL after first deploy
  site: "https://arcwave-integrations.pages.dev",
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        ![
          "/privacy",
          "/cookies",
          "/es/privacy",
          "/es/cookies",
        ].includes(page),
    }),
  ],
});
