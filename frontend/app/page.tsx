import Home from "@/src/home-components/Home";
import { latestUrl, scheduleUrl } from "@/src/subplease";
import { AiringResponse, Mode } from "@/src/types/ApiResponses";
import { LatestResponse, ScheduleResponse } from "@/src/types/SubpleaseApiRes";
import axios from "axios";


export const useAnimepaheApi = (url: string)=>`https://api.scraperapi.com/?api_key=${process.env.SCRAPER_API_KEY}&url=${url}&follow_redirect=false&device_type=desktop`


const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ m: Mode; page: string }>;
}) => {
  const sParams = await searchParams;

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const airingData = await axios.get<LatestResponse>(latestUrl(timeZone));

  const upcoming = await axios.get<ScheduleResponse>(scheduleUrl(timeZone))


  return <Home upcoming={upcoming.data} latest={airingData.data} />;
};

export default HomePage;
