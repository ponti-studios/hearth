import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-4 px-5 text-center">
      <h1 className="font-mono text-3xl font-medium tracking-tight">Page not found</h1>
      <p className="text-muted-foreground text-sm">
        Hearth lives on a single page — head back home.
      </p>
      <Button nativeButton={false} render={<Link href="/" />}>
        Back home
      </Button>
    </main>
  );
}
