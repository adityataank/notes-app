import { create } from "zustand";

import { getNotes } from "@/lib/requests/operations/notes";
import { NoteProps } from "@/lib/types";

type NoteStore = {
  notes: NoteProps[] | null;
  fetchingNotes: boolean;
  fetchAndSetNotes: () => void;
};

export const useNoteStore = create<NoteStore>()((set) => ({
  notes: null,

  fetchingNotes: true,

  fetchAndSetNotes: async () => {
    set({ fetchingNotes: true });
    const notes = await getNotes();
    set({ notes });
    set({ fetchingNotes: false });
  },
}));
