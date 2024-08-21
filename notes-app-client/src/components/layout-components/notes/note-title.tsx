import { NoteProps } from "@/lib/types";

function NoteTitle({ value = "", handleChange = () => {} }: NoteProps) {
  return (
    <input
      className="outline-none text-xl font-bold w-full h-9 caret-black placeholder:font-semibold"
      placeholder="Title"
      name="title"
      value={value}
      onChange={handleChange}
      spellCheck={false}
      autoFocus
    />
  );
}

export default NoteTitle;
