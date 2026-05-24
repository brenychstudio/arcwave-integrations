import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

const excludedFromSitemap = [
  "/privacy",
  "/cookies",
  "/es/privacy",
  "/es/cookies",
  "/preview/home-old",
  "/preview/home-v2",
];

export default defineConfig({
  site: (process.env.PUBLIC_SITE_URL || "https://arcwave-integrations.pages.dev").replace(/\/+$/, ""),
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        const pathname = page.startsWith("http") ? new URL(page).pathname : page;
        const normalizedPathname =
          pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;

        return !excludedFromSitemap.includes(normalizedPathname);
      },
    }),
  ],
});
