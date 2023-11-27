import { Character } from "@/services/types";
import { Table } from "./table";
import { ExternalLink } from "lucide-react";

interface CharacterTableProps {
  data: Character[];
  isLoading: boolean;
  hasError: boolean;
}

export const CharacterTable = ({
  data,
  isLoading,
  hasError,
}: CharacterTableProps) => {
  return (
    <Table
      data={data}
      uniqueKey="_id"
      onRowClick={(row) => console.log(row)}
      isLoading={isLoading}
      hasError={hasError}
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
        { key: "name", label: "Name", sortable: true },
        {
          key: "films",
          label: "# Films",
          width: "10%",
          sortable: true,

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
          sortable: true,
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
          sortable: true,
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
                {value?.map((element: string) => (
                  <div key={element}>{element}</div>
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
          render: (value) =>
            value.length > 0 ? (
              <div>
                {value?.map((element: string) => (
                  <div key={element}>{element}</div>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground/50 text-xs font-bold">
                N/A
              </span>
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
