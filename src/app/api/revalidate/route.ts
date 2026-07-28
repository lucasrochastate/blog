import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Webhook Sanity → Vercel: invalida cache ao publicar.
 * Configure no Sanity: https://www.sanity.io/manage → API → Webhooks
 * URL: https://seu-dominio/api/revalidate?secret=SEU_SECRET
 * Dataset: production · Trigger: create/update/delete em post
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expected = process.env.SANITY_REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = (await request.json().catch(() => null)) as {
      slug?: { current?: string };
      _type?: string;
    } | null;

    revalidateTag("sanity", "max");
    revalidateTag("posts", "max");
    revalidatePath("/");
    revalidatePath("/feed.xml");
    revalidatePath("/busca");
    revalidatePath("/categorias");
    revalidatePath("/sitemap.xml");

    const slug = body?.slug?.current;
    if (slug) {
      revalidateTag(`post:${slug}`, "max");
      revalidatePath(`/posts/${slug}`);
    }

    return NextResponse.json({
      revalidated: true,
      slug: slug ?? null,
      now: Date.now(),
    });
  } catch (error) {
    console.error("[revalidate]", error);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
