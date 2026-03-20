import { useRouter } from "nextjs-toploader/app";
import { Episode, Show } from "../types/ApiResponses";

export interface ShowWithEp extends Show {
  episodes: Episode[]
}

const AnimeCard = ({ anime }: { anime: Episode }) => {
    const router = useRouter()
    const {episode, snapshotUrl, title, releaseId} = anime
    
  return (
    <>
      <div onClick={()=>router.push(`/play/${releaseId}`)} className="w-full aspect-video rounded-md relative">
        <div className="z-0 absolute top-0 left-0 w-full h-full overflow-hidden">
          <img
            className="object-cover h-full w-full object-center"
            src={snapshotUrl}
            alt={"image"}
          />
        </div>
        <div className="z-1 absolute text-shadow-2xs text-shadow-black top-0 left-0 p-2 transition-all duration-300 hover:bg-[linear-gradient(to_top,black,transparent)] flex flex-col justify-end items-start gap-1 w-full h-full">
          <p className="text-white font-semibold text-base wrap-break-word text-ellipsis">
            {title}
          </p>
          <p className="text-white font-semibold text-lg">{`EP - ${episode}`}</p>
        </div>
      </div>
    </>
  );
};

export default AnimeCard;
