"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useSession } from "next-auth/react";
import parse from "html-react-parser";
import {
  FaBold,
  FaHeading,
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
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is_active" : ""}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is_active" : ""}
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is_active" : ""}
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is_active" : ""
          }
        >
          <FaHeading />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is_active" : ""
          }
        >
          <FaHeading className="heading3" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is_active" : ""}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is_active" : ""}
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is_active" : ""}
        >
          <FaQuoteLeft />
        </button>
      </div>
      <div>
        <button onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
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
  const [note, setNote] = useState([]);
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
    setNote((prevNotes) => [...prevNotes, newNote]);
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
      //setSubmitting(true);
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
          setTitle("");
          setBody("");
          editor.commands.setContent("");
          const newNote = await response.json();
          addNote(newNote);
          //router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        // setSubmitting(false);
        alert("done");
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div>
        <input
          type="text"
          name="note title"
          placeholder="Note Title"
          aria-label="note title"
          className="my-3 p-1 border border-gray-400"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="textEditor">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      {/* <div className="ProseMirror">{parse(body)}</div> */}
      {message && <p className="text-red-500">{message}</p>}
      <button
        type="button"
        aria-label="submit note"
        onClick={handleSubmit}
        className="bg-white rounded-full text-black shadow px-3 py-1 my-2 self-end"
      >
        Submit
      </button>
      <br />
      <br />
      <div>
        {note?.map((note) => (
          <div key={note._id}>
            <h1>{note.title}</h1>
            <div className="ProseMirror">{parse(note.body)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
