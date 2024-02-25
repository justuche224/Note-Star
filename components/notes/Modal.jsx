import { FaTimesCircle, FaPen, FaTrash, FaCheck } from "react-icons/fa";
import styles from "./Modal.module.css";
import Link from "next/link";

const Modal = ({ selectedNote, setShowModal, handleDeleteNote }) => {
  const handleClickDelete = () => {
    setShowModal(false);
    handleDeleteNote(selectedNote);
  };

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
  console.log(selectedNote);
  return (
    <div className={styles.modal} onClick={() => setShowModal(false)}>
      <div
        className={`${styles.modal_content} bg-white text-black dark:bg-black dark:text-white`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          type="button"
          className="absolute -top-5 -right-5"
          onClick={() => setShowModal(false)}
        >
          <FaTimesCircle size={35} />
        </button>
        <h1 className="font-bold text-2xl mb-3">{selectedNote?.title}</h1>
        <p className="text-lg">{selectedNote?.body}</p>
        <p className={styles.modal_due_date}>
          {calculateElapsedTime(selectedNote.creationDateTime)} ago
        </p>
        <div className={styles.modal_buttons}>
          <button className={styles.modal_button}>
            <Link href={`/update-note?id=${selectedNote._id}`}>
              <FaPen />
            </Link>
          </button>
          <button className={styles.modal_button} onClick={handleClickDelete}>
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
