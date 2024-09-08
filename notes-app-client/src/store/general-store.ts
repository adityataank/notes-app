import { create } from "zustand";

type GeneralStore = {
  isSearchFocused: boolean;
  setIsSearchFocused: (val: boolean) => void;
};

export const useGeneralStore = create<GeneralStore>()((set) => ({
  isSearchFocused: false,
  setIsSearchFocused: (value: boolean) => set({ isSearchFocused: value }),
}));
