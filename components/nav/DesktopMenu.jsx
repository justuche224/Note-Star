import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const DesktopMenu = () => {
  return (
    <>
      <div className="md:flex hidden gap-8">
        <div className="hidden md:flex items-center">
          <a
            className="p-2 py-2.5 text-sm leading-none underline-offset-4 hover:underline md:p-3 text-black underline decoration-black dark:text-gray-200 dark:decoration-gray-200"
            href="/docs"
            title="Create Task"
          >
            Create Task
          </a>
          <a
            className="p-2 py-2.5 text-sm leading-none underline-offset-4 hover:underline md:p-3 text-black underline decoration-black dark:text-gray-200 dark:decoration-gray-200"
            href="/docs"
            title="Create Task"
          >
            Create Task
          </a>
          <a
            className="p-2 py-2.5 text-sm leading-none underline-offset-4 hover:underline md:p-3 text-black underline decoration-black dark:text-gray-200 dark:decoration-gray-200"
            href="/docs"
            title="Create Task"
          >
            Create Task
          </a>
          <a
            className="p-2 py-2.5 text-sm leading-none underline-offset-4 hover:underline md:p-3 text-black underline decoration-black dark:text-gray-200 dark:decoration-gray-200"
            href="/docs"
            title="Create Task"
          >
            Create Task
          </a>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/remix-run/remix"
            className="hidden h-10 w-10 place-items-center text-black hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-50 md:grid"
            title="Chat us on WhatsApp"
          >
            <span className="sr-only">Chat us on WhatsApp</span>
            <FaWhatsapp size={24} />
          </a>
        </div>
      </div>
    </>
  );
};

export default DesktopMenu;
