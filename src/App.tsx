import { useState } from "react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

import { useGetCharactersQuery } from "@/services/disney";
import { Dropdown } from "@/components/dropdown";
import { Button } from "@/components/button";

function App() {
  const { data, error, isLoading } = useGetCharactersQuery("");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  console.log(data, error, isLoading);

  if (isLoading || !data) return null;
  if (error) {
    return (
      <div className="w-screen h-screen bg-background text-foreground border-border flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            An unexpected Error occured
          </h2>
        </div>
      </div>
    );
  }

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

        <div className="my-4">
          <div className="rounded-md border ">
            <div className="relative w-full overflow-auto ">
              <table className="w-full text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th
                      className="h-10 px-2 text-left align-middle font-medium text-muted-foreground"
                      colSpan={1}
                    >
                      Name
                    </th>
                    <th
                      className="h-10 px-2 text-left align-middle font-medium text-muted-foreground"
                      colSpan={1}
                    >
                      # of tv shows
                    </th>
                    <th
                      className="h-10 px-2 text-left align-middle font-medium text-muted-foreground"
                      colSpan={1}
                    >
                      # of video games
                    </th>
                    <th
                      className="h-10 px-2 text-left align-middle font-medium text-muted-foreground"
                      colSpan={1}
                    >
                      Allies
                    </th>
                    <th
                      className="h-10 px-2 text-left align-middle font-medium text-muted-foreground"
                      colSpan={1}
                    >
                      Enemies
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="relative w-full overflow-auto max-h-[600px] overflow-y-auto">
              <table className="w-full text-sm">
                <tbody className="[&_tr:last-child]:border-0 ">
                  {data.data?.map(
                    ({ name, tvShows, videoGames, allies, enemies }) => (
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle ">
                          <div className="w-[200px]">{name}</div>
                        </td>
                        <td className="p-4 align-middle ">
                          <div>{tvShows?.length}</div>
                        </td>
                        <td className="p-4 align-middle ">
                          <div>{videoGames?.length}</div>
                        </td>
                        <td className="p-4 align-middle ">
                          <div>
                            {allies?.map((ally) => (
                              <div>{ally}</div>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 align-middle ">
                          <div>
                            {enemies?.map((enemy) => (
                              <div>{enemy}</div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-cetner justify-end px-2 py-4">
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
                Page {currentPage} of {data.info?.totalPages}
              </div>
              <div className="flex items-center justify-center gap-x-2">
                <Button>
                  <ChevronsLeft className="w-4 h-4 text-muted-foreground" />
                </Button>
                <Button>
                  <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                </Button>
                <Button>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Button>
                <Button>
                  <ChevronsRight className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
