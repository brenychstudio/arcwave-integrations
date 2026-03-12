// src/content/i18n.ts
export type Lang = "en" | "es";

export function langFromPath(pathname: string): Lang {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

export function baseFromLang(lang: Lang): "" | "/es" {
  return lang === "es" ? "/es" : "";
}

export function t(lang: Lang, en: string, es: string): string {
  return lang === "es" ? es : en;
}

export function otherLangHref(url: URL): string {
  const path = url.pathname;
  const search = url.search ?? "";
  const hash = url.hash ?? "";

  const isEs = path === "/es" || path.startsWith("/es/");
  const otherPath = isEs
    ? (path.replace(/^\/es(?=\/|$)/, "") || "/")
    : (path === "/" ? "/es" : `/es${path}`);

  return `${otherPath}${search}${hash}`;
}