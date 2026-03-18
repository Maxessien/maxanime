"use client"

import { useState } from "react";
import { Element } from "tinysoup";

const Resolutions = ({ data }: { data: Element[], downloadEls: Element[] }) => {
  const [vidUrl, setVidUrl] = useState(data?.[0]?.attributes?.get("data-src") ?? "")

  const downloadVid = async(form: Element) => {
    const url = form.attributes.get("action")
    console.log(url)
    return
    const link = document.createElement("a")
    link.href = `/api/download?url=${url}`
    link.download = "anime.mp4"
    link.click()
  };
  return (
    <>
      <h2 className="mb-3 text-xl font-semibold text-white text-left">
        Play
      </h2>
      <iframe className="w-full max-w-150 mb-5 aspect-video mx-auto" src={vidUrl}></iframe>
      <ul className="flex justify-center items-center gap-3 md:justify-start flex-wrap">
        {data.map((el) => {
          return (
            <button
              className={`px-4 py-2 rounded-md font-medium text-lg ${el.attributes.get("data-src") === vidUrl ? "bg-red-800" : "bg-gray-800"} text-white text-center`}
              onClick={() => {
                if (el.attributes.get("data-src"))
                  setVidUrl((el.attributes.get("data-src") as string));
                else null;
              }}
            >
              {`Play - ${el?.attributes?.get("data-resolution") ?? "N/A"}P`}
            </button>
          );
        })}
      </ul>


      <h2 className="mb-3 mt-7 text-xl font-semibold text-white text-left">
        Download
      </h2>
      <ul className="flex justify-center items-center gap-3 md:justify-start flex-wrap">
        {data.map((el) => {
          return (
            <button
              className="px-4 py-2 rounded-md font-medium text-lg text-white bg-gray-800 text-center"
              onClick={() => downloadVid(el)}
            >
              {`Download - ${el?.attributes?.get("data-resolution") ?? "N/A"}P`}
            </button>
          );
        })}
      </ul>
    </>
  );
};

export default Resolutions;
