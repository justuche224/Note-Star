"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InlineLoader from "@/components/loading/InlineLoader";
import "../../styles/Note.css";

const UpdateNote = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteID = searchParams.get("id");

  useEffect(() => {
    const fetchPost = async () => {
      if (!noteID) {
        router.push("/error?message=missing-note-id");
        return;
      }

      try {
        const response = await fetch(`/api/note/${noteID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post data");
        }
        const data = await response.json();
        console.log(data);
        const { title, body } = data.note;
        document.querySelector(".note-title").innerText = title;
        document.querySelector(".note-body").innerText = body;
      } catch (error) {
        console.error("Error fetching post:", error);
        // Handle error (display message, redirect, etc.)
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [noteID, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    const title = document.querySelector(".note-title").innerText.trim();
    const body = document.querySelector(".note-body").innerText.trim();
    if (title === "") {
      setMessage("Please enter note title.");
    } else if (body === "") {
      setMessage("Please enter note.");
    } else {
      setMessage(null);
      setSubmitting(true);
      try {
        const response = await fetch(`/api/note/${noteID}`, {
          method: "PATCH",
          body: JSON.stringify({
            title,
            body,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          router.push("/");
        } else {
          throw new Error("Failed to update post");
        }
      } catch (error) {
        console.error("Error updating post:", error);
        // Handle error (display message, etc.)
      }
    }
  };
  return (
    <div>
      <div className="max-w-4xl mx-auto relative flex flex-col p-3 rounded-lg bg-[#e8e7f7] dark:bg-slate-800 mt-2">
        {isLoading && (
          <div className="w-full h-full absolute left-0 top-0 grid place-content-center bg-[#00000050] dark:bg-[#ffffff50]">
            <InlineLoader />
          </div>
        )}
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
};

export default UpdateNote;
