// src/content/company.ts
const contactEmail = (import.meta.env.PUBLIC_CONTACT_EMAIL || "hello@example.com").trim();
const linkedinUrl = (import.meta.env.PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/example").trim();
const facebookUrl = (import.meta.env.PUBLIC_FACEBOOK_URL || "https://www.facebook.com/example").trim();

export const COMPANY = {
  name: "ARCWAVE",
  blurb:
    "Portfolio concept for a premium engineering installations website - telecom, networks, smart-ready electrical, EV charging, security systems, and audio & home cinema.",

  phoneDisplay: "+34 600 000 000",
  phoneTel: "+34600000000",

  email: contactEmail,
  linkedinUrl,
  facebookUrl,

  hours: "Mon-Fri · 08:00-20:00",
} as const;

export function hasRealEmail(email: string | null | undefined): boolean {
  const normalized = String(email ?? "").trim().toLowerCase();
  if (!normalized) return false;
  return !normalized.endsWith("@example.com") && !normalized.includes("hello@example.com");
}

export function hasRealExternalUrl(url: string | null | undefined): boolean {
  const normalized = String(url ?? "").trim();
  if (!normalized) return false;

  try {
    const parsed = new URL(normalized);
    return parsed.protocol === "https:" && parsed.hostname !== "example.com" && !parsed.hostname.endsWith(".example.com");
  } catch {
    return false;
  }
}
