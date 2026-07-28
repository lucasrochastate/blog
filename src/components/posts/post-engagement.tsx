"use client";

import { Check, Heart, Link2, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";

import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type PostEngagementProps = {
  slug: string;
  title: string;
  url: string;
  excerpt?: string;
  initialLikes?: number;
};

const actionClass =
  "inline-flex h-9 items-center gap-1.5 rounded-md px-3 font-mono text-[0.75rem] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const storageKey = (slug: string) => `tf:liked:${slug}`;

export function PostEngagement({
  slug,
  title,
  url,
  excerpt,
  initialLikes = 0,
}: PostEngagementProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const shareText = `${title} — ${SITE.name}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${excerpt ? `${excerpt}\n` : ""}${url}`)}`;

  useEffect(() => {
    try {
      setLiked(window.localStorage.getItem(storageKey(slug)) === "1");
    } catch {
      setLiked(false);
    }
  }, [slug]);

  async function like() {
    if (liked || pending) return;
    setPending(true);
    setError("");

    // otimista
    setLiked(true);
    setLikes((current) => current + 1);

    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = (await response.json()) as {
        likes?: number;
        message?: string;
        alreadyLiked?: boolean;
      };

      if (response.status === 409 || data.alreadyLiked) {
        window.localStorage.setItem(storageKey(slug), "1");
        setLiked(true);
        if (typeof data.likes === "number") setLikes(data.likes);
        return;
      }

      if (!response.ok) {
        setLiked(false);
        setLikes((current) => Math.max(initialLikes, current - 1));
        setError(data.message || "Não foi possível curtir agora.");
        return;
      }

      window.localStorage.setItem(storageKey(slug), "1");
      if (typeof data.likes === "number") setLikes(data.likes);
      track("post_like", { slug, title });
    } catch {
      setLiked(false);
      setLikes((current) => Math.max(initialLikes, current - 1));
      setError("Falha de rede. Tente de novo.");
    } finally {
      setPending(false);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
      track("post_share", { slug, method: "copy" });
    } catch {
      setCopied(false);
    }
  }

  async function nativeShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: excerpt || shareText, url });
        track("post_share", { slug, method: "native" });
      } catch {
        // cancelado
      }
      return;
    }
    await copyLink();
  }

  return (
    <section
      aria-labelledby="engagement-heading"
      className="border-border/40 space-y-6 border-t pt-8"
    >
      <div>
        <h2
          id="engagement-heading"
          className="font-mono text-[0.72rem] tracking-[0.14em] text-muted-foreground uppercase"
        >
          este texto foi útil?
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={like}
            disabled={liked || pending}
            aria-pressed={liked}
            aria-label={liked ? "Você já curtiu este texto" : "Curtir este texto"}
            className={cn(
              actionClass,
              liked
                ? "bg-primary/15 text-primary"
                : "bg-muted text-foreground hover:bg-muted/80",
              (liked || pending) && "cursor-default",
            )}
          >
            <Heart
              className={cn("size-4", liked && "fill-current")}
              aria-hidden="true"
            />
            <span>{liked ? "curtido" : "curtir"}</span>
            <span className="text-muted-foreground tabular-nums">{likes}</span>
          </button>
          <p className="font-mono text-[0.7rem] text-muted-foreground">
            {likes === 0
              ? "Seja o primeiro a curtir."
              : likes === 1
                ? "1 pessoa curtiu."
                : `${likes} pessoas curtiram.`}
          </p>
        </div>
        {error ? (
          <p role="status" className="mt-2 text-sm text-destructive">
            {error}
          </p>
        ) : null}
      </div>

      <div>
        <h3 className="font-mono text-[0.72rem] tracking-[0.14em] text-muted-foreground uppercase">
          compartilhar
        </h3>
        <div className="mt-3 flex flex-wrap gap-1">
          <button
            type="button"
            className={cn(actionClass, "text-muted-foreground hover:bg-muted hover:text-foreground")}
            onClick={nativeShare}
            aria-label="Compartilhar"
          >
            <Share2 className="size-3.5" aria-hidden="true" />
            nativo
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(actionClass, "text-muted-foreground hover:bg-muted hover:text-foreground")}
            aria-label="Compartilhar no WhatsApp"
            onClick={() => track("post_share", { slug, method: "whatsapp" })}
          >
            WhatsApp
          </a>
          <button
            type="button"
            className={cn(actionClass, "text-muted-foreground hover:bg-muted hover:text-foreground")}
            onClick={copyLink}
            aria-label="Copiar link"
          >
            {copied ? (
              <Check className="size-3.5" aria-hidden="true" />
            ) : (
              <Link2 className="size-3.5" aria-hidden="true" />
            )}
            {copied ? "copiado" : "copiar link"}
          </button>
        </div>
      </div>
    </section>
  );
}
