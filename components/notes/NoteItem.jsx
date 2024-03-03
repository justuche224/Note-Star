import { FaPen, FaTrash } from "react-icons/fa";
import Link from "next/link";
import parse from "html-react-parser";

export const NoteItem = ({ note, handleDeleteNote, handleNoteClick }) => {
  const handleClickDelete = () => {
    handleDeleteNote(note);
  };

  return (
    <div onClick={() => handleNoteClick(note)}>
      <h1 className="note-visible-title text-xl italic p-1">{note.title}</h1>
      <div className="ProseMirror note">{parse(note.body)}</div>
      <div className="task-actions bg-white dark:bg-[#3d3d3d]">
        <Link
          href={`/update-note?id=${note._id}`}
          className="edit fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200 text-black"
        >
          <FaPen />
        </Link>

        <span
          className="delete fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200 text-black"
          onClick={handleClickDelete}
        >
          <FaTrash />
        </span>
      </div>
    </div>
  );
};
