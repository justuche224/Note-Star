import Note from "@/components/notes/Note";
import Image from "next/image";

export default function Home() {
  return (
    <main className="px-3">
      <h1 className=" text-center text-xl font-bold">
        Stay productive and organized wherever you go, with intuitive features
        designed to enhance your workflow. Elevate your note-taking experience
        today.
      </h1>
      <Note />
    </main>
  );
}
