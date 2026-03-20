"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchResults from "./SearchResults";
import { Show } from "../types/ApiResponses";

const AppHeader = () => {
  const [search, setSearch] = useState<{
    query: string;
    result: Show[];
  }>({
    query: "",
    result: [],
  });
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

  const checkSearchValidity = () => {
    return search.query.trim().length > 0;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(search.query.trim());
    }, 1000);

    return () => clearTimeout(timer);
  }, [search.query]);

  const submitForm = async (): Promise<Show[]> => {
    if (!debouncedQuery) {
      setSearch((state) => ({
        ...state,
        result: [],
      }));
      return [];
    }

    try {
      const res = await axios.get<Show[]>(`${backendUrl}/shows`, {
        params: { q: debouncedQuery },
      });
      setSearch((state) => ({ ...state, result: res.data }));
      return res.data;
    } catch (err) {
      console.log(err);
      setSearch((state) => ({
        ...state,
        result: [],
      }));
      throw err;
    }
  };

  const { isFetching } = useQuery({
    queryKey: ["shows-search", debouncedQuery],
    queryFn: submitForm,
    enabled: debouncedQuery.length > 0,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <header className="flex flex-wrap justify-between gap-2 items-center bg-red-900 px-2 sm:px-4 md:px-5 lg:px-7 py-3">
        <h1 className="mb-3 text-xl font-semibold text-white text-left">
          Max Anime
        </h1>
        <form onSubmit={(e) => e.preventDefault()} className="relative max-w-120 flex-1">
          <input
            value={search.query}
            onChange={(e) =>
              setSearch((state) => ({ ...state, query: e.target.value }))
            }
            placeholder="Search anime..."
            className="w-full min-w-75 rounded-full text-base font-medium text-white py-2 placeholder:text-gray-400 px-6 bg-gray-800 focus:border-2 focus:border-red-700"
            type="text"
          />
          <button
            type="button"
            className="text-lg absolute top-0.5 right-2 font-medium rounded-full p-2 text-white hover:bg-gray-800"
          >
            <FaSearch />
          </button>
          {checkSearchValidity() && (
            <div className="absolute top-full left-0 z-999 w-full">
              <SearchResults isFetching={isFetching} data={search.result} />
            </div>
          )}
        </form>
      </header>
    </>
  );
};

export default AppHeader;
