import { Tiptap } from "@/components/Tiptap";
import NoteContainer from "@/components/notes/NoteContainer";

export default function Home() {
  return (
    <main className="px-3">
      <h1 className=" text-center text-xl font-bold">
        Stay productive and organized wherever you go
      </h1>
      <Tiptap />
      <NoteContainer />
    </main>
  );
}
