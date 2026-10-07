"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

function Modal({ ...props }: Dialog.Root.Props) {
  return <Dialog.Root data-slot="modal" {...props} />;
}

function ModalContent({ className, children, ...props }: Dialog.Popup.Props) {
  return (
    <Dialog.Portal data-slot="modal-portal">
      <Dialog.Backdrop
        data-slot="modal-backdrop"
        className="fixed inset-0 z-50 bg-black/40 transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
      />
      <Dialog.Popup
        data-slot="modal-content"
        className={cn(
          "bg-card fixed top-1/2 left-1/2 z-50 grid max-h-[88vh] w-[calc(100vw-2.5rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 gap-0 overflow-y-auto rounded-xl shadow-xl transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
          className,
        )}
        {...props}
      >
        {children}
        <Dialog.Close
          aria-label="Close"
          className="bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground absolute top-3 right-3 rounded-full p-1.5 backdrop-blur transition-colors"
        >
          <X className="size-4" />
        </Dialog.Close>
      </Dialog.Popup>
    </Dialog.Portal>
  );
}

function ModalTitle({ className, ...props }: Dialog.Title.Props) {
  return (
    <Dialog.Title
      data-slot="modal-title"
      className={cn("font-mono text-2xl font-normal tracking-tight", className)}
      {...props}
    />
  );
}

function ModalDescription({ className, ...props }: Dialog.Description.Props) {
  return (
    <Dialog.Description
      data-slot="modal-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export { Modal, ModalContent, ModalTitle, ModalDescription };
export { Dialog as ModalPrimitive };
