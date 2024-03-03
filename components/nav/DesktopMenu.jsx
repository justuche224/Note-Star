import { FaBell, FaBook, FaQuestionCircle, FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

const DesktopMenu = ({ session }) => {
  return (
    <>
      <div className="md:flex hidden">
        <div className="hidden md:flex items-center">
          <Link
            className="p-2 py-2.5 text-sm leading-none underline-offset-4 hover:underline md:p-3 text-black underline decoration-black dark:text-gray-200 dark:decoration-gray-200 block"
            href="/"
            title="Create Task"
          >
            <FaBook className="inline-block" /> Notes
          </Link>
          <Link
            className="p-2 py-2.5 text-sm leading-none underline-offset-4 hover:underline md:p-3 text-black underline decoration-black dark:text-gray-200 dark:decoration-gray-200 block"
            href="/tasks"
            title="Create Task"
          >
            <FaBell className="inline-block" /> Tasks
          </Link>
          <Link
            className="p-2 py-2.5 text-sm leading-none underline-offset-4 hover:underline md:p-3 text-black underline decoration-black dark:text-gray-200 dark:decoration-gray-200 block"
            href="/help"
            title="Create Task"
          >
            <FaQuestionCircle className="inline-block" /> Help & feedback
          </Link>
        </div>
        <div className="flex content-center justify-center gap-2 p-3">
          <div>
            <Link
              href="https://github.com/remix-run/remix"
              className="h-10 w-10 place-items-center text-black hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-50 md:grid"
              title="Profile"
            >
              {session?.user ? (
                <Image
                  src={session?.user?.image}
                  width={40}
                  height={40}
                  className="rounded-full block"
                  alt="profile"
                />
              ) : (
                <FaUserCircle size={34} />
              )}
            </Link>
          </div>
          {session?.user ? (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  toggleMoileMenu;
                  signOut();
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex gap-3 text-center mt-[6px]">
              <Link href="/auth/signin">Log In</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DesktopMenu;
