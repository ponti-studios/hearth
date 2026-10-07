import Image from "next/image";
import { TrainFront } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Modal, ModalContent, ModalDescription, ModalTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatRent } from "@/lib/preferences";
import type { Listing } from "@/lib/types";

interface ListingDialogProps {
  listing: Listing | null;
  matches: number;
  filtering: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ListingDialog({ listing, matches, filtering, onOpenChange }: ListingDialogProps) {
  return (
    <Modal open={listing !== null} onOpenChange={onOpenChange}>
      <ModalContent aria-describedby={undefined}>
        {listing && (
          <div>
            <div className="relative">
              <Image
                src={listing.image}
                alt={`${listing.title} — ${listing.area}`}
                width={900}
                height={600}
                sizes="(max-width: 768px) 100vw, 672px"
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-4 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <ModalTitle>{listing.title}</ModalTitle>
                  <ModalDescription className="mt-1">
                    {listing.area} · {listing.commute} to King&apos;s Cross
                  </ModalDescription>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xl font-semibold">{listing.score}%</p>
                  <p className="text-muted-foreground text-xs">fit</p>
                </div>
              </div>
              {filtering && (
                <Badge variant={matches > 0 ? "secondary" : "outline"} className="w-fit">
                  {matches > 0
                    ? `Matches ${matches} of your preferences`
                    : "No direct preference matches"}
                </Badge>
              )}
              <p className="text-muted-foreground text-sm leading-6">{listing.reason}</p>
              <Separator />
              <div className="flex flex-wrap gap-2">
                {listing.features.map((feature) => (
                  <Badge variant="outline" key={feature}>
                    {feature}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-sm">
                  <TrainFront className="size-4" /> {listing.commute} to King&apos;s Cross
                </p>
                <p className="text-sm font-medium">{formatRent(listing.rent)}</p>
              </div>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
