import { Check } from "lucide-react";

import { cn } from "@/utils";
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "./dropdown";

interface SelectProps<ValueType> {
  values: ValueType[];
  options: { value: ValueType; label: string }[];
  onChange: (newValues: ValueType[]) => void;
  children?: React.ReactNode;
  contentClassName?: string;
  triggerClassName?: string;
  itemClassName?: string;
  align?: "start" | "end" | "center";
}

export const SelectMultiple = <ValueType,>({
  values,
  options,
  onChange,
  children,
  contentClassName,
  triggerClassName,
  itemClassName,
  align,
}: SelectProps<ValueType>) => {
  const handleSelection = (value: ValueType) => {
    onChange(
      values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value]
    );
  };

  return (
    <DropdownRoot>
      <DropdownTrigger
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3",
          triggerClassName
        )}
      >
        {children}
      </DropdownTrigger>
      <DropdownContent className={contentClassName} align={align || "center"}>
        {options.map(({ value, label }) => (
          <DropdownItem
            key={value as string}
            className={itemClassName}
            onSelect={() => handleSelection(value)}
          >
            <div className="flex items-center justify-between w-full">
              <div>{label}</div>
              {values.includes(value) && (
                <Check className="w-4 h-4 text-accent-foreground" />
              )}
            </div>
          </DropdownItem>
        ))}
      </DropdownContent>
    </DropdownRoot>
  );
};
