import { create } from "zustand";

import { getNotes } from "@/lib/requests/operations/notes";
import { NoteProps } from "@/lib/types";

type NoteStore = {
  notes: NoteProps[] | null;
  fetchingNotes: boolean;
  fetchAndSetNotes: () => void;
  resetNotes: () => void;
  selectedNote: NoteProps | null;
  setSelectedNote: (note: NoteProps) => void;
};

export const useNoteStore = create<NoteStore>()((set) => ({
  notes: null,

  fetchingNotes: true,

  resetNotes: () => set({ notes: null }),

  fetchAndSetNotes: async () => {
    set({ fetchingNotes: true });
    const notes = await getNotes();
    set({ notes });
    set({ fetchingNotes: false });
  },

  selectedNote: null,

  setSelectedNote: (note: NoteProps) => set({ selectedNote: note }),
}));
