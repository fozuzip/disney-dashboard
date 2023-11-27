import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}: ModalProps) => (
  <Dialog.Root open={isOpen}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <Dialog.Content
        className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
        onPointerDownOutside={onClose}
      >
        <Dialog.Title className="flex flex-col space-y-1.5 text-center sm:text-left">
          {title}
        </Dialog.Title>
        <Dialog.Description className="text-sm text-muted-foreground">
          {description}
        </Dialog.Description>
        <Dialog.Close
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 ring-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Dialog.Close>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
