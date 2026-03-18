import { useRouter } from "nextjs-toploader/app";
import { AiringResponseItem } from "../types/ApiResponses";


const AnimeCard = ({ anime }: { anime: AiringResponseItem }) => {
    const router = useRouter()
    const {snapshot, anime_title, episode, completed, anime_session, session} = anime
  return (
    <>
      <div onClick={()=>anime_session && session ? router.push(`/play/${anime_session}?ep=${session}`) : null} className="w-full aspect-video rounded-md relative">
        <div className="z-0 absolute top-0 left-0 w-full h-full overflow-hidden">
          <img
            className="object-cover h-full w-full object-center"
            src={`/api/image?url=${encodeURIComponent(snapshot)}`}
            alt={"image"}
          />
        </div>
        <div className="z-1 absolute text-shadow-2xs text-shadow-black top-0 left-0 p-2 transition-all hover:bg-[linear-gradient(to_top,black,transparent)] flex flex-col justify-end items-start gap-1 w-full h-full">
          <p className="text-white font-semibold text-base wrap-break-word text-ellipsis">
            {anime_title}
          </p>
          <p className="text-white font-semibold text-lg">{`EP - ${episode}`}</p>
          <p className="text-gray-300 font-medium text-sm">
            {Number(completed) ? "Finished Airing" : "Ongoing Airing"}
          </p>
        </div>
      </div>
    </>
  );
};

export default AnimeCard;
