export interface Property {
  label: string;
  emoji: string;
}

export interface Category {
  name: string;
  prompt: string;
  properties: Property[];
}

export interface Listing {
  title: string;
  area: string;
  rent: number;
  commute: string;
  score: number;
  features: string[];
  image: string;
  reason: string;
}

/** Maps category name -> selected property labels. */
export type Selection = Record<string, string[]>;
