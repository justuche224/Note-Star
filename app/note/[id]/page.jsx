import NoteDetails from "@/components/notes/NoteDetailes";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="text-center font-bold text-2xl">Loading...</div>
      }
    >
      <NoteDetails />
    </Suspense>
  );
};

export default page;
