import { Children } from "react";

// import Folders from "../Folders";
import NewNote from "./new-note";
import Search from "../search";
import Note from "./note";

import ScribbledArrowPointerIcon from "@/assets/scribbled-arrow-pointer.svg";
import Image from "../../ui/image";

type ColumnProps = {
  type: "even" | "odd";
};

const EmptyNotes = () => (
  <div className="h-[calc(100dvh-12.5rem)]  grid pt-56 ">
    <p className=" text-center font-semibold text-sm">
      Looks like you haven’t jotted anything down yet.
      <br />
      Add a note to get started!
    </p>
    <Image
      src={ScribbledArrowPointerIcon}
      width={90}
      height={90}
      alt="arrow-pointer"
      className="fixed bottom-24 right-20"
    />
  </div>
);

const Column = ({ type }: ColumnProps) => {
  const condition = type === "odd";
  return (
    <div className="h-fit">
      {Children.toArray(
        Array(20)
          .fill(0)
          .map((_, index) => Boolean(index % 2) === condition && <Note />)
      )}
    </div>
  );
};

const SHOW_NOTES = true; // HARD CODED !!!

function Notes() {
  return (
    <div className="">
      <Search disabled={!SHOW_NOTES}/>
      {/* <Folders /> */}
      {SHOW_NOTES ? (
        <div className="mt-6 grid grid-cols-2 gap-4 overflow-auto h-[calc(100dvh-12.5rem)] rounded-2xl pb-24 no-scrollbar">
          <Column type="even" />
          <Column type="odd" />
        </div>
      ) : (
        <EmptyNotes />
      )}
      <NewNote />
    </div>
  );
}

export default Notes;
