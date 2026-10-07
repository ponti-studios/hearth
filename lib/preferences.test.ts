import { describe, expect, it } from "vitest";
import { listings } from "@/data/listings";
import {
  clearPreferences,
  countMatches,
  countPreferences,
  demoFit,
  fitTone,
  pageCount,
  paginate,
  rankDemo,
  rankListings,
  togglePreference,
} from "@/lib/preferences";

describe("togglePreference", () => {
  it("adds a label to an empty category", () => {
    expect(togglePreference({}, "Kitchen", "Gas hob")).toEqual({ Kitchen: ["Gas hob"] });
  });

  it("removes a label that is already selected", () => {
    expect(togglePreference({ Kitchen: ["Gas hob", "Dishwasher"] }, "Kitchen", "Gas hob")).toEqual({
      Kitchen: ["Dishwasher"],
    });
  });

  it("keeps other categories untouched", () => {
    const next = togglePreference({ Kitchen: ["Gas hob"] }, "Neighbourhood", "Parks nearby");
    expect(next).toEqual({ Kitchen: ["Gas hob"], Neighbourhood: ["Parks nearby"] });
  });

  it("clears everything", () => {
    expect(clearPreferences()).toEqual({});
    expect(countPreferences({ Kitchen: ["a", "b"], Neighbourhood: ["c"] })).toBe(3);
  });
});

describe("countMatches / rankListings", () => {
  it("counts satisfied preferences per listing", () => {
    const first = listings[0];
    expect(countMatches(first, {})).toBe(0);
    expect(countMatches(first, { "Light & outlook": ["South-facing", "Big windows"] })).toBe(1);
  });

  it("preserves editorial order with no selection", () => {
    expect(rankListings(listings, {}).map((l) => l.title)).toEqual(listings.map((l) => l.title));
  });

  it("ranks by matches first, then score", () => {
    const selection = { "Work & rest": ["Dedicated office"] };
    const ranked = rankListings(listings, selection);
    expect(ranked[0].features).toContain("Dedicated office");
    // every listing with a match outranks every listing without one
    const matched = ranked.filter((l) => countMatches(l, selection) > 0).length;
    expect(ranked.slice(0, matched).every((l) => countMatches(l, selection) > 0)).toBe(true);
  });
});

describe("paginate / pageCount", () => {
  it("slices pages", () => {
    expect(paginate([1, 2, 3, 4, 5], 1, 2)).toEqual([1, 2]);
    expect(paginate([1, 2, 3, 4, 5], 3, 2)).toEqual([5]);
    expect(paginate([1, 2, 3], 9, 2)).toEqual([]);
  });

  it("counts pages with a minimum of one", () => {
    expect(pageCount(12, 6)).toBe(2);
    expect(pageCount(0, 6)).toBe(1);
  });
});

describe("demoFit / fitTone / rankDemo", () => {
  it("scores 0 empty, +30 per match, capped at 98", () => {
    expect(demoFit(0)).toBe(0);
    expect(demoFit(1)).toBe(30);
    expect(demoFit(2)).toBe(60);
    expect(demoFit(4)).toBe(98);
  });

  it("bands red at 0, amber while climbing, green at 75+", () => {
    expect(fitTone(0)).toBe("empty");
    expect(fitTone(1)).toBe("building");
    expect(fitTone(74)).toBe("building");
    expect(fitTone(75)).toBe("strong");
    expect(fitTone(98)).toBe("strong");
  });

  it("ranks demo homes by fit, then score", () => {
    const ranked = rankDemo(listings, ["Dedicated office"]);
    const fits = ranked.map((l) =>
      demoFit(l.features.filter((f) => f === "Dedicated office").length),
    );
    expect(fits).toEqual([...fits].sort((a, b) => b - a));
    expect(ranked[0].features).toContain("Dedicated office");
  });

  it("preserves editorial order with no active preferences", () => {
    expect(rankDemo(listings, []).map((l) => l.title)).toEqual(listings.map((l) => l.title));
  });
});
