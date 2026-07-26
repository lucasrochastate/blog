import { isSanityConfigured } from "@/sanity/env";

import { StudioClient } from "./studio-client";
import { StudioSetup } from "./studio-setup";

export default function StudioPage() {
  if (!isSanityConfigured()) {
    return <StudioSetup />;
  }

  return <StudioClient />;
}
