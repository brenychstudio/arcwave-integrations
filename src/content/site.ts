// src/content/site.ts
const siteUrl = (import.meta.env.PUBLIC_SITE_URL || "https://arcwave-integrations.pages.dev").replace(/\/+$/, "");
const contactEmail = (import.meta.env.PUBLIC_CONTACT_EMAIL || "hello@example.com").trim();

export const site = {
  name: "ARCWAVE",
  tagline: "Premium engineering installations",

  url: siteUrl,

  defaultOg: "/og/og-default.png",
  accent: "#0A84FF",

  contact: {
    phone: "+34 600 000 000",
    email: contactEmail,
    serviceArea: "Barcelona & nearby",
  },

  // keep your real endpoint if you want real submissions;
  // otherwise leave empty to force mailto fallback (demo-mode)
  form: {
    endpoint: "",
  },

  trustBadges: [
    { title: "Clean delivery", note: "Supportable, tidy execution" },
    { title: "Documentation", note: "Practical handover notes" },
    { title: "Clear scope", note: "No overclaims" },
  ],

  processSteps: [
    { title: "Survey", note: "Scope, constraints, site conditions" },
    { title: "Proposal", note: "Plan + timeline + bill of materials" },
    { title: "Installation", note: "Clean execution, labeled, tested" },
    { title: "Support", note: "Handover docs + follow-up" },
  ],
};
