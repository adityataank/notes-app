import { useCallback } from "react";

import { SearchProps } from "@/lib/types";

import Image from "../ui/image";

import SearchIcon from "/search-linear.svg";
import CloseIcon from "/close-outline.svg";

import { cn } from "@/lib/utils";
import { debounce } from "@/lib/debounce";

import { useGeneralStore } from "@/store/general-store";
import { useNoteStore } from "@/store/note-store";

function Search({ disabled = false }: SearchProps) {
  const { setIsSearchFocused, isSearchFocused } = useGeneralStore();
  const { setSearchQuery, searchQuery, fetchAndSetNotesBySearch } =
    useNoteStore();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleChange = useCallback(
    debounce((q: string) => {
      fetchAndSetNotesBySearch(q);
    }, 500),
    []
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      const val: string = e.target.value;
      setSearchQuery(val);
      if (val === "") {
        return setSearchQuery("");
      }
      debouncedHandleChange(val);
    }
  };

  return (
    <div
      className={cn(
        "w-full h-11 flex items-center rounded-xl relative border border-primary/50",
        disabled && "cursor-not-allowed bg-[#f0f0f0] shadow-none border-none"
      )}
    >
      <Image
        src={SearchIcon}
        width={20}
        height={20}
        alt="search"
        className="absolute left-4"
      />
      <input
        value={searchQuery}
        disabled={disabled}
        placeholder="Search for notes"
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
        onChange={handleInput}
        className={
          "w-full h-full bg-inherit rounded-[inherit] outline-none px-14 font-medium disabled:cursor-not-allowed"
        }
        spellCheck={false}
      />
      <Image
        src={CloseIcon}
        width={24}
        height={24}
        alt="close"
        onMouseDown={() => {
          setSearchQuery("");
        }}
        className={cn(
          "cursor-pointer absolute right-2 invisible opacity-0 transition-all",
          (isSearchFocused || searchQuery) && "visible opacity-100"
        )}
      />
    </div>
  );
}

export default Search;
