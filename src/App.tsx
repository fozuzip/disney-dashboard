import { useState, useEffect } from "react";

import { useGetCharactersQuery } from "@/services/disney";
import { Character, FilterType } from "@/services/types";

import { CharacterTable } from "@/components/character-table";
import { Pagination } from "@/components/pagination";
import { Filters } from "@/components/filters";
import { CharacterDescriptionModal } from "./components/character-description-modal";
import { ChartModal } from "./components/chart-modal";
import { Button } from "./components/button";
import { PieChart } from "lucide-react";

function App() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const { data, error, isFetching } = useGetCharactersQuery({
    page,
    pageSize,
    filters,
  });

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);

  // Reset page when page size changes
  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  return (
    <div className="w-screen h-screen bg-background text-foreground border-border">
      <div className="relative mx-auto w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Disney Character Explorer
            </h1>
            <p className="text-muted-foreground">
              Discover, Explore, and Analyze the World of Disney Characters in a
              Dynamic Dashboard
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-4 pt-4">
          <div className="flex items-center justify-between">
            <Filters filters={filters} onFiltersChange={setFilters} />

            <Button
              className="text-xs "
              onClick={() => setIsChartModalOpen(true)}
            >
              <div className="flex items-center gap-x-2">
                <PieChart className="w-3 h-3" />
                <span>Chart</span>
              </div>
            </Button>
          </div>
          <CharacterTable
            data={data?.data || []}
            onRowClick={setSelectedCharacter}
            isLoading={isFetching}
            hasError={!!error}
          />
          <div className="flex items-cetner justify-end px-2">
            <Pagination
              page={page}
              totalPages={data?.info.totalPages || 0}
              onPageChange={setPage}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          </div>
        </div>
      </div>
      <CharacterDescriptionModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
      <ChartModal
        isOpen={isChartModalOpen}
        onClose={() => setIsChartModalOpen(false)}
      />
    </div>
  );
}

export default App;
