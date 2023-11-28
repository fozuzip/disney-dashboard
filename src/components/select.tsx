import { cn } from "@/utils";
import { Button } from "./button";
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "./dropdown";
import { Check, ChevronsUpDown } from "lucide-react";

type SelectValue = number | string;

interface SelectProps {
  value: SelectValue;
  options: { value: SelectValue; label: string }[];
  onChange: (value: SelectValue) => void;

  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  width?: number;
}

export const Select = ({
  value,
  options,
  onChange,
  triggerClassName,
  contentClassName,
  itemClassName,
  width,
}: SelectProps) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <DropdownRoot>
      <DropdownTrigger>
        <Button
          className={cn(
            "flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 h-8",
            triggerClassName
          )}
          style={{ width: width ? `${width}px` : "70px" }}
        >
          <div className="flex w-full items-center justify-between">
            <span className="pointer-events-none">{selectedOption?.label}</span>
            <ChevronsUpDown className="w-3 h-3 text-muted-foreground" />
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownContent className={contentClassName}>
        {options.map(({ value, label }) => (
          <DropdownItem
            key={value}
            className={cn(
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
          </DropdownItem>
        ))}
      </DropdownContent>
    </DropdownRoot>
  );
};
