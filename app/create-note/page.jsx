import Editor from "@/components/Editor";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="text-center font-bold text-2xl">Loading...</div>
      }
    >
      <Editor />
    </Suspense>
  );
};

export default page;
