"use client";

import { NoteItem } from "./NoteItem";
import InlineLoader from "../loading/InlineLoader";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import { useNoteContext } from "@/app/context/SearchContext";
import { useDebounce } from "use-debounce";
import { FaTimesCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";

const NoteContainer = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { notes, setNotes, errorMessage, setErrorMessage } = useNoteContext();
  const [selectedNote, setSelectedNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingNotes, setFetchingNotes] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useDebounce(
    searchQuery,
    400
  );
  useEffect(() => {
    const fetchNotes = async () => {
      if (!session) return;
      setFetchingNotes(true);
      try {
        const response = await fetch("/api/note", {
          headers: {
            "Content-Type": "application/json",
            "user-id": session.user.id,
          },
        });
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        setFetchingNotes(false);
        setErrorMessage("Error fetching notes: " + error.message);
      } finally {
        setFetchingNotes(false);
      }
    };

    fetchNotes();
  }, [session]);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!session) return;
      if (searchQuery.trim() === "") {
        setFetchingNotes(true);
        try {
          const response = await fetch("/api/note", {
            headers: {
              "Content-Type": "application/json",
              "user-id": session.user.id,
            },
          });
          const data = await response.json();
          setNotes(data);
        } catch (error) {
          setFetchingNotes(false);
          setErrorMessage("Error fetching notes: " + error.message);
        } finally {
          setFetchingNotes(false);
        }
        return; // Exit the useEffect hook early after refetching all notes
      }

      setFetchingNotes(true);
      try {
        // Construct the URL with the search query as a parameter
        const url = `/api/note/search/${encodeURIComponent(searchQuery)}`;

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "user-id": session.user.id,
          },
        });
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        setFetchingNotes(false);
        setErrorMessage("Error fetching notes: " + error.message);
      } finally {
        setFetchingNotes(false);
      }
    };

    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, debouncedSearchQuery]);

  const handleDeleteNote = async (note) => {
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

      // Update UI immediately after successful deletion
      setNotes((prevNotes) => prevNotes.filter((t) => t._id !== note._id));
    } catch (error) {
      console.error("Error deleting note:", error);
      // Handle deletion error (e.g., display error message)
    } finally {
      setIsLoading(false);
    }
  };

  const handleNoteClick = (note) => {
    if (event.target.closest(".edit") || event.target.closest(".delete")) {
      return;
    }
    setSelectedNote(note);
    router.push(`/note/${note._id}`);
  };
  if (status === "loading") {
    return (
      <div className="w-full grid place-content-center">
        <InlineLoader />
      </div>
    );
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="min-w-full mt-5">
        {session?.user ? (
          <>
            {fetchingNotes && (
              <div className="w-full grid place-content-center">
                <InlineLoader />
              </div>
            )}

            <div className="max-w-4xl mx-auto text-black">
              <input
                type="text"
                aria-label="Seach notes"
                placeholder="Search notes...."
                value={searchQuery}
                className="w-full h-10 p-2 mb-3"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {errorMessage && (
              <div className="error-message">
                <div className="error-message-content bg-white text-black dark:bg-black dark:text-white">
                  <h1>{errorMessage}</h1>
                  <button
                    aria-label="close error message"
                    onClick={() => setErrorMessage(null)}
                    className="absolute -top-5 -right-5"
                  >
                    <FaTimesCircle size={37} />
                  </button>
                </div>
              </div>
            )}
            <div className="note-container max-w-4xl mx-auto grid place-content-center gap-3">
              {notes.map((note) => (
                <NoteItem
                  key={note._id}
                  note={note}
                  parse={parse}
                  handleNoteClick={handleNoteClick}
                  handleDeleteNote={handleDeleteNote}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="grid place-content-center text-center">
            <h1 className="text-3xl font-bold">
              Please Log In to View, Create and Edit Notes
            </h1>
            <button
              type="button"
              className="px-3 py-2 bg-blue-700 text-white hover:opacity-80 mt-2 rounded-md"
            >
              <Link href="/auth/signin">Log In or Sign Up</Link>
            </button>
          </div>
        )}
      </section>
    </Suspense>
  );
};

export default NoteContainer;
