"use client";

import { useRouter, useSearchParams } from "next/navigation";
import InlineLoader from "@/components/loading/InlineLoader";
import { useEditor, EditorContent } from "@tiptap/react";
import { useState, useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useSession } from "next-auth/react";
import { useNoteContext } from "@/app/context/SearchContext";
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

const UpdateNote = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setErrorMessage } = useNoteContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteID = searchParams.get("id");
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

  useEffect(() => {
    const fetchPost = async () => {
      if (!noteID) {
        router.push("/error?message=missing-note-id");
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(`/api/note/${noteID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post data");
        }
        const data = await response.json();

        const { title, body } = data.note;
        setTitle(title);
        setBody(body);
        editor.commands.setContent(body);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [noteID, router, editor]);

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
        setErrorMessage(`Error: ${error}`);
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
      {isLoading && (
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

export default UpdateNote;
