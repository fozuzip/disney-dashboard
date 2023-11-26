import { cn } from "@/utils";
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  Frown,
  ServerCrash,
} from "lucide-react";

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
  isLoading?: boolean;
  hasError?: boolean;
}

export const Table = ({
  columns,
  uniqueKey,
  onRowClick,
  data,
  isLoading,
  hasError,
}: TableProps) => {
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
      <div className="relative w-full overflow-auto h-[600px] overflow-y-auto ">
        {isLoading && <LoadingView />}

        {hasError ? (
          <ErrorView />
        ) : data.length === 0 && !isLoading ? (
          <EmptyView />
        ) : (
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
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
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
