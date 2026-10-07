import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-32 text-center md:pt-40">
      <Badge variant="outline" className="rounded-full px-4 py-1.5 font-normal">
        Personal property agent
      </Badge>
      <h1 className="mt-6 text-5xl leading-[1.05] font-medium tracking-tight text-balance md:text-7xl">
        Love where you live.
      </h1>
      <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-3xl leading-tight text-balance md:text-4xl">
        Find the London home that fits the life inside it.
      </p>
      <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-base leading-7">
        Hearth calms the portal noise, ranks homes around what matters to you, and shows its
        reasoning — so you can stop scrolling and start seeing.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button
          nativeButton={false}
          size="lg"
          render={<Link href="/browse" />}
          className="rounded-full px-7"
        >
          Browse homes <ArrowRight data-icon="inline-end" />
        </Button>
        <Button
          nativeButton={false}
          size="lg"
          variant="outline"
          render={<Link href="/#how-it-works" />}
          className="rounded-full px-7"
        >
          How it works
        </Button>
      </div>
      <p className="text-muted-foreground mt-5 text-xs">
        12 homes across London · Free to browse · No account needed
      </p>
      <div className="mt-12 overflow-hidden rounded-3xl border shadow-sm">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          alt="A London home exterior at golden hour"
          width={1600}
          height={900}
          sizes="(max-width: 896px) 100vw, 896px"
          priority
          className="aspect-[16/9] w-full object-cover"
        />
      </div>
    </section>
  );
}
