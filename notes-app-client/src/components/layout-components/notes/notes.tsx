import { Children } from "react";

// import Folders from "../Folders";
import Search from "../search";
import Note from "./note";
import Loader from "@/components/ui/loader";
import EmptyNotes from "./empty-notes";

import { useNoteStore } from "@/store/note-store";
import { useGeneralStore } from "@/store/general-store";

import { NoteProps } from "@/lib/types";
import { cn } from "@/lib/utils";

type ColumnProps = {
  type: "even" | "odd";
  notes: NoteProps[];
};

const Column = ({ type, notes = [] }: ColumnProps) => {
  const condition = type === "odd";
  return (
    <div className="h-fit">
      {Children.toArray(
        notes.map(
          (note, index) =>
            Boolean(index % 2) === condition && <Note {...note} />
        )
      )}
    </div>
  );
};

const GridLayout = ({ notes }: { notes: NoteProps[] }) => (
  <div className="mt-6 grid grid-cols-2 gap-4 h-full overflow-auto rounded-2xl pb-24 no-scrollbar">
    <Column notes={notes} type="even" />
    <Column notes={notes} type="odd" />
  </div>
);

function Notes() {
  const { notes, fetchingNotes, searchQuery, filteredNotes } = useNoteStore();
  const { isSearchFocused } = useGeneralStore();

  const notesToShow = filteredNotes ?? notes;

  const SHOW_NOTES = notesToShow?.length;

  return (
    <div
      className={cn(
        "h-[calc(100dvh-11.5rem)] bg-white transition-transform",
        isSearchFocused && "-translate-y-16"
      )}
    >
      <Search disabled={searchQuery ? false : !SHOW_NOTES} />
      {/* <Folders /> */}
      {!fetchingNotes ? (
        SHOW_NOTES ? (
          <GridLayout notes={notesToShow} />
        ) : (
          <EmptyNotes />
        )
      ) : (
        <Loader text="Grabbing your thoughts..." />
      )}
    </div>
  );
}

export default Notes;
