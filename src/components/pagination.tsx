import { useState } from "react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

import { useGetCharactersQuery } from "@/services/disney";
import { Button } from "@/components/button";
import { Dropdown } from "@/components/dropdown";

export const Pagination = () => {
  const { data } = useGetCharactersQuery("");

  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = data?.info?.totalPages;

  return (
    <div className="flex items-center gap-x-6">
      <div className="flex items-center gap-x-4">
        <p className="text-sm font-medium">Rows per page</p>
        <Dropdown
          value={rowsPerPage}
          options={[
            { value: 10, label: "10" },
            { value: 20, label: "20" },
            { value: 50, label: "50" },
            { value: 100, label: "100" },
            { value: 200, label: "200" },
            { value: 500, label: "500" },
          ]}
          onChange={(value) => setRowsPerPage(value)}
        />
      </div>

      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center justify-center gap-x-2">
        <Button disabled={currentPage === 1} className="h-8 w-8 p-0">
          <ChevronsLeft className="w-4 h-4 text-muted-foreground" />
        </Button>
        <Button disabled={currentPage === 1} className="h-8 w-8 p-0">
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </Button>
        <Button disabled={currentPage === totalPages} className="h-8 w-8 p-0">
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </Button>
        <Button disabled={currentPage === totalPages} className="h-8 w-8 p-0">
          <ChevronsRight className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
};
