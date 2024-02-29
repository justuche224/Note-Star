"use client";

import { createContext, useState, useContext } from "react";

const NoteContext = createContext();

export const useNoteContext = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, errorMessage, setErrorMessage }}
    >
      {children}
    </NoteContext.Provider>
  );
};
