import { useRouter } from "nextjs-toploader/app";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { LatestAnimeEntry } from "../../../backend/types/SubpleaseApiRes";
import { baseUrl } from "../../../backend/utils/subplease";
import { setMappings } from "../store-slices/torrentsMappings";
import { Show } from "../types/ApiResponses";


const AnimeCard = ({ anime }: { anime: Show }) => {
    const router = useRouter()
    const {show, episodes, id, showImage} = anime
    
  return (
    <>
      <div onClick={()=>router.push(`/play/${id}/${episodes?.[0].episode}`)} className="w-full aspect-video rounded-md relative">
        <div className="z-0 absolute top-0 left-0 w-full h-full overflow-hidden">
          <img
            className="object-cover h-full w-full object-center"
            src={showImage}
            alt={"image"}
          />
        </div>
        <div className="z-1 absolute text-shadow-2xs text-shadow-black top-0 left-0 p-2 transition-all duration-300 hover:bg-[linear-gradient(to_top,black,transparent)] flex flex-col justify-end items-start gap-1 w-full h-full">
          <p className="text-white font-semibold text-base wrap-break-word text-ellipsis">
            {show}
          </p>
          <p className="text-white font-semibold text-lg">{`EP - ${episodes?.[0].episode}`}</p>
        </div>
      </div>
    </>
  );
};

export default AnimeCard;
