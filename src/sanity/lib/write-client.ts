import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

/** Client com token de escrita — só no servidor (API routes). */
export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });
}
