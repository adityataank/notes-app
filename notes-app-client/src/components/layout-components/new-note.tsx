import { Link } from "react-router-dom";

import Image from "../ui/image";

import AddIcon from "@/assets/add-linear.svg";

function NewNote() {
  return (
    <Link
      to={"/notes/new"}
      className="fixed grid place-items-center bottom-9 right-7 w-14 h-14 drop-shadow-xl shadow-xl rounded-full bg-[#2d2d2d] cursor-pointer transition z-10 hover:bg-[#1d1d1d]"
    >
      <Image src={AddIcon} alt="add" width={36} height={36} />
    </Link>
  );
}

export default NewNote;
