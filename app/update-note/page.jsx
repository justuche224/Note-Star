import UpdateNote from "@/components/notes/UpdateNote";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="text-center font-bold text-2xl">Loading...</div>
      }
    >
      <UpdateNote />
    </Suspense>
  );
};

export default page;
