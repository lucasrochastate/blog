"use client";

import { Check, Link2, Share2 } from "lucide-react";
import { useState } from "react";

import { SITE } from "@/lib/constants";

type ShareButtonsProps = {
  title: string;
  url: string;
  excerpt?: string;
};

const linkClass =
  "inline-flex h-8 items-center gap-1.5 rounded-md px-2 font-mono text-[0.72rem] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function ShareButtons({ title, url, excerpt }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const text = `${title} — ${SITE.name}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${text}\n${excerpt ? `${excerpt}\n` : ""}${url}`)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function nativeShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: excerpt || text, url });
      } catch {
        // cancelado
      }
      return;
    }
    await copyLink();
  }

  return (
    <div className="flex flex-wrap items-center gap-1">
      <span className="mr-1 font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
        compartilhar
      </span>
      <button type="button" className={linkClass} onClick={nativeShare} aria-label="Compartilhar">
        <Share2 className="size-3.5" aria-hidden="true" />
        nativo
      </button>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label="Compartilhar no WhatsApp"
      >
        WhatsApp
      </a>
      <button type="button" className={linkClass} onClick={copyLink} aria-label="Copiar link">
        {copied ? (
          <Check className="size-3.5" aria-hidden="true" />
        ) : (
          <Link2 className="size-3.5" aria-hidden="true" />
        )}
        {copied ? "copiado" : "copiar link"}
      </button>
    </div>
  );
}
