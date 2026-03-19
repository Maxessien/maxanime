"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Resolutions = ({ resId }: { resId }) => {
  const mappings = useSelector((state: RootState) => state.torrentsMappings);
  const resolutions = mappings?.[resId];
  const [vidUrl, setVidUrl] = useState(
    `/api/download?url=${resolutions?.[0].magnet}`,
  );

  const downloadVid = async (magnetUrl: string) => {
    const link = document.createElement("a");
    link.href = `/api/download?url=${magnetUrl}`;
    link.download = "anime.mp4";
    link.click();
  };

  return (
    <>
      <h2 className="mb-3 text-2xl font-semibold text-white text-center">
        {resolutions?.[0].title ?? "N/A"}
      </h2>
      <h3 className="mb-3 text-xl font-semibold text-white text-left">Play</h3>
      <video
        className="w-full max-w-150 mb-5 aspect-video mx-auto"
        // src={vidUrl}
      ></video>
      <ul className="flex justify-center items-center gap-3 md:justify-start flex-wrap">
        {resolutions?.map(({ magnet, res }) => (
          <button
            onClick={() => setVidUrl(`/api/download?url=${magnet}`)}
            className="text-xl font-semibold px-3 py-2 rounded-md bg-gray-800 text-white shadow-[inset_0px_0px_10px_-7px_black]"
          >
            {`Play - ${res}P`}
          </button>
        ))}
      </ul>

      <h3 className="mb-3 mt-7 text-xl font-semibold text-white text-left">
        Download
      </h3>
      <ul className="flex justify-center items-center gap-3 md:justify-start flex-wrap">
        {resolutions?.map(({ magnet, res }) => (
          <button
            onClick={() => downloadVid(magnet)}
            className="text-xl font-semibold px-3 py-2 rounded-md bg-gray-800 text-white shadow-[inset_0px_0px_10px_-7px_black]"
          >
            {`Download - ${res}P`}
          </button>
        ))}
      </ul>
    </>
  );
};

export default Resolutions;
