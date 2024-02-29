"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useSession } from "next-auth/react";
import { useNoteContext } from "@/app/context/SearchContext";
import InlineLoader from "./loading/InlineLoader";
import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is_active" : ""}
          aria-label="bold"
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is_active" : ""}
          aria-label="italic"
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is_active" : ""}
          aria-label="underline"
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is_active" : ""}
          aria-label="strike through"
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is_active" : ""}
          aria-label="bullet list"
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is_active" : ""}
          aria-label="ordered list"
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is_active" : ""}
          aria-label="quote"
        >
          <FaQuoteLeft />
        </button>
      </div>
      <div>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          aria-label="undo"
        >
          <FaUndo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          aria-label="redo"
        >
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

export const Tiptap = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { setNotes, setErrorMessage } = useNoteContext();
  const [message, setMessage] = useState(null);
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: `${body}`,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setBody(html);
    },
  });

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const addNote = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session?.user) {
      setMessage("Please log in to create notes.");
      return;
    }

    if (title === "") {
      setMessage("Please enter note title.");
    } else if (body === "") {
      setMessage("Please enter note.");
    } else {
      setMessage(null);
      setSubmitting(true);
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
          const newNote = await response.json();
          addNote(newNote);
          setTitle("");
          setBody("");
          editor.commands.setContent("");
        }
      } catch (error) {
        setErrorMessage(`Error: ${error}`);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div>
        <input
          type="text"
          placeholder="Note Title"
          aria-label="note title"
          className="my-3 p-1 border border-gray-400 rounded"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="textEditor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      {message && <p className="text-red-500">{message}</p>}
      {submitting && (
        <div className="w-full min-h-screen fixed left-0 top-0 grid place-content-center bg-[#00000050] dark:bg-[#ffffff50] z-[500]">
          <InlineLoader />
        </div>
      )}
      <button
        type="button"
        aria-label="submit note"
        onClick={handleSubmit}
        className="bg-white rounded-full text-black shadow px-3 py-1 mt-2 self-end"
      >
        Submit
      </button>
    </div>
  );
};
