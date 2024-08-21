import { Link } from "react-router-dom";

import { NoteProps } from "@/lib/types";

function Note({ id, title, content }: NoteProps) {

  return (
    <Link
      to={`/notes/${id}`}
      className={`block bg-gray-100 rounded-2xl mb-4 py-4 px-4 cursor-pointer drop-shadow`}
    >
      <div className="vertical-ellipsis">
        <h3 className="text-base font-semibold mb-2 overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </h3>
        <p className="text-sm font-medium">{content}</p>
      </div>
    </Link>
  );
}

export default Note;
