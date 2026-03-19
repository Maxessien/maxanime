import { useRouter } from "nextjs-toploader/app";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { setMappings } from "../store-slices/torrentsMappings";
import { ShowInfoAnimeEntry } from "../types/SubpleaseApiRes";



const AnimeEpisodeCard = ({ animeEp }: { animeEp: ShowInfoAnimeEntry }) => {
    const router = useRouter()
    const {episode, downloads, show} = animeEp

    const dispatch = useDispatch()

    const navigate = ()=>{
      const key  = v4()
      dispatch(setMappings({key: key, value: downloads.map((val)=>({magnet: val.torrent, res: val.res, title: show}))}))
      router.push(`/play/${key}`)
    }
  return (
    <>
    <button onClick={navigate} className="text-xl font-semibold px-3 py-2 rounded-md bg-gray-800 text-white shadow-[inset_0px_0px_10px_-7px_black]">
      {`Episode - ${episode}`}
    </button>
    </>
  );
};

export default AnimeEpisodeCard