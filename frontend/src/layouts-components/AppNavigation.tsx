"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { HiOutlineCollection } from "react-icons/hi";
import { MdPlaylistPlay } from "react-icons/md";

const AppNavigation = () => {
  const pathname = usePathname();

  const listStyles = (isActive: boolean) =>
    `flex gap-2 justify-center items-center text-white text-lg font-medium transition-all duration-[200ms] rounded-md md:px-3 md:py-4 sm:rounded-md sm:w-full ${isActive ? "bg-red-500 hover:bg-red-600" : "bg-transparent hover:bg-gray-700"}`;
  return (
    <>
      <nav className="w-full">
        <ul className="w-full flex sm:flex-col gap-2 justify-between sm:justify-start items-center">
          <Link href={"/"} className={listStyles(pathname === "/")}>
            <span>
              <FaHome />
            </span>
            <span className="hidden sm:block">Home</span>
          </Link>
          <Link href={"/anime"} className={listStyles(pathname.startsWith("/anime"))}>
            <span>
              <HiOutlineCollection />
            </span>
            <span className="hidden sm:block">Anime List</span>
          </Link>
          <Link href={"/watchlist"} className={listStyles(pathname === "/watchlist")}>
            <span className="text-3xl">
              <MdPlaylistPlay />
            </span>
            <span className="hidden sm:block">Watchlist</span>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default AppNavigation;
