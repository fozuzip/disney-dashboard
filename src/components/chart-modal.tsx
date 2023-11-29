import { useEffect, useMemo, useState } from "react";
import { Film, Gamepad, Tv } from "lucide-react";

import { cn } from "@/utils";
import { Modal } from "./ui/modal";
import { PieChart } from "./ui/pie-chart";
import { DownloadButton } from "./ui/download-button";
import { Button } from "./ui/button";
import { useAppSelector } from "@/hooks/redux-hooks";
import { selectCharacters } from "@/store/reducers/disney";

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChartModal = ({ isOpen, onClose }: ChartModalProps) => {
  const data = useAppSelector(selectCharacters);

  const [column, setColumn] = useState<"films" | "tvShows" | "videoGames">(
    "videoGames"
  );

  // Each time the modal is opened, reset the column to "films"
  useEffect(() => {
    setColumn("films");
  }, [data]);

  const series = useMemo(
    () => [
      {
        name: "Percentage",
        colorByPoint: true,
        data: data
          .map((character) => {
            const list = character[column] || [];
            return {
              name: character.name,
              y: list.length,
              list: list,
            };
          })
          // Omit characters that have no films
          .filter((dataPoint) => dataPoint.y > 0),
      },
    ],
    [data, column]
  );

  const xlsxData = useMemo(() => {
    const totalFilms = data.reduce(
      (total, character) => total + (character.films?.length || 0),
      0
    );
    return data.map((character) => {
      const list = character[column] || [];
      const columnNames =
        column === "films"
          ? ["Name", "# of films", "% of total", "Films"]
          : column === "tvShows"
          ? ["Name", "# of tv shows", "% of total", "TV Shows"]
          : ["Name", "# of video games", "% of total", "Video Games"];

      return {
        [columnNames[0]]: character.name,
        [columnNames[1]]: list.length,
        [columnNames[2]]: `${((list.length / totalFilms) * 100).toFixed(2)}%`,
        [columnNames[3]]: list.join(", "),
      };
    });
  }, [data, column]);

  return (
    <Modal
      isOpen={isOpen}
      title={
        column === "films"
          ? "Characters by number of films"
          : column === "tvShows"
          ? "Characters by number of TV shows"
          : "Characters by number of video games"
      }
      onClose={onClose}
    >
      <div className="relative ">
        <div className="flex items-center gap-x-4">
          <Button
            className={cn(column === "films" && "bg-muted")}
            onClick={() => setColumn("films")}
          >
            <div className="flex items-center gap-x-2">
              <Film className="w-4 h-4" />
              <span>Films</span>
            </div>
          </Button>
          <Button
            className={cn(column === "tvShows" && "bg-muted")}
            onClick={() => setColumn("tvShows")}
          >
            <div className="flex items-center gap-x-2">
              <Tv className="w-4 h-4" />
              <span>TV shows</span>
            </div>
          </Button>
          <Button
            className={cn(column === "videoGames" && "bg-muted")}
            onClick={() => setColumn("videoGames")}
          >
            <div className="flex items-center gap-x-2">
              <Gamepad className="w-4 h-4" />
              <span>Video Games</span>
            </div>
          </Button>
        </div>
        <PieChart series={series} />
        <div className="absolute bottom-0 right-0">
          <DownloadButton data={xlsxData} />
        </div>
      </div>
    </Modal>
  );
};
