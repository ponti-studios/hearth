"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-4 px-5 text-center">
      <h1 className="font-mono text-3xl font-medium tracking-tight">Something went wrong</h1>
      <p className="text-muted-foreground text-sm">
        Please try again — your preferences are kept on this page.
      </p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
