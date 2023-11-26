import { useState, useEffect } from "react";

import { Input } from "./input";
import { Dropdown } from "./dropdown";
import { Button } from "./button";
import { PlusCircle, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

type FilterColumnType = "name" | "tvShows" | "videoGames";
type FilterType = {
  type: FilterColumnType;
  value: string;
};

const columnOptions = [
  { value: "name", label: "Name" },
  { value: "tvShows", label: "TV Show" },
  { value: "videoGames", label: "Video Games" },
];

export const Filters = () => {
  const [filters, setFilters] = useState<FilterType[]>([]);

  const [filterValue, setFilterValue] = useState("");
  const [filterType, setFilterType] = useState<FilterColumnType>("name");

  const debouncedFilterValue = useDebounce(filterValue, 500);

  useEffect(() => {
    setFilters([{ value: filterValue, type: filterType }, ...filters.slice(1)]);
  }, [debouncedFilterValue, filterType]);

  const handleNewFilter = () => {
    setFilters([{ value: "", type: "name" }, ...filters]);
    setFilterValue("");
    setFilterType("name");
  };

  const handleResetFilters = () => {
    setFilters([filters[0]]);
  };

  const createdFilters = filters.slice(1);
  const hasCreatedFilters = createdFilters.length > 0;

  return (
    <div className="flex flex-1 items-center justify-start gap-x-2">
      <div className="flex items-center">
        <Input
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Filter characters by..."
          className="rounded-r-none"
        />
        <Dropdown
          value={filterType}
          options={columnOptions}
          onChange={setFilterType}
          triggerClassName="rounded-l-none border-l-0"
          width={100}
        />
      </div>

      <div className="border border-dashed rounded-md flex gap-x-2 items-center px-2 h-8">
        <Button
          className="border-none text-xs p-0 hover:bg-transparent "
          disabled={filterValue.length === 0}
          onClick={handleNewFilter}
        >
          <div className="flex items-center gap-x-2">
            <PlusCircle className="w-4 h-4" />
            <span>Filter</span>
          </div>
        </Button>
        {hasCreatedFilters && <div className="border-r border-input h-4" />}
        {createdFilters.map(({ type, value }) => (
          <div
            key={`${type}-${value}`}
            className="inline-flex items-center border py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-sm px-1 font-normal"
          >
            {columnOptions.find((option) => option.value === type)?.label} :{" "}
            {value}
          </div>
        ))}
      </div>

      {hasCreatedFilters && (
        <Button className="border-none" onClick={handleResetFilters}>
          <div className="flex items-center gap-x-2">
            <span>Reset</span>
            <X className="w-4 h-4" />
          </div>
        </Button>
      )}
    </div>
  );
};
