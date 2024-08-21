import { NewNoteProps } from "@/lib/types";

function NoteTitle({
  value = "",
  handleChange = () => {},
  autoFocus = false,
}: NewNoteProps) {
  return (
    <input
      className="outline-none text-xl font-bold w-full caret-black placeholder:font-semibold"
      placeholder="Title"
      name="title"
      value={value}
      onChange={handleChange}
      spellCheck={false}
      autoFocus={autoFocus}
    />
  );
}

export default NoteTitle;
