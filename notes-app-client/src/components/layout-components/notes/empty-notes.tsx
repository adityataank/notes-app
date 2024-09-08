import Image from "@/components/ui/image";

import { useNoteStore } from "@/store/note-store";

import ScribbledArrowPointerIcon from "/scribbled-arrow-pointer.svg";

const EmptyNotes = () => {
  const { searchQuery } = useNoteStore();
  const text = searchQuery ? (
    <>
      No notes found with the keyword: <u>{searchQuery}</u>
    </>
  ) : (
    <>
      Looks like you haven’t jotted anything down yet.
      <br />
      Add a note to get started!
    </>
  );
  return (
    <div className="h-[calc(100dvh-12.5rem)]  grid pt-56 ">
      <p className="text-center font-semibold text-sm text-black">{text}</p>
      {!searchQuery && (
        <Image
          src={ScribbledArrowPointerIcon}
          width={90}
          height={90}
          alt="arrow-pointer"
          className="fixed bottom-24 right-20 md:right-[calc((100vw-768px)/2+5rem)]"
        />
      )}
    </div>
  );
};

export default EmptyNotes;
