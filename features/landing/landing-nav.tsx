"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetBody, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const links = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Homes", href: "/browse" },
  { label: "Reviews", href: "/#reviews" },
];

export function LandingNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-x-0 top-4 z-40 px-4">
        <nav
          aria-label="Primary"
          className="bg-background/80 mx-auto flex h-14 max-w-3xl items-center justify-between rounded-full border pr-2 pl-5 shadow-sm backdrop-blur"
        >
          <Link href="/" className="font-mono text-sm font-medium tracking-tight">
            hearth<span className="text-muted-foreground">/</span>
          </Link>
          <div className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <Button
              nativeButton={false}
              render={<Link href="/browse" />}
              className="hidden rounded-full md:inline-flex"
            >
              Browse homes
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="rounded-full md:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </Button>
          </div>
        </nav>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" aria-describedby={undefined}>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <SheetBody>
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="hover:bg-muted rounded-lg px-3 py-3 font-mono text-2xl font-normal tracking-tight transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                nativeButton={false}
                render={<Link href="/browse" />}
                className="mt-4 rounded-full"
              >
                Browse homes
              </Button>
            </div>
          </SheetBody>
        </SheetContent>
      </Sheet>
    </>
  );
}
