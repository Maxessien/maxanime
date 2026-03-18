import { useAnimepaheApi } from "@/app/page";
import AnimeEpisode from "@/src/anime-components/AnimeEpisode";
import { EpisodesResponse } from "@/src/types/ApiResponses";
import axios from "axios";



const AnimePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const pars = await params;
  const url = `https://animepahe.si/api?m=release&id=${pars.id}`;

  const episodes = await axios.get<EpisodesResponse>(useAnimepaheApi(url));

  return (
    <>
      <AnimeEpisode initialData={episodes.data} />
    </>
  );
};

export default AnimePage;
