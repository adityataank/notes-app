import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/layout-components/header";
import NoteContent from "@/components/layout-components/notes/note-content";
import NoteTitle from "@/components/layout-components/notes/note-title";

function NewNotePage() {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e) {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
      setNote({ ...note, [fieldName]: fieldValue });
    }
  };

  const onBack = () => navigate(-1);

  const saveNote = () => {
    alert("save note");
  };

  const showSave = Boolean(note.title.trim() || note.content.trim());

  return (
    <div className="flex flex-col gap-6 h-[calc(100dvh-20rem)]">
      <Header
        type="new"
        onBack={onBack}
        showSave={showSave}
        onSave={saveNote}
      />
      <NoteTitle value={note.title} handleChange={handleChange} />
      <NoteContent value={note.content} handleChange={handleChange} />
    </div>
  );
}

export default NewNotePage;
