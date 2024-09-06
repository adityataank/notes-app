import { Link } from "react-router-dom";

import Image from "../../ui/image";

import AddIcon from "/add-linear.svg";

function NewNote() {
  const vibrate = () => {
    navigator.vibrate(20);
  };

  return (
    <Link
      onClick={vibrate}
      to={"/notes/new"}
      className="fixed grid place-items-center bottom-9 right-7 w-14 h-14 drop-shadow-xl shadow-xl rounded-full bg-primary cursor-pointer transition z-10 hover:bg-primary/90 md:right-[calc((100vw-768px)/2+1.75rem)]"
    >
      <Image src={AddIcon} alt="add" width={36} height={36} />
    </Link>
  );
}

export default NewNote;
