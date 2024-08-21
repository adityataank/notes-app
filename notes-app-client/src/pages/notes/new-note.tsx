import { useState } from "react";

import Header from "@/components/layout-components/header";
import NoteContent from "@/components/layout-components/notes/note-content";
import NoteTitle from "@/components/layout-components/notes/note-title";
import AlertDrawer from "@/components/layout-components/alert-drawer";

import { useGoBack } from "@/lib/hooks/useGoBack";

function NewNotePage() {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [openAlert, setOpenAlert] = useState(false);

  const goBack = useGoBack();

  const showSave = Boolean(note.title.trim() || note.content.trim());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e) {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
      setNote({ ...note, [fieldName]: fieldValue });
    }
  };

  const onBack = () => (showSave ? setOpenAlert(true) : goBack());

  const saveNote = () => {
    alert("save note");
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100dvh-6rem)]">
      <Header
        type="note"
        title="Add a new note"
        onBack={onBack}
        showSave={showSave}
        onSave={saveNote}
      />
      <AlertDrawer
        open={openAlert}
        setOpen={setOpenAlert}
        description="Going back will discard any unsaved changes."
        onConfirmation={goBack}
      />
      <NoteTitle value={note.title} handleChange={handleChange} autoFocus />
      <NoteContent value={note.content} handleChange={handleChange} />
    </div>
  );
}

export default NewNotePage;
