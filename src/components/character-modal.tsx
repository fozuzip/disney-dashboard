import { Modal } from "./ui/modal";
import { Character } from "@/services/disneyApi";
import imagePlaceholder from "@/assets/image-placeholder.png";

interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
}

export const CharacterModal = ({ character, onClose }: CharacterModalProps) => {
  const films = character?.films || [];
  const tvShows = character?.tvShows || [];
  const videoGames = character?.videoGames || [];

  return (
    <Modal isOpen={!!character} title={character?.name} onClose={onClose}>
      <div className="flex max-h-[400px]">
        <div className="w-1/3">
          <img
            className="object-cover w-full rounded-lg"
            src={character?.imageUrl || imagePlaceholder}
            alt="character image"
          />
        </div>

        <div className="flex flex-col gap-y-4 ml-4 w-2/3 max-h-full overflow-y-auto">
          <div className="flex flex-col gap-y-2">
            <div className="text-muted-foreground text-sm">
              <span>TV Shows:</span>
              {tvShows.length === 0 && (
                <span className="pl-2 font-bold">-</span>
              )}
            </div>
            <div className="flex flex-col gap-x-2">
              {tvShows.map((tvShow) => (
                <div key={tvShow} className="truncate">
                  {tvShow}
                </div>
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
                <div key={videoGame} className="truncate">
                  {videoGame}
                </div>
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
                <div key={film} className="truncate">
                  {film}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
