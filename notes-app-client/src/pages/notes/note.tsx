import { useState } from "react";

import Header from "@/components/layout-components/header";
import NoteContent from "@/components/layout-components/notes/note-content";
import NoteTitle from "@/components/layout-components/notes/note-title";
import AlertDrawer from "@/components/layout-components/alert-drawer";

import { useGoBack } from "@/lib/hooks/useGoBack";

function NotePage() {
  const [note, setNote] = useState({
    title: "Engineer",
    content: "I did engineering from Chennai",
  });

  const [openAlert, setOpenAlert] = useState(false);

  const goBack = useGoBack();

  const initialNote = {
    title: "Engineer",
    content: "I did engineering from Chennai",
  };

  const isDirty = Boolean(
    note.title !== initialNote.title || note.content !== initialNote.content
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e) {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
      setNote({ ...note, [fieldName]: fieldValue });
    }
  };

  const onBack = () => (isDirty ? setOpenAlert(true) : goBack());

  const saveNote = () => {
    alert("save note");
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100dvh-6rem)]">
      <AlertDrawer
        open={openAlert}
        setOpen={setOpenAlert}
        description="Going back will discard any unsaved changes."
        onConfirmation={goBack}
      />
      <Header
        type="note"
        showSave={isDirty}
        onBack={onBack}
        onSave={saveNote}
      />
      <NoteTitle value={note.title} handleChange={handleChange} />
      <NoteContent value={note.content} handleChange={handleChange} />
    </div>
  );
}

export default NotePage;
