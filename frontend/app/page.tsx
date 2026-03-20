import Home from "@/src/home-components/Home";
import { Episode, Show } from "@/src/types/ApiResponses";
import axios from "axios";


export const useAnimepaheApi = (url: string)=>`https://api.scraperapi.com/?api_key=${process.env.SCRAPER_API_KEY}&url=${url}&follow_redirect=false&device_type=desktop`


const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {

  const airingData = await axios.get<Episode[]>(`/${process.env.BACKEND_URL}/releases`);


  return <Home latest={airingData.data} />;
};

export default HomePage;
