import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Category } from "@/lib/types";
import { PreferencePill } from "./preference-pill";

interface CategoryCardProps {
  category: Category;
  picks: string[];
  onToggle: (label: string) => void;
  onClear: () => void;
}

export function CategoryCard({ category, picks, onToggle, onClear }: CategoryCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-4 pb-3">
        <div>
          <CardTitle className="font-mono text-lg font-normal">{category.name}</CardTitle>
          <p className="text-muted-foreground mt-0.5 text-xs">{category.prompt}</p>
        </div>
        {picks.length > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{picks.length}</Badge>
            <button
              type="button"
              onClick={onClear}
              className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 hover:underline"
            >
              Clear
            </button>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1.5">
        {category.properties.map((property) => (
          <PreferencePill
            key={property.label}
            label={property.label}
            emoji={property.emoji}
            pressed={picks.includes(property.label)}
            onToggle={() => onToggle(property.label)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
