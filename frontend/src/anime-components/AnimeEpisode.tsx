"use client";

import { ShowWithEp } from "../home-components/AnimeCard";
import AnimeEpisodeCard from "./AnimeEpisodeCard";

const AnimeEpisode = ({ initialData }: { initialData: ShowWithEp }) => {
  const hasInfo = Boolean(
    initialData.show || initialData.description || initialData.showImage,
  );

  return (
    <>
      {hasInfo ? (
        <section className="flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-5 items-center md:justify-start md:items-end mb-4">
          <div className="w-full max-w-80">
            <img className="w-full" src={initialData.showImage} alt={"Image"} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-white text-center md:text-left">
              {initialData.show}
            </h2>
            <p className="text-lg font-medium text-gray-400 text-left">
              {initialData.description}
            </p>
          </div>
        </section>
      ) : (
        <p className="mb-4 w-full text-lg font-medium text-center text-white py-4">
          Anime details are unavailable.
        </p>
      )}
      <section>
        <h3 className="mb-3 text-xl font-semibold text-white text-left">
          Episodes
        </h3>
        <div className="mb-3 flex flex-wrap items-center gap-2 justify-center md:justify-start">
          {initialData.episodes.length > 0 ? (
            initialData.episodes.map((ep) => (
              <AnimeEpisodeCard key={ep.releaseId} animeEp={ep} />
            ))
          ) : (
            <p className="w-full text-base font-medium text-center text-white py-4">
              No episodes available.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default AnimeEpisode;
