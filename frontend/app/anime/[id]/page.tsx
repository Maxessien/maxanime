import AnimeEpisode from "@/src/anime-components/AnimeEpisode";
import { baseUrl, getShowId, specificShowLink } from "@/src/subplease";
import { ShowInfoResponse } from "@/src/types/SubpleaseApiRes";
import axios from "axios";
import { getText } from "tinysoup";

export function formatObjToArr<T>(obj: { [key: string]: T }) {
  const formattedArr: T[] = [];
  for (let key in obj) formattedArr.push(obj[key]);
  return formattedArr;
}

const AnimePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const pars = await params;

  const { showId, soup } = await getShowId(pars.id);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const episodes = await axios.get<ShowInfoResponse>(
    specificShowLink(timezone, showId),
  );

  const desc = soup.find({
    name: "p",
    predicate: (el) => el.parent.classList.has("series-syn"),
  });
  const title = soup.find({ name: "h1", attrs: { class: "entry-title" } });
  const img = soup.find({name: "img", predicate: (el)=>el.classList.has("img-responsive")})

  const batch = formatObjToArr(episodes.data.batch);
  const episode = formatObjToArr(episodes.data.episode);

  return (
    <>
      <AnimeEpisode
        initialData={{
          episode: episode,
          batch: batch,
          show_title: getText(title),
          show_description: getText(desc),
          image_url: baseUrl + img.attributes.get("src")
        }}
      />
    </>
  );
};

export default AnimePage;
