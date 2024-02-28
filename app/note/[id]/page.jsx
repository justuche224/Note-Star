import NoteDetails from "@/components/notes/NoteDetailes";
import { Suspense } from "react";

const page = ({ params }) => {
  return (
    <Suspense
      fallback={
        <div className="text-center font-bold text-2xl">Loading...</div>
      }
    >
      <NoteDetails params={params} />
    </Suspense>
  );
};

export default page;
