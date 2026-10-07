import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { listings } from "@/data/listings";
import { formatRent } from "@/lib/preferences";

export function FeaturedHomes() {
  const featured = listings.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28" aria-label="Featured homes">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-muted-foreground font-mono text-xs tracking-[0.16em] uppercase">
            <span
              aria-hidden="true"
              className="bg-foreground mr-2 inline-block size-1.5 rounded-full"
            />
            Today, with Hearth
          </p>
          <h2 className="mt-4 max-w-xl text-4xl leading-tight font-medium tracking-tight text-balance md:text-5xl">
            Three homes worth your attention.
          </h2>
        </div>
        <Button
          nativeButton={false}
          variant="outline"
          render={<Link href="/browse" />}
          className="rounded-full"
        >
          See all 12 <ArrowRight data-icon="inline-end" />
        </Button>
      </div>

      {/* Equal-height cards: links stretch by default — these selectors make the card
          fill the link so all three match the tallest row. */}
      <div className="mt-10 grid gap-5 md:grid-cols-3 [&>a]:flex [&>a]:flex-col [&>a>div]:flex-1 [&>a>div>div:last-child]:flex-1">
        {featured.map((listing) => (
          <Link key={listing.title} href="/browse" className="group block">
            <Card className="gap-0 overflow-hidden py-0 transition-shadow group-hover:shadow-md">
              <Image
                src={listing.image}
                alt={`${listing.title} — ${listing.area}`}
                width={900}
                height={600}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <CardContent className="flex flex-col gap-1.5 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-mono text-lg leading-snug font-normal">{listing.title}</h3>
                  <span className="shrink-0 text-sm font-semibold">{listing.score}%</span>
                </div>
                <p className="text-muted-foreground text-xs">
                  {listing.area} · {listing.commute} to King&apos;s Cross
                </p>
                <p className="mt-1 text-sm font-medium">{formatRent(listing.rent)}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
