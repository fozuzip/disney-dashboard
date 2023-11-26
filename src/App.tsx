import { useGetCharactersQuery } from "@/services/disney";

import { CharacterTable } from "@/components/character-table";
import { Pagination } from "@/components/pagination";
import { Filters } from "@/components/filters";

function App() {
  const { error, isLoading } = useGetCharactersQuery("");

  return (
    <div className="w-screen h-screen bg-background text-foreground border-border">
      <div className="relative mx-auto w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 py-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Disney Character Explorer
          </h1>
          <p className="text-muted-foreground">
            Discover, Explore, and Analyze the World of Disney Characters in a
            Dynamic Dashboard
          </p>
        </div>

        <div className="flex flex-col gap-y-4 pt-4">
          <div className="flex items-center justify-between">
            <Filters />
          </div>
          <CharacterTable />
          <div className="flex items-cetner justify-end px-2">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
