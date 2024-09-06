import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import Header from "@/components/layout-components/header";
import NoteContent from "@/components/layout-components/notes/note-content";
import NoteTitle from "@/components/layout-components/notes/note-title";
import AlertDrawer from "@/components/layout-components/alert-drawer";

import { useGoBack } from "@/lib/hooks/useGoBack";
import { REQUEST } from "@/lib/requests/request";
import { API_ENDPOINTS } from "@/lib/requests/routes";

import { useNoteStore } from "@/store/note-store";
import { useLoading } from "@/lib/hooks/useLoading";

const DEFAULT_STATE = {
  title: "",
  content: "",
  id: 0,
  created_at: "",
  updated_at: "",
};

function NotePage() {
  const [note, setNote] = useState(DEFAULT_STATE);
  const [initialNote, setInitialNote] = useState(DEFAULT_STATE);
  const [openAlert, setOpenAlert] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const [deleting, startDeleting, stopDeleting] = useLoading();
  const [saving, startSaving, stopSaving] = useLoading();

  const goBack = useGoBack();

  const { id } = useParams();

  const { fetchAndSetNotes, selectedNote } = useNoteStore();

  const navigate = useNavigate();

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

  const saveNote = async () => {
    try {
      startSaving();
      const url = API_ENDPOINTS.note(id ?? "");
      const response = await REQUEST.patch(url, note);
      fetchAndSetNotes();
      navigate("/notes");
      toast.success(response?.message ?? "Note updated successfully!");
    } catch (err) {
      toast.error("Failed to update note.");
      console.log(err);
    } finally {
      stopSaving();
    }
  };

  const deleteNote = async () => {
    try {
      startDeleting();
      const url = API_ENDPOINTS.note(id ?? "");
      const response = await REQUEST.delete(url);
      fetchAndSetNotes();
      navigate("/notes");
      toast.success(response?.message ?? "Note deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete this note.");
      console.error(err);
    } finally {
      stopDeleting();
    }
  };

  useEffect(() => {
    if (id && selectedNote) {
      setInitialNote(selectedNote);
      setNote(selectedNote);
    }
  }, [id, selectedNote]);

  return (
    <div className="flex flex-col gap-6 h-[calc(100dvh-6rem)]">
      <AlertDrawer
        open={openAlert}
        setOpen={setOpenAlert}
        description="Going back will discard any unsaved changes."
        onConfirmation={goBack}
      />
      <AlertDrawer
        open={openDeleteConfirmation}
        setOpen={setOpenDeleteConfirmation}
        description="This note will be permanently deleted."
        primaryButtonText="Delete"
        onConfirmation={deleteNote}
        isLoading={deleting}
        isDestructive
      />
      <Header
        type="note"
        showSave={isDirty && Boolean(note.title)}
        showDelete
        onBack={onBack}
        onSave={saveNote}
        onDelete={() => setOpenDeleteConfirmation(true)}
        showLoader={saving}
      />
      {initialNote.title ? (
        <>
          <NoteTitle value={note.title} handleChange={handleChange} />
          <NoteContent value={note.content} handleChange={handleChange} />
        </>
      ) : null}
    </div>
  );
}

export default NotePage;
