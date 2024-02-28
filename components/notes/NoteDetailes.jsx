"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InlineLoader from "@/components/loading/InlineLoader";
import { FaArrowCircleLeft, FaPen, FaTrash } from "react-icons/fa";
import Link from "next/link";

const NoteDetails = ({ params }) => {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  console.log(params);
  const noteID = params.id;
  useEffect(() => {
    const fetchPost = async () => {
      if (!noteID) {
        router.push("/");
        return;
      }

      try {
        const response = await fetch(`/api/note/${noteID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post data");
        }
        const data = await response.json();
        setNote(data.note);
      } catch (error) {
        console.error("Error fetching post:", error);
        // Handle error (display message, redirect, etc.)
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [noteID, router]);

  const handleDeleteNote = async () => {
    // Display confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) {
      return; // Exit if user cancels
    }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/note/${note._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error deleting note: " + (await response.text()));
      }
      router.push("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      // Handle deletion error (e.g., display error message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <button
        type="button"
        aria-label="go back"
        onClick={() => router.push("/")}
        className="ml-4"
      >
        <FaArrowCircleLeft size={30} />
      </button>
      {isLoading && (
        <div className="w-full h-full absolute left-0 top-0 grid place-content-center bg-[#00000050] dark:bg-[#ffffff50]">
          <InlineLoader />
        </div>
      )}
      {note && (
        <div className="p-3">
          <h1 className="text-center font-bold text-3xl mb-3">{note.title}</h1>
          <h1>{note.body}</h1>
          <div className="flex gap-3 mt-5 justify-center content-center">
            <button
              aria-label="Edit note"
              title="Edit note"
              className=" hover:opacity-85 bg-blue-600 border rounded "
            >
              <Link
                href={`/update-note?id=${note._id}`}
                className="py-2 px-4 flex content-center justify-center gap-2"
              >
                <FaPen className="mt-1" /> <h1>Edit Note</h1>
              </Link>
            </button>
            <button
              aria-label="Delete noe"
              title="Delete note"
              className=" hover:opacity-85 bg-blue-600 border rounded px-2 py-4 flex content-center text-center gap-2"
              onClick={handleDeleteNote}
            >
              <FaTrash className="mt-1" /> <h1>Delete note</h1>
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default NoteDetails;
