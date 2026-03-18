import Home from "@/src/home-components/Home";
import { AiringResponse, Mode } from "@/src/types/ApiResponses";
import axios from "axios";


export const useAnimepaheApi = (url: string)=>`https://api.scraperapi.com/?api_key=${process.env.SCRAPER_API_KEY}&url=${url}&follow_redirect=false&device_type=desktop`


const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ m: Mode; page: string }>;
}) => {
  const sParams = await searchParams;

  const animepaheBaseUrl = "https://animepahe.si/api";

  const fullUrl = `${animepaheBaseUrl}?m=airing${sParams.page ? `&page${sParams.page}` : ""}`

  const airingData = await axios.get<AiringResponse>(useAnimepaheApi(fullUrl));

  return <Home initialData={airingData.data} />;
};

export default HomePage;
