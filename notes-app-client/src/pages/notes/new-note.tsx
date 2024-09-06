import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import Header from "@/components/layout-components/header";
import NoteContent from "@/components/layout-components/notes/note-content";
import NoteTitle from "@/components/layout-components/notes/note-title";
import AlertDrawer from "@/components/layout-components/alert-drawer";

import { useGoBack } from "@/lib/hooks/useGoBack";
import { REQUEST } from "@/lib/requests/request";
import { API_ENDPOINTS } from "@/lib/requests/routes";

import { useNoteStore } from "@/store/note-store";
import { useLoading } from "@/lib/hooks/useLoading";

function NewNotePage() {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [openAlert, setOpenAlert] = useState(false);

  const { fetchAndSetNotes } = useNoteStore();

  const goBack = useGoBack();

  const [loading, startLoading, stopLoading] = useLoading();

  const navigate = useNavigate();

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

  const saveNote = async () => {
    try {
      startLoading();
      const url = API_ENDPOINTS.notes();
      const response = await REQUEST.post(url, note);
      fetchAndSetNotes();
      navigate("/notes");
      toast.success(response?.message ?? "Note created successfully!");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "error" in err) {
        toast.error(
          (err as { error: string }).error ?? "Failed to create note."
        );
      } else {
        console.log("Error while creating a note.", err);
      }
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100dvh-6rem)]">
      <Header
        type="note"
        title="Add a new note"
        onBack={onBack}
        showSave={showSave}
        onSave={saveNote}
        showLoader={loading}
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
