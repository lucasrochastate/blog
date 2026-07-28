import { SITE } from "@/lib/constants";

export function absoluteUrl(path = ""): string {
  const base = SITE.url.replace(/\/$/, "");
  if (!path) return base;
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
