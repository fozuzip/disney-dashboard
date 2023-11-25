import { cn } from "@/utils";

type Column = {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any) => React.ReactNode;
};

interface TableProps {
  columns: Column[];
  uniqueKey: string;
  onRowClick?: (row: any) => void;
  data: any[];
}

export const Table = ({ columns, uniqueKey, onRowClick, data }: TableProps) => {
  if (!data) {
    return null;
  }
  console.log(data);
  return (
    <div className="rounded-md border ">
      <div className="relative w-full overflow-auto ">
        <table className="w-full text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              {columns.map(({ key, label, width }) => (
                <th
                  key={key}
                  className="h-10 px-4 text-left align-middle font-medium text-muted-foreground"
                  style={{ width: width || "auto" }}
                  colSpan={1}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
      <div className="relative w-full overflow-auto max-h-[600px] overflow-y-auto">
        <table className="w-full text-sm">
          <tbody className="[&_tr:last-child]:border-0 ">
            {data?.map((row) => (
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
