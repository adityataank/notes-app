import { NoteProps } from "@/lib/types";

function NoteContent({ value = "", handleChange = () => {} }: NoteProps) {
  return (
    <textarea
      spellCheck={false}
      placeholder="Start typing"
      name="content"
      value={value}
      onChange={handleChange}
      className="resize-none outline-none w-full h-full font-medium placeholder:font-semibold"
    />
  );
}

export default NoteContent;
