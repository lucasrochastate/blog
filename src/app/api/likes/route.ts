import { type NextRequest, NextResponse } from "next/server";

import { getWriteClient } from "@/sanity/lib/write-client";

const COOKIE_NAME = "tf_liked";
const MAX_AGE = 60 * 60 * 24 * 365;

function parseLiked(cookieHeader: string | null): string[] {
  if (!cookieHeader) return [];
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`));
  if (!match) return [];
  try {
    const value = decodeURIComponent(match.slice(COOKIE_NAME.length + 1));
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function likedCookie(slugs: string[]) {
  return `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(slugs.slice(-200)))}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { slug?: string };
    const slug = body.slug?.trim();
    if (!slug) {
      return NextResponse.json({ message: "Slug inválido." }, { status: 400 });
    }

    const already = parseLiked(request.headers.get("cookie"));
    if (already.includes(slug)) {
      return NextResponse.json(
        { message: "Você já curtiu este texto.", alreadyLiked: true },
        { status: 409 },
      );
    }

    const client = getWriteClient();
    if (!client) {
      return NextResponse.json(
        {
          message:
            "Curtidas ainda não estão configuradas no servidor (SANITY_API_WRITE_TOKEN).",
        },
        { status: 503 },
      );
    }

    const post = await client.fetch<{ _id: string; likes?: number } | null>(
      `*[_type == "post" && slug.current == $slug][0]{ _id, likes }`,
      { slug },
    );

    if (!post) {
      return NextResponse.json(
        { message: "Post não encontrado." },
        { status: 404 },
      );
    }

    const nextLikes = (post.likes ?? 0) + 1;
    await client.patch(post._id).set({ likes: nextLikes }).commit({
      autoGenerateArrayKeys: true,
    });

    const response = NextResponse.json({
      likes: nextLikes,
      liked: true,
    });
    response.headers.set(
      "Set-Cookie",
      likedCookie([...already, slug]),
    );
    return response;
  } catch (error) {
    console.error("[likes]", error);
    return NextResponse.json(
      { message: "Não foi possível registrar a curtida." },
      { status: 500 },
    );
  }
}
