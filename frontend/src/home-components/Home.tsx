"use client";

import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { LatestAnimeEntry, LatestResponse, ScheduleDays, ScheduleResponse } from "../../../backend/types/SubpleaseApiRes";
import AnimeCard from "./AnimeCard";
import { Show } from "../types/ApiResponses";

export const formatApi = (pageUrl: string, redirectBaseUrl: string) => {
  const slice = pageUrl.split("?");
  slice[0] = redirectBaseUrl;
  const redirectUrl = slice.join("?");
  return redirectUrl;
};

const Home = ({ latest }: { latest: Show[] }) => {
  const router = useRouter();

  return (
    <>
        <h2 className="mb-3 text-xl font-semibold text-white text-left">
          Airing
        </h2>
      <section className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2 justify-center md:justify-start lg:grid-cols-2 xl:grid-cols-3">
        {latest.map((data) => {
          return <AnimeCard anime={data} />;
        })}
      </section>
    </>
  );
};

export default Home;
