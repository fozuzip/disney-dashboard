import { useMemo } from "react";

import { Character } from "@/services/types";
import { Modal } from "./modal";
import { PieChart } from "./pie-chart";
import { DownloadButton } from "./DownloadButton";

interface ChartModalProps {
  data: Character[];
  isOpen: boolean;
  onClose: () => void;
}

export const ChartModal = ({ isOpen, onClose, data }: ChartModalProps) => {
  const series = useMemo(
    () => [
      {
        name: "Percentage",
        colorByPoint: true,
        data: data
          .map((character) => {
            const films = character.films || [];
            return {
              name: character.name,
              y: films.length,
              films: films,
            };
          })
          // Omit characters that have no films
          .filter((dataPoint) => dataPoint.y > 0),
      },
    ],
    [data]
  );

  const xlsxData = useMemo(() => {
    const totalFilms = data.reduce(
      (total, character) => total + (character.films?.length || 0),
      0
    );
    return data.map((character) => {
      const films = character.films || [];
      return {
        ["Name"]: character.name,
        ["# of films"]: films.length,
        ["% of total"]: `${((films.length / totalFilms) * 100).toFixed(2)}%`,
        ["Films"]: films.join(", "),
      };
    });
  }, [data]);

  return (
    <Modal isOpen={isOpen} title="Films per character" onClose={onClose}>
      <div className="relative ">
        <PieChart series={series} />
        <div className="absolute bottom-0 right-0">
          <DownloadButton data={xlsxData} />
        </div>
      </div>
    </Modal>
  );
};
