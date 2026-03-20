"use client";

import { useRouter } from "nextjs-toploader/app";
import { Episode } from "../types/ApiResponses";
import AnimeCard from "./AnimeCard";

export const formatApi = (pageUrl: string, redirectBaseUrl: string) => {
  const slice = pageUrl.split("?");
  slice[0] = redirectBaseUrl;
  const redirectUrl = slice.join("?");
  return redirectUrl;
};

const Home = ({ latest }: { latest: Episode[] }) => {
  const router = useRouter();

  return (
    <>
        <h2 className="mb-3 text-xl font-semibold text-white text-left">
          Airing
        </h2>
      <section className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2 justify-center md:justify-start lg:grid-cols-2 xl:grid-cols-3">
        {latest.length > 0 ? (
          latest.map((data) => {
            return <AnimeCard key={data.releaseId} anime={data} />;
          })
        ) : (
          <p className="col-span-full w-full text-base font-medium text-center text-white py-4">
            No airing episodes yet.
          </p>
        )}
      </section>
    </>
  );
};

export default Home;
