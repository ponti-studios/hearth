import type { Listing, Selection } from "@/lib/types";

export const PAGE_SIZE = 6;

export function togglePreference(selection: Selection, category: string, label: string): Selection {
  const items = selection[category] ?? [];
  if (items.includes(label)) {
    return { ...selection, [category]: items.filter((item) => item !== label) };
  }
  return { ...selection, [category]: [...items, label] };
}

export function countPreferences(selection: Selection): number {
  return Object.values(selection).flat().length;
}

export function clearPreferences(): Selection {
  return {};
}

/** How many of the selected preferences a listing satisfies. */
export function countMatches(listing: Listing, selection: Selection): number {
  const wanted = new Set(Object.values(selection).flat());
  if (wanted.size === 0) return 0;
  return listing.features.filter((feature) => wanted.has(feature)).length;
}

/**
 * Rank listings by preference matches (desc), then editorial score (desc).
 * With no selection, editorial order is preserved.
 */
export function rankListings(listings: Listing[], selection: Selection): Listing[] {
  if (countPreferences(selection) === 0) return [...listings];
  return [...listings].sort(
    (a, b) => countMatches(b, selection) - countMatches(a, selection) || b.score - a.score,
  );
}

export function paginate<T>(items: T[], page: number, pageSize: number = PAGE_SIZE): T[] {
  const safe = Math.max(1, page);
  return items.slice((safe - 1) * pageSize, safe * pageSize);
}

export function pageCount(total: number, pageSize: number = PAGE_SIZE): number {
  return Math.max(1, Math.ceil(total / pageSize));
}

export function formatRent(rent: number): string {
  return `£${rent.toLocaleString("en-GB")} pcm`;
}

/** Fit points awarded per matched preference in the landing demo. */
export const DEMO_FIT_PER_MATCH = 30;
/** Ceiling so the demo never claims a perfect 100. */
export const DEMO_FIT_MAX = 98;

/** Demo fit score: 0 with no matches, climbing +30 per match up to 98. */
export function demoFit(matches: number): number {
  return Math.min(DEMO_FIT_MAX, Math.max(0, matches) * DEMO_FIT_PER_MATCH);
}

export type FitTone = "empty" | "building" | "strong";

/** Traffic-light band for a fit score: red at 0, amber while climbing, green at 75+. */
export function fitTone(value: number): FitTone {
  if (value <= 0) return "empty";
  if (value < 75) return "building";
  return "strong";
}

/**
 * Rank listings by demo fit (desc), then editorial score (desc).
 * `activeLabels` is the flat list of currently-on preferences.
 */
export function rankDemo(listings: Listing[], activeLabels: string[]): Listing[] {
  if (activeLabels.length === 0) return [...listings];
  const wanted = new Set(activeLabels);
  const matches = (listing: Listing) => listing.features.filter((f) => wanted.has(f)).length;
  return [...listings].sort(
    (a, b) => demoFit(matches(b)) - demoFit(matches(a)) || b.score - a.score,
  );
}
