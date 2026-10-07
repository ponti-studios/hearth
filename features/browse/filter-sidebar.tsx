import { categories } from "@/data/categories";
import { countPreferences } from "@/lib/preferences";
import type { Selection } from "@/lib/types";
import { CategoryCard } from "@/features/preferences/category-card";

interface FilterSidebarProps {
  selected: Selection;
  onToggle: (category: string, label: string) => void;
  onClearCategory: (category: string) => void;
  onClearAll: () => void;
}

export function FilterSidebar({
  selected,
  onToggle,
  onClearCategory,
  onClearAll,
}: FilterSidebarProps) {
  const total = countPreferences(selected);

  return (
    <div className="flex flex-col gap-4">
      <div className="hidden items-baseline justify-between lg:flex">
        <h2 className="font-mono text-lg font-normal">Filters</h2>
        {total > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 hover:underline"
          >
            Clear all ({total})
          </button>
        )}
      </div>
      {categories.map((category) => (
        <CategoryCard
          key={category.name}
          category={category}
          picks={selected[category.name] ?? []}
          onToggle={(label) => onToggle(category.name, label)}
          onClear={() => onClearCategory(category.name)}
        />
      ))}
    </div>
  );
}
