import { useRouter } from "nextjs-toploader/app";
import { AiringResponseItem } from "../types/ApiResponses";
import { LatestAnimeEntry } from "../types/SubpleaseApiRes";
import { baseUrl } from "../subplease";
import { setMappings, TorrentMappings } from "../store-slices/torrentsMappings";
import { useDispatch } from "react-redux";
import { v4 } from "uuid"


const AnimeCard = ({ anime }: { anime: LatestAnimeEntry }) => {
    const router = useRouter()
    const {show, downloads, episode, image_url} = anime

    const dispatch = useDispatch()

    const navigate = ()=>{
      const key  = v4()
      dispatch(setMappings({key: key, value: downloads.map((val)=>({...val, title: show}))}))
      router.push(`/play/${key}`)
    }
    
  return (
    <>
      <div onClick={()=>navigate()} className="w-full aspect-video rounded-md relative">
        <div className="z-0 absolute top-0 left-0 w-full h-full overflow-hidden">
          <img
            className="object-cover h-full w-full object-center"
            src={baseUrl + image_url}
            alt={"image"}
          />
        </div>
        <div className="z-1 absolute text-shadow-2xs text-shadow-black top-0 left-0 p-2 transition-all duration-300 hover:bg-[linear-gradient(to_top,black,transparent)] flex flex-col justify-end items-start gap-1 w-full h-full">
          <p className="text-white font-semibold text-base wrap-break-word text-ellipsis">
            {show}
          </p>
          <p className="text-white font-semibold text-lg">{`EP - ${episode}`}</p>
        </div>
      </div>
    </>
  );
};

export default AnimeCard;
