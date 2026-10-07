import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Closing() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-5 py-20 text-center md:px-10 md:py-28">
        <h2 className="text-4xl leading-tight font-medium tracking-tight text-balance md:text-6xl">
          Make room for the life inside.
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-base leading-7">
          Twelve London homes, ranked around you. Start with the ones that fit — or just look around
          first.
        </p>
        <div className="mt-8">
          <Button
            nativeButton={false}
            size="lg"
            render={<Link href="/browse" />}
            className="rounded-full px-8"
          >
            Browse homes <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
        <p className="text-muted-foreground mt-5 text-xs">
          12 homes across London · Free to browse · No account needed
        </p>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <Link href="/" className="font-mono text-sm font-medium tracking-tight">
              hearth<span className="text-muted-foreground">/</span>
            </Link>
            <p className="text-muted-foreground mt-2 text-xs">
              A more human property search. A thesis prototype.
            </p>
          </div>
          <nav aria-label="Footer" className="text-muted-foreground flex gap-6 text-sm">
            <Link href="/#how-it-works" className="hover:text-foreground transition-colors">
              How it works
            </Link>
            <Link href="/browse" className="hover:text-foreground transition-colors">
              Homes
            </Link>
            <Link href="/#reviews" className="hover:text-foreground transition-colors">
              Reviews
            </Link>
          </nav>
          <p className="text-muted-foreground font-mono text-xs">© 2026 hearth</p>
        </div>
      </footer>
    </>
  );
}
