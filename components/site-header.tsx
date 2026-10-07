export function SiteHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-5 md:px-10">
      <a className="font-mono text-sm font-medium tracking-tight" href="/">
        hearth<span className="text-muted-foreground">/</span>
      </a>
      <span className="text-muted-foreground font-mono text-xs">london rentals</span>
    </header>
  );
}
