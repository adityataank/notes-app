import { Children } from "react";
import Folders from "./Folders";
import NewNote from "./new-note";
import Search from "./search";
import Note from "./note";

type ColumnProps = {
  type: "even" | "odd";
};

const Column = ({ type }: ColumnProps) => {
  const condition = type === "odd";
  return (
    <div className="h-fit">
      {Children.toArray(
        Array(20)
          .fill(0)
          .map(
            (_, index) =>
              Boolean(index % 2) === condition && <Note />
          )
      )}
    </div>
  );
};

function Notes() {
  return (
    <div className="">
      <Search />
      <Folders />
      <div className="mt-6 grid grid-cols-2 gap-4 overflow-auto h-[calc(100dvh-12.5rem)] rounded-2xl pb-24 no-scrollbar">
        <Column type="even" />
        <Column type="odd" />
      </div>
      <NewNote />
    </div>
  );
}

export default Notes;
