"use client";

import { ShowInfoAnimeEntry } from "../../../backend/types/SubpleaseApiRes";
import AnimeEpisodeCard from "./AnimeEpisodeCard";

interface ShowInfo {
  show_title: string;
  show_description: string;
  batch?: ShowInfoAnimeEntry[];
  episode: ShowInfoAnimeEntry[];
  image_url: string;
}

const AnimeEpisode = ({ initialData }: { initialData: ShowInfo }) => {
  return (
    <>
      <section className="flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-5 items-center md:justify-start md:items-end mb-4">
        <div className="w-full max-w-80">
          <img className="w-full" src={initialData.image_url} alt={"Image"} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-white text-center md:text-left">
            {initialData.show_title}
          </h2>
          <p className="text-lg font-medium text-gray-400 text-left">
            {initialData.show_description}
          </p>
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-xl font-semibold text-white text-left">
          Episodes
        </h3>
        <div className="mb-3 flex flex-wrap items-center gap-2 justify-center md:justify-start">
          {initialData.episode.map((ep) => (
            <AnimeEpisodeCard animeEp={ep} />
          ))}
        </div>
      </section>
    </>
  );
};

export default AnimeEpisode;
