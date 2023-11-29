import { useState, useEffect } from "react";
import { PieChart, SlidersHorizontal } from "lucide-react";

import {
  useGetCharactersQuery,
  Character,
  FilterType,
} from "@/services/disneyApi";
import { Button } from "@/components/ui/button";
import { SelectMultiple } from "@/components/ui/select-multiple";
import {
  CharacterTable,
  CharacterTableColumnKey,
} from "@/components/character-table";
import { Pagination } from "@/components/pagination";
import { Filters } from "@/components/filters";
import { CharacterModal } from "@/components/character-modal";
import { ChartModal } from "@/components/chart-modal";
import { ThemeToggle } from "./components/ui/theme-toggle";

function App() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const { data, error, isFetching } = useGetCharactersQuery({
    page,
    pageSize,
    filters,
  });

  const [visibleColumns, setVisibleColumns] = useState<
    CharacterTableColumnKey[]
  >([
    "imageUrl",
    "name",
    "tvShows",
    "videoGames",
    "allies",
    "enemies",
    "sourceUrl",
  ]);

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);

  // Reset page when page size changes
  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const tableRows = data?.data || [];

  return (
    <div className="w-screen h-screen bg-background text-foreground border-border">
      <div className="relative mx-auto w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-center relative mb-6">
          <div className="flex flex-col items-center gap-y-2">
            <h1 className="text-7xl font-heading">Disney Characters</h1>
          </div>
          <div className="absolute inset-y-0 right-0 flex flex-col justify-center">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-col gap-y-4 pt-4">
          <div className="flex items-center justify-between">
            <Filters filters={filters} onFiltersChange={setFilters} />

            <div className="flex items-center gap-x-2">
              <Button
                className="text-xs"
                onClick={() => setIsChartModalOpen(true)}
                disabled={!tableRows.length}
              >
                <div className="flex items-center gap-x-2">
                  <PieChart className="w-3 h-3" />
                  <span>Chart</span>
                </div>
              </Button>
              <SelectMultiple
                values={visibleColumns}
                options={[
                  { value: "imageUrl", label: "Avatar" },
                  { value: "name", label: "Name" },
                  { value: "films", label: "Films" },
                  { value: "tvShows", label: "TV Shows" },
                  { value: "videoGames", label: "Video Games" },
                  { value: "allies", label: "Allies" },
                  { value: "enemies", label: "Enemies" },
                  { value: "sourceUrl", label: "Wiki Link" },
                ]}
                contentClassName="w-[140px] mt-2"
                align="start"
                onChange={setVisibleColumns}
              >
                <Button
                  className="text-xs "
                  onClick={() => setIsChartModalOpen(true)}
                >
                  <div className="flex items-center gap-x-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>View</span>
                  </div>
                </Button>
              </SelectMultiple>
            </div>
          </div>
          <CharacterTable
            data={tableRows}
            visibleColumns={visibleColumns}
            onRowClick={setSelectedCharacter}
            isLoading={isFetching}
            hasError={!!error}
          />

          <Pagination
            page={page}
            totalPages={data?.info.totalPages || 0}
            onPageChange={setPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>
      <CharacterModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
      <ChartModal
        isOpen={isChartModalOpen}
        onClose={() => setIsChartModalOpen(false)}
        data={tableRows}
      />
    </div>
  );
}

export default App;
