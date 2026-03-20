import Home from "@/src/home-components/Home";
import { Episode } from "@/src/types/ApiResponses";
import { noNullFn } from "@/src/utils/fecthUtil";
import axios from "axios";


export const useAnimepaheApi = (url: string)=>`https://api.scraperapi.com/?api_key=${process.env.SCRAPER_API_KEY}&url=${url}&follow_redirect=false&device_type=desktop`


const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const airingData = await noNullFn(
    async () => {
      const response = await axios.get<Episode[]>(
        `${process.env.BACKEND_URL}/releases`,
      );
      return response.data;
    },
    [] as Episode[],
  );

  return <Home latest={airingData} />;
};

export default HomePage;
