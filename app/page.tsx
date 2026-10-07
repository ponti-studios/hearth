import { Newsreader } from "next/font/google";
import { Closing } from "@/features/landing/closing";
import { FeaturedHomes } from "@/features/landing/featured-homes";
import { FitsYourSearch } from "@/features/landing/fits-your-search";
import { Hero } from "@/features/landing/hero";
import { HowItWorks } from "@/features/landing/how-it-works";
import { LandingNav } from "@/features/landing/landing-nav";
import { Problem } from "@/features/landing/problem";
import { Testimonials } from "@/features/landing/testimonials";
import { cn } from "@/lib/utils";

const serif = Newsreader({ subsets: ["latin"], weight: ["400", "500"] });

export default function Page() {
  return (
    <div className={cn(serif.className, "text-foreground min-h-screen bg-[#faf9f7] antialiased")}>
      <LandingNav />
      <main>
        <Hero />
        <FeaturedHomes />
        <Problem />
        <HowItWorks />
        <FitsYourSearch />
        <Testimonials />
        <Closing />
      </main>
    </div>
  );
}
