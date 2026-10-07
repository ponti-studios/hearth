import { Card, CardContent } from "@/components/ui/card";

const quotes = [
  {
    name: "Maya",
    context: "Renting in Hackney",
    body: "I stopped opening the portals. I just tell Hearth what matters and look at the top three.",
  },
  {
    name: "Tom",
    context: "Moving from Manchester",
    body: "The commute on every card sold me. I don't know London — now I don't have to.",
  },
  {
    name: "Priya",
    context: "Flat-hunting with a partner",
    body: "We finally stopped arguing about listings. The reasoning is right there — no more 'trust me'.",
  },
  {
    name: "Jonas",
    context: "Working from home",
    body: "It surfaced the one flat with a real office and told me why. Two viewings later, done.",
  },
];

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-10 md:py-28"
      aria-label="Reviews"
    >
      <p className="text-muted-foreground text-center font-mono text-xs tracking-[0.16em] uppercase">
        <span
          aria-hidden="true"
          className="bg-foreground mr-2 inline-block size-1.5 rounded-full"
        />
        Renters
      </p>
      <h2 className="mx-auto mt-4 max-w-2xl text-center text-4xl leading-tight font-medium tracking-tight text-balance md:text-6xl">
        Turns out a calmer search feels… <em>amazing</em>.
      </h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {quotes.map((quote) => (
          <Card key={quote.name} className="h-full">
            <CardContent className="flex h-full flex-col gap-4 p-6 md:p-8">
              <p className="text-base leading-7">{quote.body}</p>
              <div className="mt-auto flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="bg-secondary text-secondary-foreground flex size-9 items-center justify-center rounded-full font-mono text-sm"
                >
                  {quote.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-medium">{quote.name}</p>
                  <p className="text-muted-foreground text-xs">{quote.context}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
