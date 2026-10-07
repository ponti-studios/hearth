"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { listings } from "@/data/listings";
import {
  clearPreferences,
  countMatches,
  countPreferences,
  PAGE_SIZE,
  pageCount,
  paginate,
  rankListings,
  togglePreference,
} from "@/lib/preferences";
import type { Listing, Selection } from "@/lib/types";
import { BrowseListingCard } from "./browse-listing-card";
import { FilterSidebar } from "./filter-sidebar";
import { ListingDialog } from "./listing-dialog";

export function BrowsePage() {
  const [selected, setSelected] = useState<Selection>({});
  const [page, setPage] = useState(1);
  const [active, setActive] = useState<Listing | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtering = countPreferences(selected) > 0;
  const ranked = useMemo(() => rankListings(listings, selected), [selected]);
  const pages = pageCount(ranked.length, PAGE_SIZE);
  const safePage = Math.min(page, pages);
  const visible = paginate(ranked, safePage, PAGE_SIZE);

  const updateSelection = (next: Selection) => {
    setSelected(next);
    setPage(1);
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-10 md:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h1 className="font-mono text-4xl font-medium tracking-tight md:text-5xl">
              Homes for your way of living<span className="text-muted-foreground">.</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-sm">
              {filtering
                ? `Ranked by your ${countPreferences(selected)} preferences — best matches first.`
                : "Every home, up front. Add preferences to re-rank around your life."}
            </p>
          </div>
          <Button variant="outline" className="lg:hidden" onClick={() => setFiltersOpen(true)}>
            <SlidersHorizontal data-icon="inline-start" /> Filters
            {filtering && (
              <Badge variant="secondary" className="ml-1">
                {countPreferences(selected)}
              </Badge>
            )}
          </Button>
        </div>

        <div className="mt-8 flex items-start gap-8">
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-6">
              <FilterSidebar
                selected={selected}
                onToggle={(category, label) =>
                  updateSelection(togglePreference(selected, category, label))
                }
                onClearCategory={(category) => updateSelection({ ...selected, [category]: [] })}
                onClearAll={() => updateSelection(clearPreferences())}
              />
            </div>
          </aside>

          <section className="min-w-0 flex-1" aria-label="Homes">
            <p className="text-muted-foreground font-mono text-xs tracking-[0.16em] uppercase">
              {ranked.length} homes · page {safePage} of {pages}
            </p>
            {/* Equal-height cards: grid items stretch by default — these selectors make
                the card's inner button and content fill the row height so footers align. */}
            <div className="mt-4 grid gap-5 sm:grid-cols-2 [&>div>button]:flex [&>div>button]:h-full [&>div>button]:flex-col [&>div>button>div:last-child]:flex-1">
              {visible.map((listing) => (
                <BrowseListingCard
                  key={listing.title}
                  listing={listing}
                  matches={countMatches(listing, selected)}
                  filtering={filtering}
                  onSelect={() => setActive(listing)}
                />
              ))}
            </div>

            {pages > 1 && (
              <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
                <Button
                  variant="outline"
                  disabled={safePage <= 1}
                  onClick={() => setPage(safePage - 1)}
                >
                  Previous
                </Button>
                {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                  <Button
                    key={n}
                    variant={n === safePage ? "secondary" : "ghost"}
                    aria-current={n === safePage ? "page" : undefined}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  disabled={safePage >= pages}
                  onClick={() => setPage(safePage + 1)}
                >
                  Next
                </Button>
              </nav>
            )}
          </section>
        </div>
      </div>

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side="left" aria-describedby={undefined}>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Rank homes around the life inside them.</SheetDescription>
          </SheetHeader>
          <SheetBody>
            <FilterSidebar
              selected={selected}
              onToggle={(category, label) =>
                updateSelection(togglePreference(selected, category, label))
              }
              onClearCategory={(category) => updateSelection({ ...selected, [category]: [] })}
              onClearAll={() => updateSelection(clearPreferences())}
            />
          </SheetBody>
          <SheetFooter>
            <Button className="flex-1" onClick={() => setFiltersOpen(false)}>
              Show {ranked.length} homes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <ListingDialog
        listing={active}
        matches={active ? countMatches(active, selected) : 0}
        filtering={filtering}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      />
    </main>
  );
}
