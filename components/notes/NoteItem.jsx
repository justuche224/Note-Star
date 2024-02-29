import { FaPen, FaTrash } from "react-icons/fa";
import Link from "next/link";
import parse from "html-react-parser";

export const NoteItem = ({ note, handleDeleteNote, handleNoteClick }) => {
  const handleClickDelete = () => {
    handleDeleteNote(note);
  };

  return (
    <div
      className="p-2 bg-white dark:bg-gray-800 flex flex-col justify-between"
      onClick={() => handleNoteClick(note)}
    >
      <h1 className="text-center font-bold text-xl mb-2 note-visible-title">
        {note.title}
      </h1>
      <p className="note text-lg pb-2">{parse(note.body)}</p>
      <div className="note-footer">
        <div className="task-actions">
          <>
            <span className="edit fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200 text-black">
              <Link href={`/update-note?id=${note._id}`}>
                <FaPen />
              </Link>
            </span>
          </>
          <span
            className="delete fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200 text-black"
            onClick={handleClickDelete}
          >
            <FaTrash />
          </span>
        </div>
      </div>
    </div>
  );
};
