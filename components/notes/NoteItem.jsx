import { FaPen, FaTrash } from "react-icons/fa";
import Link from "next/link";

export const NoteItem = ({ note, handleDeleteNote }) => {
  const calculateElapsedTime = (creationDateTime) => {
    const creationTime = new Date(creationDateTime).getTime();
    const currentTime = new Date().getTime();
    const difference = currentTime - creationTime;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    let elapsedTime = "";
    if (days > 0) {
      elapsedTime += `${days} day${days > 1 ? "s" : ""}`;
    }
    if (hours > 0) {
      elapsedTime += `${elapsedTime ? ", " : ""}${hours} hour${
        hours > 1 ? "s" : ""
      }`;
    }
    if (mins > 0) {
      elapsedTime += `${elapsedTime ? ", " : ""}${mins} minute${
        mins > 1 ? "s" : ""
      }`;
    }

    return elapsedTime || "Just now";
  };

  const handleClickDelete = () => {
    handleDeleteNote(note);
  };

  return (
    <div className="p-2 bg-[#e8e7f7] dark:bg-gray-800">
      <h1 className="text-center font-bold text-xl mb-2">{note.title}</h1>
      <hr className="task-divider" />
      <p className="note text-lg pb-2">{note.body}</p>
      <hr className="task-divider" />
      <div className="note-footer">
        <p className="task-deadline">
          <span className="text-base italic">
            {calculateElapsedTime(note.creationDateTime)} ago
          </span>
        </p>
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
