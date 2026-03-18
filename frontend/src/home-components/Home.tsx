"use client";

import { useRouter } from "nextjs-toploader/app";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { AiringResponse } from "../types/ApiResponses";
import AnimeCard from "./AnimeCard";
import { LatestAnimeEntry, LatestResponse, ScheduleDays, ScheduleResponse } from "../types/SubpleaseApiRes";
import { useEffect, useState } from "react";

export const formatApi = (pageUrl: string, redirectBaseUrl: string) => {
  const slice = pageUrl.split("?");
  slice[0] = redirectBaseUrl;
  const redirectUrl = slice.join("?");
  return redirectUrl;
};

const Home = ({ latest, upcoming }: { latest: LatestResponse, upcoming: ScheduleResponse }) => {
  const [data, setData] = useState<{latest: LatestAnimeEntry[], upcoming: ScheduleDays}>({latest: [], upcoming: upcoming.schedule})
  const router = useRouter();

  useEffect(()=>{
    const latestTemp: LatestAnimeEntry[] = []
    for (let key in latest) latestTemp.push(latest[key])
    setData(state=>({...state, latest: latestTemp}))
  }, [])

  return (
    <>
        <h2 className="mb-3 text-xl font-semibold text-white text-left">
          Airing
        </h2>
      <section className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2 justify-center md:justify-start lg:grid-cols-2 xl:grid-cols-3">
        {data.latest.map((data) => {
          return <AnimeCard anime={data} />;
        })}
      </section>
    </>
  );
};

export default Home;
