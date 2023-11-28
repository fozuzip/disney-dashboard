import { cn } from "@/utils";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const DropdownRoot = DropdownMenu.Root;
const DropdownTrigger = DropdownMenu.Trigger;

interface DropdownContentProps
  extends React.ComponentProps<typeof DropdownMenu.Content> {}

const DropdownContent = ({
  className,
  children,
  ...props
}: DropdownContentProps) => (
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      className={cn(
        "z-50 min-w-[5rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:mb-2",
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
);

interface DropdownItemProps
  extends React.ComponentProps<typeof DropdownMenu.Item> {}

const DropdownItem = ({ className, children, ...props }: DropdownItemProps) => (
  <DropdownMenu.Item
    className={cn(
      "relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 pl-2 hover:bg-muted cursor-pointer",
      className
    )}
    {...props}
  >
    {children}
  </DropdownMenu.Item>
);

export { DropdownRoot, DropdownTrigger, DropdownContent, DropdownItem };
