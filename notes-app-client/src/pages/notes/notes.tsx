import { useEffect } from "react";

import Header from "@/components/layout-components/header";
import Notes from "@/components/layout-components/notes/notes";

import { useNoteStore } from "@/store/note-store";

function NotesPage() {
  const { notes, fetchAndSetNotes } = useNoteStore();

  useEffect(() => {
    if (!notes) {
      fetchAndSetNotes();
    }
  }, [notes, fetchAndSetNotes]);

  return (
    <div className="h-full">
      <Header />
      <Notes />
    </div>
  );
}

export default NotesPage;
