"use client"

import { EpisodesResponse } from "../types/ApiResponses";
import AnimeEpisodeCard from "./AnimeEpisodeCard";

const AnimeEpisode = ({ initialData }: { initialData: EpisodesResponse }) => {
  return (
    <>
      <h2 className="mb-3 text-xl font-semibold text-white text-left">
        Episodes
      </h2>
      <section className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2 justify-center md:justify-start lg:grid-cols-2 xl:grid-cols-3">
        {initialData.data.map((ep) => (
        <AnimeEpisodeCard animeEp={ep} />
      ))}
      </section>
    </>
  );
};

export default AnimeEpisode;
