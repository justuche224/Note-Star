"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
// import { useSearchContext } from "@/app/context/SearchContext";
import Themes from "./Themes";

const Nav = () => {
  const { data: session } = useSession();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  // const { toggleSearchBar } = useSearchContext();
  const toggleMoileMenu = () => {
    setOpenMobileMenu((prev) => !prev);
  };

  return (
    <nav aria-label="Navigation Bar" className=" ">
      <div className="m-auto">
        <div className="px-4 sm:px-6 lg:px-8 fixed top-0 border-b border-gray-400 bg-white dark:bg-gray-900 z-50 flex h-16 w-full items-center justify-between py-3">
          <div className="flex w-full items-center justify-between gap-4 sm:gap-5 md:w-auto">
            <div className="logo">
              <Link href="/">
                <Image
                  className="rounded-full"
                  src="/icons/SGN_02_24_2024_1708808302589.png"
                  height={90}
                  width={90}
                  alt="Logo"
                  priority={true}
                />
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Themes />
              <button
                onClick={toggleMoileMenu}
                aria-label="Toggle menu"
                className="md:hidden bg-blue-200 hover:bg-gray-200 [[open]>&amp;]:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:[[open]>&amp;]:bg-gray-700 _no-triangle grid h-10 w-10 place-items-center rounded-full"
              >
                {openMobileMenu ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
          {/* Desktop Menu */}
          <DesktopMenu session={session} />
          {/* mobile Menu */}
          {openMobileMenu && (
            <MobileMenu
              session={session}
              setOpenMobileMenu={setOpenMobileMenu}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
