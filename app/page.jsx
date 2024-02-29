import { Tiptap } from "@/components/Tiptap";
import NoteContainer from "@/components/notes/NoteContainer";

export default function Home() {
  return (
    <main className="px-3">
      <h1 className=" text-center text-xl font-bold">
        Stay productive and organized wherever you go, with intuitive features
        designed to enhance your workflow. Elevate your note-taking experience
        today.
      </h1>
      <Tiptap />
      <NoteContainer />
    </main>
  );
}
