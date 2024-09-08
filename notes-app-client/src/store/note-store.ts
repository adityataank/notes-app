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
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filteredNotes: NoteProps[] | null;
  fetchAndSetNotesBySearch: (q: string) => void;
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

  resetNotes: () => set({ notes: null }),

  selectedNote: null,
  setSelectedNote: (note: NoteProps) => set({ selectedNote: note }),

  searchQuery: "",
  setSearchQuery: (q) => {
    if (!q) {
      set({ filteredNotes: null });
    }
    return set({ searchQuery: q });
  },

  filteredNotes: null,
  fetchAndSetNotesBySearch: (q: string) => {
    if (!q) {
      return set({ filteredNotes: null });
    }
    set((state) => {
      const query = q.toLowerCase();
      const filteredNotes = state.notes?.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      );
      return { filteredNotes };
    });
  },
}));
