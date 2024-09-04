import { Children } from "react";

// import Folders from "../Folders";
import NewNote from "./new-note";
import Search from "../search";
import Note from "./note";
import Image from "../../ui/image";

import { useNoteStore } from "@/store/note-store";

import ScribbledArrowPointerIcon from "@/assets/scribbled-arrow-pointer.svg";
import { NoteProps } from "@/lib/types";

type ColumnProps = {
  type: "even" | "odd";
  notes: NoteProps[];
};

const EmptyNotes = () => (
  <div className="h-[calc(100dvh-12.5rem)]  grid pt-56 ">
    <p className="text-center font-semibold text-sm text-black">
      Looks like you haven’t jotted anything down yet.
      <br />
      Add a note to get started!
    </p>
    <Image
      src={ScribbledArrowPointerIcon}
      width={90}
      height={90}
      alt="arrow-pointer"
      className="fixed bottom-24 right-20 md:right-[calc((100vw-768px)/2+5rem)]"
    />
  </div>
);

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
  <div className="mt-6 grid grid-cols-2 gap-4 overflow-auto h-[calc(100dvh-12.5rem)] rounded-2xl pb-24 no-scrollbar">
    <Column notes={notes} type="even" />
    <Column notes={notes} type="odd" />
  </div>
);

function Notes() {
  const { notes, fetchingNotes } = useNoteStore();
  const SHOW_NOTES = notes?.length;
  return (
    <div className="">
      <Search disabled={!SHOW_NOTES} />
      {/* <Folders /> */}
      {!fetchingNotes ? (
        SHOW_NOTES ? (
          <GridLayout notes={notes} />
        ) : (
          <EmptyNotes />
        )
      ) : null}
      <NewNote />
    </div>
  );
}

export default Notes;
