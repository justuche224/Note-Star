"use client";

import { createContext, useState, useContext } from "react";

const NoteContext = createContext();

export const useNoteContext = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isNotesCached, setIsNotesCached] = useState(false); // Track whether notes are cached

  // Function to fetch notes from API if not already cached
  const fetchNotesIfNeeded = async (session) => {
    if (!session) return;

    if (!isNotesCached) {
      console.log("no cached notes");
      try {
        const response = await fetch("/api/note", {
          headers: {
            "Content-Type": "application/json",
            "user-id": session.user.id,
          },
        });
        const data = await response.json();
        setNotes(data);
        setIsNotesCached(true); // Mark notes as cached
      } catch (error) {
        setErrorMessage("Error fetching notes: " + error.message);
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        errorMessage,
        setErrorMessage,
        selectedNote,
        setSelectedNote,
        fetchNotesIfNeeded, // Expose the function to fetch notes
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
