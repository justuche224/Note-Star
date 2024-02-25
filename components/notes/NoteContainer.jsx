import { NoteItem } from "./NoteItem";
import InlineLoader from "../loading/InlineLoader";

const NoteContainer = ({ fetchingNotes, notes, handleDeleteNote }) => {
  return (
    <section className="min-w-full mt-5 px-3">
      {fetchingNotes && (
        <div className="w-full grid place-content-center">
          <InlineLoader />
        </div>
      )}
      <div className="note-container max-w-4xl mx-auto grid place-content-center gap-3">
        {notes.length ? (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              handleDeleteNote={handleDeleteNote}
            />
          ))
        ) : (
          <h1 className="text-center">No Notes!</h1>
        )}
      </div>
    </section>
  );
};

export default NoteContainer;
