import { Modal } from "./modal";
import { Character } from "@/services/types";

interface CharacterDescriptionModalProps {
  character: Character | null;
  onClose: () => void;
}

export const CharacterDescriptionModal = ({
  character,
  onClose,
}: CharacterDescriptionModalProps) => {
  const films = character?.films || [];
  const tvShows = character?.tvShows || [];
  const videoGames = character?.videoGames || [];

  return (
    <Modal isOpen={!!character} title={character?.name} onClose={onClose}>
      <div className="flex max-h-[400px]">
        <div className="w-1/3">
          <img
            className="object-cover w-full rounded-lg"
            src={character?.imageUrl || ""}
            alt="character image"
          />
        </div>

        <div className="flex flex-col gap-y-4 ml-4 w-2/3 max-h-full overflow-y-auto">
          <div className="flex flex-col gap-y-2">
            <div className="text-muted-foreground text-sm">
              <span>Tv Shows:</span>
              {tvShows.length === 0 && (
                <span className="pl-2 font-bold">-</span>
              )}
            </div>
            <div className="flex flex-col gap-x-2">
              {tvShows.map((tvShow) => (
                <div className="truncate">{tvShow}</div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="text-muted-foreground text-sm">
              <span>Video Games:</span>
              {videoGames.length === 0 && (
                <span className="pl-2 font-bold">-</span>
              )}
            </div>
            <div className="flex flex-col gap-x-2">
              {videoGames.map((videoGame) => (
                <div className="truncate">{videoGame}</div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="text-muted-foreground text-sm">
              <span>Films:</span>
              {films.length === 0 && <span className="pl-2 font-bold">-</span>}
            </div>
            <div className="flex flex-col gap-x-2">
              {films.map((film) => (
                <div className="truncate">{film}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
