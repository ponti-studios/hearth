import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatRent } from "@/lib/preferences";
import type { Listing } from "@/lib/types";

interface BrowseListingCardProps {
  listing: Listing;
  matches: number;
  filtering: boolean;
  onSelect: () => void;
}

export function BrowseListingCard({
  listing,
  matches,
  filtering,
  onSelect,
}: BrowseListingCardProps) {
  return (
    <Card className="gap-0 overflow-hidden py-0">
      <button type="button" onClick={onSelect} className="block w-full text-left">
        <div className="relative">
          <Image
            src={listing.image}
            alt={`${listing.title} — ${listing.area}`}
            width={900}
            height={600}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-[3/2] w-full object-cover"
          />
          {filtering && (
            <Badge
              variant={matches > 0 ? "secondary" : "outline"}
              className="bg-background/90 absolute top-3 left-3 backdrop-blur"
            >
              {matches > 0 ? `Matches ${matches}` : "No direct matches"}
            </Badge>
          )}
        </div>
        <CardContent className="flex flex-col gap-2 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-mono text-xl leading-snug font-normal">{listing.title}</h2>
              <p className="text-muted-foreground mt-0.5 text-xs">
                {listing.area} · {listing.commute} to King&apos;s Cross
              </p>
            </div>
            <span className="shrink-0 text-sm font-semibold">{listing.score}%</span>
          </div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-6">{listing.reason}</p>
          <p className="mt-auto pt-1 text-sm font-medium">{formatRent(listing.rent)}</p>
        </CardContent>
      </button>
    </Card>
  );
}
