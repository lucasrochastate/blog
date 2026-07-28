import type { PostBodyBlock } from "@/types/post";

const WORDS_PER_MINUTE = 200;

/** Extrai texto plano de Portable Text / blocos de versículo */
export function portableTextToPlain(
  blocks: PostBodyBlock[] | undefined | null,
): string {
  if (!blocks?.length) return "";

  return blocks
    .map((block) => {
      if (block._type === "verseQuote") {
        const verse = block as {
          text?: string;
          reference?: string;
          translation?: string;
        };
        return [verse.text, verse.reference, verse.translation]
          .filter(Boolean)
          .join(" ");
      }

      if (block._type === "block" && "children" in block) {
        const children = block.children as { text?: string }[] | undefined;
        return children?.map((c) => c.text ?? "").join("") ?? "";
      }

      return "";
    })
    .join(" ");
}

export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function estimateReadingMinutes(
  input: string | PostBodyBlock[] | undefined | null,
  wordsPerMinute = WORDS_PER_MINUTE,
): number {
  const text = typeof input === "string" ? input : portableTextToPlain(input);
  const words = countWords(text);
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function formatReadingTime(minutes: number): string {
  return minutes === 1 ? "1 min de leitura" : `${minutes} min de leitura`;
}
