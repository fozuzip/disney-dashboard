import { cn } from "@/utils";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

type Column = {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any) => React.ReactNode;
};

import { useState, useMemo } from "react";

interface TableProps {
  columns: Column[];
  uniqueKey: string;
  onRowClick?: (row: any) => void;
  data: any[];
}

export const Table = ({ columns, uniqueKey, onRowClick, data }: TableProps) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );

  const sortedData = useMemo(() => {
    if (sortKey === null) {
      return data;
    }
    return [...data].sort((a, b) => {
      let valueA = a[sortKey];
      let valueB = b[sortKey];

      if (typeof valueA === "string") valueA = valueA.toLowerCase();
      if (typeof valueB === "string") valueB = valueB.toLowerCase();

      if (Array.isArray(valueA)) valueA = valueA.length;
      if (Array.isArray(valueB)) valueB = valueB.length;

      if (sortDirection === "asc") {
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
      } else {
        if (valueA > valueB) return -1;
        if (valueA < valueB) return 1;
        return 0;
      }
    });
  }, [data, sortKey, sortDirection]);
  console.log(sortedData);

  const handleSort = (key: string) => {
    if (!sortKey || sortKey !== key) {
      setSortKey(key);
      setSortDirection("asc");
    } else if (sortKey === key) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        setSortKey(null);
        setSortDirection(null);
      }
    }
  };

  return (
    <div className="rounded-md border ">
      <div className="relative w-full overflow-auto ">
        <table className="w-full text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              {columns.map(({ key, label, width, sortable }) => (
                <th
                  key={key}
                  className={cn(
                    "h-10 px-4 text-left align-middle font-medium text-muted-foreground select-none",
                    sortable && "cursor-pointer"
                  )}
                  style={{ width: width || "auto" }}
                  colSpan={1}
                  onClick={() => sortable && handleSort(key)}
                >
                  <div className="flex items-center gap-x-2">
                    <div>{label}</div>
                    {sortable && (
                      <SortIcon
                        direction={sortKey === key ? sortDirection : null}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
      <div className="relative w-full overflow-auto max-h-[600px] overflow-y-auto">
        <table className="w-full text-sm">
          <tbody className="[&_tr:last-child]:border-0 ">
            {sortedData?.map((row) => (
              <tr
                key={row[uniqueKey]}
                className={cn(
                  "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
                  onRowClick && "cursor-pointer"
                )}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map(({ key, render, width }) => (
                  <td
                    key={key}
                    className="p-4 align-middle"
                    style={{ width: width || "auto" }}
                    colSpan={1}
                  >
                    {render ? render(row[key]) : row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SortIcon = ({ direction }: { direction: "asc" | "desc" | null }) => {
  if (!direction) return <ChevronsUpDown className="w-3 h-3" />;
  if (direction === "asc") return <ArrowUp className="w-3 h-3" />;
  if (direction === "desc") return <ArrowDown className="w-3 h-3" />;
};
