import Link from "next/link";
import { Show } from "../types/ApiResponses";



const SearchResults = ({
  data,
  isFetching,
}: {
  data: Show[];
  isFetching: boolean;
}) => {
  return (
    <div className="w-full flex flex-col rounded-md gap-2 justify-start px-2 py-1 bg-gray-950">
      {!isFetching ? (
        data.length > 0 ? (
          data.map(({ description, id, show, showImage }) => {
            return (
              <Link
                href={`/anime/${id}`}
                className="w-full flex justify-start items-center gap-2 px-2 py-3 rounded-md transition-all hover:bg-gray-800 cursor-pointer"
              >
                <div className="w-15 aspect-square overflow-hidden rounded-md">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={showImage}
                    alt={show ?? "image"}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white text-left wrap-break-word text-ellipsis w-full">
                    {show}
                  </p>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="w-full text-base font-medium text-center text-white py-4">
            No results
          </p>
        )
      ) : (
        <p className="w-full text-base font-medium text-center text-white py-4">
          Loading...
        </p>
      )}
    </div>
  );
};

export default SearchResults;
