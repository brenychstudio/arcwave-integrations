const siteUrl = (import.meta.env.PUBLIC_SITE_URL || "https://arcwave-integrations.pages.dev").replace(/\/+$/, "");

export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /preview/",
    "",
    `Sitemap: ${siteUrl}/sitemap-index.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
