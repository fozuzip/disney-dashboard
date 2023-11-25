import { useGetCharactersQuery } from "@/services/disney";

function App() {
  const { data, error, isLoading } = useGetCharactersQuery("");

  console.log(data, error, isLoading);

  if (!data) return null;

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
            <div className="relative w-full overflow-auto">
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
                <tbody className="[&_tr:last-child]:border-0">
                  {data.data?.map(
                    ({ name, tvShows, videoGames, allies, enemies }) => (
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-2 align-middle ">
                          <div className="w-[200px]">{name}</div>
                        </td>
                        <td className="p-2 align-middle ">
                          <div>{tvShows?.length}</div>
                        </td>
                        <td className="p-2 align-middle ">
                          <div>{videoGames?.length}</div>
                        </td>
                        <td className="p-2 align-middle ">
                          <div>
                            {allies?.map((ally) => (
                              <div>{ally}</div>
                            ))}
                          </div>
                        </td>
                        <td className="p-2 align-middle ">
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
        </div>
      </div>
    </div>
  );
}

export default App;
