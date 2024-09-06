import { SearchProps } from "@/lib/types";
import { toast } from "sonner";

import Image from "../ui/image";

import SearchIcon from "@/assets/search-linear.svg";
import { cn } from "@/lib/utils";

function Search({ disabled = false }: SearchProps) {
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    toast.info("Feature under development.")
  };

  return (
    <div
      className={cn(
        "w-full h-11 flex items-center rounded-xl relative border border-primary/50",
        disabled && "cursor-not-allowed bg-[#f0f0f0] shadow-none border-none"
      )}
    >
      <Image
        src={SearchIcon}
        width={20}
        height={20}
        alt="search"
        className="absolute left-4"
      />
      <input
        disabled={disabled}
        placeholder="Search for notes"
        onMouseDown={handleClick}
        className={
          "w-full h-full bg-inherit rounded-[inherit] outline-none px-14 font-medium disabled:cursor-not-allowed"
        }
        spellCheck={false}
      />
    </div>
  );
}

export default Search;
