import { useGetCharactersQuery } from "@/services/disney";
import { Table } from "./table";
import { ExternalLink } from "lucide-react";

export const CharacterTable = () => {
  const { data } = useGetCharactersQuery("");
  const characters = data?.data;

  return (
    <Table
      data={characters}
      uniqueKey="_id"
      onRowClick={(row) => console.log(row)}
      columns={[
        {
          key: "imageUrl",
          label: "",
          width: "7%",
          render: (value) => (
            <img
              src={value}
              alt="character"
              className="w-10 h-10 rounded-full"
            />
          ),
        },
        { key: "name", label: "Name" },
        {
          key: "tvShows",
          label: "# Films",
          width: "10%",
          render: (value) => (
            <div className="bg-primary rounded-xl w-[30px] h-[24px] flex items-center justify-center ml-4">
              {value.length}
            </div>
          ),
        },
        {
          key: "tvShows",
          label: "# TV Shows",
          width: "10%",
          render: (value) => (
            <div className="bg-secondary rounded-xl w-[30px] h-[24px] flex items-center justify-center ml-4">
              {value.length}
            </div>
          ),
        },
        {
          key: "videoGames",
          label: "# Video Games",
          width: "12%",
          render: (value) => (
            <div className="bg-destructive rounded-xl w-[30px] h-[24px] flex items-center justify-center ml-4">
              {value.length}
            </div>
          ),
        },
        {
          key: "allies",
          label: "Allies",
          width: "12%",
          render: (value) =>
            value.length > 0 ? (
              <div>
                {value?.map((element) => (
                  <div>{element}</div>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground/50 text-xs font-bold">
                N/A
              </span>
            ),
        },
        {
          key: "enemies",
          label: "Enemies",
          width: "10%",
          render: (value) => (
            value.length > 0 ? (
              <div>
                {value?.map((element) => (
                  <div>{element}</div>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground/50 text-xs font-bold">
                N/A
              </span>
            ),
          ),
        },
        {
          key: "sourceUrl",
          label: "Wiki Link",
          width: "10%",
          render: (value) => (
            <a href={value} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
            </a>
          ),
        },
      ]}
    />
  );
};
