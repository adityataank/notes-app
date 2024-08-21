import { NewNoteProps } from "@/lib/types";

function NoteContent({
  value = "",
  handleChange = () => {},
  autoFocus = false,
}: NewNoteProps) {
  return (
    <textarea
      spellCheck={false}
      placeholder="Start typing"
      name="content"
      value={value}
      onChange={handleChange}
      autoFocus={autoFocus}
      className="resize-none outline-none w-full h-full font-medium placeholder:font-semibold"
    />
  );
}

export default NoteContent;
