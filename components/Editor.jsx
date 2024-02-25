"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import InlineLoader from "./loading/InlineLoader";
import "../styles/Note.css";
import { useRouter } from "next/navigation";

export default function Editor() {
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleElement = document.querySelector(".note-title");
    const bodyElement = document.querySelector(".note-body");
    const title = titleElement.innerText.trim();
    const body = bodyElement.innerText.trim();

    if (title === "") {
      setMessage("Please enter note title.");
    } else if (body === "") {
      setMessage("Please enter note.");
    } else {
      setMessage(null);
      setSubmitting(true);

      console.log("Title:", title);
      console.log("Body:", body);

      try {
        const response = await fetch("/api/note/new", {
          method: "POST",
          body: JSON.stringify({
            title: title,
            body: body,
            creator: session?.user.id,
          }),
        });
        if (response.ok) {
          titleElement.innerText = "";
          bodyElement.innerText = "";
          // const newNote = await response.json();
          // addNote(newNote);
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto relative flex flex-col p-3 rounded-lg bg-[#e8e7f7] dark:bg-slate-800 mt-2">
        {submitting && (
          <div className="w-full h-full absolute left-0 top-0 grid place-content-center bg-[#00000050] dark:bg-[#ffffff50]">
            <InlineLoader />
          </div>
        )}
        <div className="w-full">
          <div className="placeholder first-letter:italic" aria-hidden="true">
            Title
          </div>
          <div
            className="note-title shadow-inner bg-white text-black border border-gray-500 rounded-lg p-1"
            contentEditable
            aria-placeholder="Note title"
          />
        </div>
        <div>
          <div className="placeholder italic" aria-hidden="true">
            Note
          </div>
          <div
            className="note-body shadow-inner bg-white text-black border border-gray-500 rounded-lg p-1"
            contentEditable
            aria-placeholder="Note"
          />
        </div>
        {message && <p className="text-red-500">{message}</p>}
        <button
          type="button"
          className="px-3 py-1 rounded-full mt-2 self-end bg-blue-700 hover:opacity-85 cursor-pointer"
          onClick={handleSubmit}
        >
          Done
        </button>
      </div>
    </div>
  );
}
