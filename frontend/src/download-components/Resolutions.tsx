"use client";

import { useState } from "react";
import { Episode } from "../types/ApiResponses";

const Resolutions = ({ episode }: { episode: Episode }) => {
  const [vidUrl, setVidUrl] = useState(
    episode.res?.[0].url,
  );

  const downloadVid = async (vidUrl: string) => {
    const link = document.createElement("a");
    link.href = vidUrl;
    link.download = `${episode.title}.mp4`;
    link.click();
  };

  return (
    <>
      <h2 className="mb-3 text-2xl font-semibold text-white text-center">
        {episode?.[0].title ?? "N/A"}
      </h2>
      <h3 className="mb-3 text-xl font-semibold text-white text-left">Play</h3>
      <video
        className="w-full max-w-150 mb-5 aspect-video mx-auto"
        src={vidUrl}
      ></video>
      <ul className="flex justify-center items-center gap-3 md:justify-start flex-wrap">
        {episode.res?.map(({ quality, sizeBytes, url }) => (
          <button
            onClick={() => setVidUrl(url)}
            className="text-xl font-semibold px-3 py-2 rounded-md bg-gray-800 text-white shadow-[inset_0px_0px_10px_-7px_black]"
          >
            {`Play - ${quality}P (${(sizeBytes/1000).toFixed(1)}MB)`}
          </button>
        ))}
      </ul>

      <h3 className="mb-3 mt-7 text-xl font-semibold text-white text-left">
        Download
      </h3>
      <ul className="flex justify-center items-center gap-3 md:justify-start flex-wrap">
        {episode?.res?.map(({ quality, sizeBytes, url }) => (
          <button
            onClick={() => downloadVid(url)}
            className="text-xl font-semibold px-3 py-2 rounded-md bg-gray-800 text-white shadow-[inset_0px_0px_10px_-7px_black]"
          >
            {`Download - ${quality}P (${(sizeBytes/1000).toFixed(1)}MB)`}
          </button>
        ))}
      </ul>
    </>
  );
};

export default Resolutions;
