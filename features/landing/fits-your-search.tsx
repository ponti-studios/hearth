import { DoorOpen, Eye, Sparkles, TrainFront } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: TrainFront,
    title: "Commute-first.",
    body: "Every home is measured against King's Cross. The journey is part of the fit, so it's part of the card.",
  },
  {
    icon: Eye,
    title: "Reasoning, visible.",
    body: "No black box. Each home tells you which of your preferences it satisfies — and which it doesn't.",
  },
  {
    icon: DoorOpen,
    title: "No gatekeeping.",
    body: "See every home before you pick a single preference. Filters re-rank; they never hide.",
  },
  {
    icon: Sparkles,
    title: "Free to browse.",
    body: "Twelve London homes, fully explorable. No account, no saved search, no drip-feed emails.",
  },
];

export function FitsYourSearch() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28" aria-label="Features">
      <p className="text-muted-foreground font-mono text-xs tracking-[0.16em] uppercase">
        <span
          aria-hidden="true"
          className="bg-foreground mr-2 inline-block size-1.5 rounded-full"
        />
        Made for your search
      </p>
      <h2 className="mt-4 max-w-2xl text-4xl leading-tight font-medium tracking-tight text-balance md:text-6xl">
        Fits the way you search.
      </h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.title} className="h-full">
            <CardContent className="flex flex-col gap-3 p-6 md:p-8">
              <feature.icon className="text-muted-foreground size-5" aria-hidden="true" />
              <h3 className="font-mono text-2xl font-normal tracking-tight">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-6">{feature.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
