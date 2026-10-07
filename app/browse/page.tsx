import type { Metadata } from "next";
import { BrowsePage } from "@/features/browse/browse-page";

export const metadata: Metadata = {
  title: "Browse homes",
  description: "Browse London rentals ranked around the life inside them.",
};

export default function Browse() {
  return <BrowsePage />;
}
