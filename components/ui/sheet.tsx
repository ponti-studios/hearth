"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

function Sheet({ ...props }: Dialog.Root.Props) {
  return <Dialog.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: Dialog.Trigger.Props) {
  return <Dialog.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetPortal({ ...props }: Dialog.Portal.Props) {
  return <Dialog.Portal data-slot="sheet-portal" {...props} />;
}

function SheetBackdrop({ className, ...props }: Dialog.Backdrop.Props) {
  return (
    <Dialog.Backdrop
      data-slot="sheet-backdrop"
      className={cn(
        "fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

type SheetSide = "left" | "right";

function SheetContent({
  className,
  side = "left",
  children,
  ...props
}: Dialog.Popup.Props & { side?: SheetSide }) {
  return (
    <SheetPortal>
      <SheetBackdrop />
      <Dialog.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "bg-background fixed top-0 z-50 flex h-full w-[86vw] max-w-sm flex-col shadow-xl transition-transform duration-300 ease-out",
          side === "left"
            ? "left-0 border-r data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full"
            : "right-0 border-l data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full",
          className,
        )}
        {...props}
      >
        {children}
        <Dialog.Close
          aria-label="Close"
          className="text-muted-foreground hover:bg-muted hover:text-foreground absolute top-4 right-4 rounded-md p-1 transition-colors"
        >
          <X className="size-4" />
        </Dialog.Close>
      </Dialog.Popup>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1 border-b p-5 pr-12", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: Dialog.Title.Props) {
  return (
    <Dialog.Title
      data-slot="sheet-title"
      className={cn("font-mono text-xl font-normal tracking-tight", className)}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }: Dialog.Description.Props) {
  return (
    <Dialog.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-body"
      className={cn("flex-1 overflow-y-auto p-5", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="sheet-footer" className={cn("flex gap-2 border-t p-5", className)} {...props} />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetPortal,
  SheetBackdrop,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
};
