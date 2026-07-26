type VerseQuoteProps = {
  text: string;
  reference: string;
  translation?: string;
};

export function VerseQuote({ text, reference, translation }: VerseQuoteProps) {
  return (
    <blockquote
      className="verse-quote my-10 border-l border-primary/50 pl-5 sm:pl-6"
      cite={reference}
    >
      <p className="font-serif text-[1.25rem] leading-relaxed text-foreground/95 italic">
        &ldquo;{text}&rdquo;
      </p>
      <footer className="mt-4 font-mono text-[0.7rem] tracking-wide text-muted-foreground">
        <cite className="not-italic">
          {reference}
          {translation ? ` · ${translation}` : ""}
        </cite>
      </footer>
    </blockquote>
  );
}
