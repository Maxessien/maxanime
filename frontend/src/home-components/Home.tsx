"use client";

import { useRouter } from "nextjs-toploader/app";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { AiringResponse } from "../types/ApiResponses";
import AnimeCard from "./AnimeCard";

export const formatApi = (pageUrl: string, redirectBaseUrl: string) => {
  const slice = pageUrl.split("?");
  slice[0] = redirectBaseUrl;
  const redirectUrl = slice.join("?");
  return redirectUrl;
};

const Home = ({ initialData }: { initialData: AiringResponse }) => {
  const router = useRouter();

  return (
    <>
      <h2 className="mb-3 text-xl font-semibold text-white text-left">
        Airing
      </h2>
      <section className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2 justify-center md:justify-start lg:grid-cols-2 xl:grid-cols-3">
        {initialData.data.map((data) => {
          return <AnimeCard anime={data} />;
        })}
      </section>
      <div className="w-full flex justify-center items-center gap-2">
        {initialData.prev_page_url?.length && (
          <button
            onClick={() =>
              router.push(formatApi(initialData.next_page_url ?? "", "/"))
            }
            className="rounded-md text-white text-base font-medium text-center px-3 py-2"
          >
            <MdArrowLeft />
          </button>
        )}
        <span className="text-base font-medium text-white">
          {initialData.current_page}
        </span>
        {initialData.next_page_url?.length && (
          <button
            onClick={() =>
              router.push(formatApi(initialData.prev_page_url ?? "", "/"))
            }
            className="rounded-md text-white text-base font-medium text-center px-3 py-2"
          >
            <MdArrowRight />
          </button>
        )}
      </div>
    </>
  );
};

export default Home;
