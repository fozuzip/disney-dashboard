import { cn } from "@/utils";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronsUpDown, Check } from "lucide-react";

type DropdownValue = number | string;

interface DropdownProps {
  value: DropdownValue;
  options: { value: DropdownValue; label: string }[];
  onChange: (value: DropdownValue) => void;

  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  width?: number;
}
export const Dropdown = ({
  value,
  options,
  onChange,
  triggerClassName,
  contentClassName,
  itemClassName,
  width,
}: DropdownProps) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={cn(
          "flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 h-8",
          triggerClassName
        )}
        style={{ width: width ? `${width}px` : "70px" }}
      >
        <span className="pointer-events-none">{selectedOption?.label}</span>
        <ChevronsUpDown className="w-3 h-3 text-muted-foreground" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align="end"
        className={cn(
          "z-50 min-w-[5rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:mb-2",
          contentClassName
        )}
      >
        {options.map(({ value, label }) => (
          <DropdownMenu.Item
            key={value}
            className={cn(
              "relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 pl-2 hover:bg-muted cursor-pointer",
              selectedOption?.value === value && "bg-muted/50",
              itemClassName
            )}
            onSelect={() => onChange(value)}
          >
            <div className="flex items-center justify-between w-full">
              <div>{label}</div>
              {selectedOption?.value === value && (
                <Check className="w-4 h-4 text-accent-foreground" />
              )}
            </div>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
