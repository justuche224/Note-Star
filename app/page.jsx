import { Tiptap } from "@/components/Tiptap";
import NoteContainer from "@/components/notes/NoteContainer";

export default function Home() {
  return (
    <main className="px-3">
      <Tiptap />
      <NoteContainer />
    </main>
  );
}
