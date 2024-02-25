"use client";

import { NoteItem } from "./NoteItem";
import InlineLoader from "../loading/InlineLoader";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import Modal from "./Modal";

const NoteContainer = () => {
  const { data: session } = useSession();
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingNotes, setFetchingNotes] = useState(false);

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
        console.error("Error fetching notes:", error);
      } finally {
        setFetchingNotes(false);
      }
    };

    fetchNotes();
  }, [session]);

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
    setSelectedNote(note);
    setShowModal(true);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="min-w-full mt-5 px-3">
        {session?.user ? (
          <>
            {showModal && (
              <Modal
                selectedNote={selectedNote}
                setShowModal={setShowModal}
                handleDeleteNote={handleDeleteNote}
              />
            )}
            {fetchingNotes && (
              <div className="w-full grid place-content-center">
                <InlineLoader />
              </div>
            )}
            <div className="note-container max-w-4xl mx-auto grid place-content-center gap-3">
              {notes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  handleDeleteNote={handleDeleteNote}
                  handleNoteClick={handleNoteClick}
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
