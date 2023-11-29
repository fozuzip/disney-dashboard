import { Character } from "@/services/disneyApi";
import { Table } from "./ui/table";
import { ExternalLink } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { useAppSelector } from "@/hooks/redux-hooks";
import {
  selectCharacters,
  selectError,
  selectLoading,
} from "@/store/reducers/disney";

export type CharacterTableColumnKey =
  | "imageUrl"
  | "name"
  | "films"
  | "tvShows"
  | "videoGames"
  | "allies"
  | "enemies"
  | "sourceUrl";

type CharacterTableColumn = {
  key: CharacterTableColumnKey;
  label: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any) => React.ReactNode;
};

interface CharacterTableProps {
  visibleColumns?: CharacterTableColumnKey[];
  onRowClick: (row: Character) => void;
}

export const CharacterTable = ({
  onRowClick,
  visibleColumns,
}: CharacterTableProps) => {
  const data = useAppSelector(selectCharacters);
  const isLoading = useAppSelector(selectLoading);
  const hasError = useAppSelector(selectError);

  let columns: CharacterTableColumn[] = [
    {
      key: "imageUrl",
      label: "",
      width: "7%",

      render: (value) => <Avatar src={value} />,
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
  ];
  if (visibleColumns) {
    columns = columns.filter((column) => visibleColumns.includes(column.key));
  }

  return (
    <Table
      data={data}
      uniqueKey="_id"
      onRowClick={onRowClick}
      isLoading={isLoading}
      hasError={hasError}
      columns={columns}
    />
  );
};
