import { Check } from "lucide-react";

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
  itemClassName?: string;
  align?: "start" | "end" | "center";
}

export const SelectMultiple = <ValueType,>({
  values,
  options,
  onChange,
  children,
  contentClassName,
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
      <DropdownTrigger>{children}</DropdownTrigger>
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
