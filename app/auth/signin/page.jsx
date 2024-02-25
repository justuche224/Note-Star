import SignIn from "@/components/signIn/SignIn";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="text-center font-bold text-2xl">Loading...</div>
      }
    >
      <SignIn />
    </Suspense>
  );
};

export default page;
