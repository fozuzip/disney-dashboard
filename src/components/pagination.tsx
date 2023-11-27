import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/button";
import { Dropdown } from "@/components/dropdown";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
}

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: PaginationProps) => {
  return (
    <div className="flex items-center gap-x-6">
      <div className="flex items-center gap-x-4">
        <p className="text-sm font-medium">Rows per page</p>
        <Dropdown
          value={pageSize}
          options={[
            { value: 10, label: "10" },
            { value: 20, label: "20" },
            { value: 50, label: "50" },
            { value: 100, label: "100" },
            { value: 200, label: "200" },
            { value: 500, label: "500" },
          ]}
          onChange={onPageSizeChange}
        />
      </div>

      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {page} of {totalPages}
      </div>
      <div className="flex items-center justify-center gap-x-2">
        <Button
          disabled={page === 1}
          className="h-8 w-8 p-0"
          onClick={() => onPageChange(1)}
        >
          <ChevronsLeft className="w-4 h-4 text-muted-foreground" />
        </Button>
        <Button
          disabled={page === 1}
          className="h-8 w-8 p-0"
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </Button>
        <Button
          disabled={page === totalPages}
          className="h-8 w-8 p-0"
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </Button>
        <Button
          disabled={page === totalPages}
          className="h-8 w-8 p-0"
          onClick={() => onPageChange(totalPages)}
        >
          <ChevronsRight className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
};
