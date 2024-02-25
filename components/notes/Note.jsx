"use client";

import { useState, useEffect } from "react";
import Editor from "@/components/Editor";
import NoteContainer from "@/components/notes/NoteContainer";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function NotePage() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState([]);
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

  const addNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  if (!session) {
    return (
      <div className="grid place-content-center text-center">
        <h1 className="text-3xl font-bold">
          Please Log In to View, Create and Edit Notes
        </h1>
        <button
          type="button"
          className="px-3 py-2 bg-blue-700 text-white hover:opacity-80 mt-2 rounded-md"
        >
          <Link href="http://localhost:3000/auth/signin">
            Log In or Sign Up
          </Link>
        </button>
      </div>
    );
  }

  return (
    <>
      <Editor addNote={addNote} />
      <NoteContainer
        fetchingNotes={fetchingNotes}
        notes={notes}
        handleDeleteNote={handleDeleteNote}
      />
    </>
  );
}
