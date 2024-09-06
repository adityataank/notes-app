import { Link } from "react-router-dom";

import { NoteProps } from "@/lib/types";

import { useNoteStore } from "@/store/note-store";

function Note(props: NoteProps) {
  const { id, title, content } = props;

  const { setSelectedNote } = useNoteStore();

  const handleClick = () => {
    setSelectedNote(props);
  };

  return (
    <Link
      to={`/notes/${id}`}
      onClick={handleClick}
      className={`block bg-gray-100 rounded-2xl mb-4 py-4 px-4 cursor-pointer drop-shadow`}
    >
      <div className="vertical-ellipsis">
        <h3 className="text-base font-semibold mb-2 overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </h3>
        <p className="text-sm font-medium whitespace-pre-line">{content}</p>
      </div>
    </Link>
  );
}

export default Note;
