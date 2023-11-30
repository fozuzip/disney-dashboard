import { useState, useMemo, useRef, useEffect } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  Frown,
  ServerCrash,
} from "lucide-react";

import { cn } from "@/utils";
import { Spinner } from "./spinner";

type Column = {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
};

interface TableProps<RowType> {
  columns: Column[];
  uniqueKey: string;
  onRowClick?: (row: RowType) => void;
  data: RowType[];
  isLoading?: boolean;
  hasError?: boolean;
}

export const Table = <RowType,>({
  columns,
  uniqueKey,
  onRowClick,
  data,
  isLoading,
  hasError,
}: TableProps<RowType>) => {
  const tableBodyRef = useRef<HTMLDivElement>(null);

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

  // Scroll to top when data changes
  useEffect(() => {
    if (tableBodyRef.current) {
      tableBodyRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [sortedData]);

  return (
    <div className="relative rounded-md border ">
      {isLoading && <LoadingView />}

      <div className="w-full overflow-auto ">
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
      <div className="w-full h-[600px] overflow-y-auto " ref={tableBodyRef}>
        {hasError ? (
          <ErrorView />
        ) : data.length === 0 && !isLoading ? (
          <EmptyView />
        ) : (
          <div className="overflow-auto">
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
                        {render ? render(row[key], row) : row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const SortIcon = ({ direction }: { direction: "asc" | "desc" | null }) => {
  if (!direction) return <ChevronsUpDown className="w-3 h-3" />;
  if (direction === "asc") return <ArrowUp className="w-3 h-3" />;
  if (direction === "desc") return <ArrowDown className="w-3 h-3" />;
};

const LoadingView = () => {
  return (
    <div className="absolute w-full h-full flex items-center justify-center bg-background/50">
      <h1 className="text-2xl text-muted-foreground/50">
        <Spinner />
      </h1>
    </div>
  );
};

const EmptyView = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Frown className="w-[80px] h-[80px] text-muted-foreground/50 pb-8" />
        <h1 className="text-2xl text-muted-foreground/50">
          No characters found...
        </h1>
      </div>
    </div>
  );
};

const ErrorView = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <ServerCrash className="w-[80px] h-[80px] text-muted-foreground/50 pb-8" />
        <h1 className="text-2xl text-muted-foreground/50">
          Something went wrong
        </h1>
      </div>
    </div>
  );
};
