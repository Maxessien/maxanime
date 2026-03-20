import AnimeEpisode from "@/src/anime-components/AnimeEpisode";
import { ShowWithEp } from "@/src/home-components/AnimeCard";
import axios from "axios";

export function formatObjToArr<T>(obj: { [key: string]: T }) {
  const formattedArr: T[] = [];
  for (let key in obj) formattedArr.push(obj[key]);
  return formattedArr;
}

const AnimePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const pars = await params;
  const anime = await axios.get<ShowWithEp>(`${process.env.BACKEND_URL}/show/${pars.id}`)

  return (
    <>
      <AnimeEpisode initialData={anime.data}
      />
    </>
  );
};

export default AnimePage;
