export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** Em desenvolvimento, desliga o CDN para ver publicações na hora */
export const useCdn = process.env.NODE_ENV === "production";

/** True quando as credenciais mínimas do Sanity estão presentes */
export function isSanityConfigured() {
  return Boolean(projectId && dataset && projectId !== "placeholder");
}
