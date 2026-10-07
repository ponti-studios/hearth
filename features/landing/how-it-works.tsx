"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { listings } from "@/data/listings";
import { demoFit, fitTone, rankDemo } from "@/lib/preferences";
import type { FitTone } from "@/lib/preferences";
import { PreferencePill } from "@/features/preferences/preference-pill";
import { cn } from "@/lib/utils";

const demoPills = [
  { label: "Dedicated office", emoji: "🖥️" },
  { label: "South-facing", emoji: "🌞" },
  { label: "Parks nearby", emoji: "🌲" },
  { label: "Bike storage", emoji: "🚲" },
  { label: "Good internet", emoji: "📶" },
  { label: "Leafy streets", emoji: "🍃" },
];

const STEP_DELAY_MS = 1400;
const HOLD_MS = 3000;

const toneText: Record<FitTone, string> = {
  empty: "text-red-500",
  building: "text-amber-500",
  strong: "text-green-600",
};

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Tween towards `target` with cubic ease-out; jumps instantly when reduced motion is on. */
function useTweenedNumber(target: number, disabled: boolean): number {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    if (disabled) {
      fromRef.current = target;
      setValue(target);
      return;
    }
    const from = fromRef.current;
    if (from === target) return;
    const start = performance.now();
    const duration = 650;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      fromRef.current = target;
    };
  }, [target, disabled]);

  return value;
}

function FitBadge({ fit }: { fit: number }) {
  const reduced = usePrefersReducedMotion();
  const display = useTweenedNumber(fit, reduced);
  return (
    <span
      className={cn("font-mono text-sm font-semibold tabular-nums", toneText[fitTone(display)])}
    >
      {display}% fit
    </span>
  );
}

function useInView<T extends HTMLElement>(threshold = 0.3): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const steps = [
  {
    n: "01",
    title: "Tell us what matters.",
    body: "Tap the details that shape your days — light, quiet, somewhere to work, somewhere to exhale.",
  },
  {
    n: "02",
    title: "Watch homes re-rank.",
    body: "Every pick re-sorts the city around you. The best fits rise; nothing disappears.",
  },
  {
    n: "03",
    title: "See why it fits.",
    body: "Each home shows its reasoning — which of your preferences it satisfies, and the commute to prove it.",
  },
];

export function HowItWorks() {
  const reducedMotion = usePrefersReducedMotion();
  const [demoRef, inView] = useInView<HTMLDivElement>();
  const [active, setActive] = useState<string[]>([]);
  const [auto, setAuto] = useState(true);

  // Autoplay while the demo is on screen: add one preference at a time, hold
  // the full board, then loop. Scrolling away pauses it.
  useEffect(() => {
    if (!auto || reducedMotion || !inView) return;
    if (active.length >= demoPills.length) {
      const hold = setTimeout(() => setActive([]), HOLD_MS);
      return () => clearTimeout(hold);
    }
    const delay = active.length === 0 ? 900 : STEP_DELAY_MS;
    const timer = setTimeout(() => {
      setActive((current) => [...current, demoPills[current.length].label]);
    }, delay);
    return () => clearTimeout(timer);
  }, [auto, active, reducedMotion, inView]);

  const ranked = useMemo(() => {
    const wanted = new Set(active);
    return rankDemo(listings, active)
      .slice(0, 3)
      .map((listing) => ({
        listing,
        fit: demoFit(listing.features.filter((feature) => wanted.has(feature)).length),
      }));
  }, [active]);

  const toggle = (label: string) => {
    setAuto(false);
    setActive((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    );
  };

  const replay = () => {
    setActive([]);
    setAuto(true);
  };

  const lastAdded = active.length > 0 ? active[active.length - 1] : null;

  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-10 md:py-28"
    >
      <p className="text-muted-foreground font-mono text-xs tracking-[0.16em] uppercase">
        <span
          aria-hidden="true"
          className="bg-foreground mr-2 inline-block size-1.5 rounded-full"
        />
        How it works
      </p>
      <h2 className="mt-4 max-w-2xl text-4xl leading-tight font-medium tracking-tight text-balance md:text-6xl">
        Hearth reads them all. You see what fits you.
      </h2>

      <Card ref={demoRef} className="mt-10">
        <CardContent className="flex flex-col gap-6 p-6 md:p-8">
          <div className="flex items-center justify-center gap-2">
            <span aria-hidden="true" className="bg-foreground size-2 rounded-full" />
            <p className="text-muted-foreground font-mono text-xs tracking-[0.16em] uppercase">
              Watch Hearth decide — live
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {demoPills.map((pill) => (
              <PreferencePill
                key={pill.label}
                label={pill.label}
                emoji={pill.emoji}
                pressed={active.includes(pill.label)}
                onToggle={() => toggle(pill.label)}
              />
            ))}
          </div>
          <div className="mx-auto flex w-full max-w-xl flex-col gap-2">
            {ranked.map(({ listing, fit }, i) => (
              <div
                key={listing.title}
                className="flex items-center justify-between gap-4 rounded-xl border px-4 py-3"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-muted-foreground font-mono text-xs">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium">{listing.title}</p>
                    <p className="text-muted-foreground text-xs">{listing.area}</p>
                  </div>
                </div>
                <FitBadge fit={fit} />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
            <p className="text-muted-foreground text-xs" aria-live="polite">
              {!auto &&
                active.length === 0 &&
                "Tap a preference above to re-rank these homes around you."}
              {!auto && active.length > 0 && "You're driving — tap to toggle, or replay the demo."}
              {auto &&
                (lastAdded
                  ? `Adding “${lastAdded}”… ${active.length} of ${demoPills.length}`
                  : "Reading every home…")}
            </p>
            {!auto && (
              <Button variant="outline" size="sm" onClick={replay} className="rounded-full">
                <RotateCcw data-icon="inline-start" /> Replay demo
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <ol className="mt-8 grid gap-5 md:grid-cols-3">
        {steps.map((step) => (
          <li key={step.n}>
            <Card className="h-full">
              <CardContent className="flex flex-col gap-3 p-6">
                <span className="text-muted-foreground font-mono text-xs">{step.n}</span>
                <h3 className="font-mono text-2xl font-normal tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-6">{step.body}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  );
}
