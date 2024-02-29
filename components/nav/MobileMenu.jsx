import {
  FaBell,
  FaBook,
  FaQuestionCircle,
  FaTrash,
  FaUserCircle,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

const MobileMenu = ({ session, setOpenMobileMenu }) => {
  const handleMenuClick = () => {
    if (event.target.closest(".main-mobile")) {
      return;
    }
    setOpenMobileMenu(false);
  };

  return (
    <div
      className="w-full bg-[#00000075] md:hidden fixed top-16 min-h-screen left-0"
      onClick={handleMenuClick}
    >
      <div className="main-mobile md:hidden block gap-8 w-[60%] min-h-screen fixed top-16 -right-2 bg-white dark:bg-gray-900 shadow-2xl">
        <div className="block md:hidden">
          <div className="flex content-center justify-center gap-2 p-3">
            <div>
              <Link
                href="https://github.com/remix-run/remix"
                className="h-10 w-10 place-items-center text-black hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-50 md:grid"
                title="Profile"
              >
                <span className="sr-only">Profile</span>
                {session?.user ? (
                  <Image
                    src={session?.user?.image}
                    width={60}
                    height={60}
                    className="rounded-full block"
                    alt="profile"
                  />
                ) : (
                  <FaUserCircle size={24} />
                )}
              </Link>
            </div>
            {session?.user ? (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/auth/signin">Log In or Sign Up</Link>
            )}
          </div>
          <Link
            className="p-2 py-2.5 text-sm leading-none underline-offset-4 hover:underline md:p-3 text-black underline decoration-black dark:text-gray-200 dark:decoration-gray-200 block"
            href="/docs"
            title="Create Task"
          >
            <FaBook className="inline-block" /> Notes
          </Link>
          <Link
            className="p-2 py-2.5 text-sm leading-none underline-offset-4 hover:underline md:p-3 text-black underline decoration-black dark:text-gray-200 dark:decoration-gray-200 block"
            href="/docs"
            title="Create Task"
          >
            <FaBell className="inline-block" /> Tasks
          </Link>
          <Link
            className="p-2 py-2.5 text-sm leading-none underline-offset-4 hover:underline md:p-3 text-black underline decoration-black dark:text-gray-200 dark:decoration-gray-200 block"
            href="/docs"
            title="Create Task"
          >
            <FaQuestionCircle className="inline-block" /> Help & feedback
          </Link>
          <Link
            className="p-2 py-2.5 text-sm leading-none underline-offset-4 hover:underline md:p-3 text-black underline decoration-black dark:text-gray-200 dark:decoration-gray-200 block"
            href="/docs"
            title="Create Task"
          >
            <FaTrash className="inline-block" /> Deleted
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
