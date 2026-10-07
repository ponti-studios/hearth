import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PreferencePillProps {
  label: string;
  emoji: string;
  pressed: boolean;
  onToggle: () => void;
}

export function PreferencePill({ label, emoji, pressed, onToggle }: PreferencePillProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onToggle}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors",
        pressed
          ? "border-primary bg-secondary text-secondary-foreground font-medium"
          : "border-border bg-background hover:bg-muted",
      )}
    >
      <span aria-hidden="true">{emoji}</span>
      {label}
      {pressed && <Check className="size-4" />}
    </button>
  );
}
