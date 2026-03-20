import Home from "@/src/home-components/Home";
import { Show } from "@/src/types/ApiResponses";
import axios from "axios";


export const useAnimepaheApi = (url: string)=>`https://api.scraperapi.com/?api_key=${process.env.SCRAPER_API_KEY}&url=${url}&follow_redirect=false&device_type=desktop`


const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const sParams = await searchParams;

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const airingData = await axios.get<Show[]>(`/${process.env.BACKEND_URL}/show`);


  return <Home latest={airingData.data} />;
};

export default HomePage;
