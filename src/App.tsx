import { useGetCharactersQuery } from "@/services/disney";

function App() {
  const { data, error, isLoading } = useGetCharactersQuery("");

  console.log(data, error, isLoading);

  return (
    <div className="w-screen h-screen bg-background text-foreground">
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
      </div>
    </div>
  );
}

export default App;
