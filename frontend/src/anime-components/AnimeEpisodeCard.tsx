import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { EpisodesResponseItem } from "../types/ApiResponses";


const AnimeEpisodeCard = ({ animeEp }: { animeEp: EpisodesResponseItem }) => {
    const router = useRouter()
    const params = useParams()
    const {snapshot, session, episode} = animeEp
  return (
    <>
      <div onClick={()=>session ? router.push(`/play/${params.id}?ep=${session}`) : null} className="w-full aspect-video rounded-md relative">
        <div className="z-0 absolute top-0 left-0 w-full h-full overflow-hidden">
          <img
            className="object-cover h-full w-full object-center"
            src={`/api/image?url=${encodeURIComponent(snapshot)}`}
            alt={"image"}
          />
        </div>
        <div className="z-1 absolute text-shadow-2xs text-shadow-black top-0 left-0 hover:bg-[linear-gradient(to_top,black,transparent)] transition-all flex flex-col justify-end items-start gap-1 px-2 py-2 w-full h-full">
          <p className="text-white font-semibold text-2xl">{`EP - ${episode}`}</p>
        </div>
      </div>
    </>
  );
};

export default AnimeEpisodeCard