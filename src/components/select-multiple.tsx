import {
  DropdownRoot,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "./dropdown";
import { Check } from "lucide-react";

type SelectValue = number | string;

interface SelectProps {
  values: SelectValue[];
  options: { value: SelectValue; label: string }[];
  onChange: (newValues: SelectValue[]) => void;
  children?: React.ReactNode;
  contentClassName?: string;
  itemClassName?: string;
  align?: "start" | "end" | "center";
}

export const SelectMultiple = ({
  values,
  options,
  onChange,
  children,
  contentClassName,
  itemClassName,
  align,
}: SelectProps) => {
  const handleSelection = (value: SelectValue) => {
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
            key={value}
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
