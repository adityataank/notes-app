import Image from "../ui/image";

import SearchIcon from "@/assets/search-linear.svg";

function Search() {
  return (
    <div className="w-full h-11 flex items-center bg-[#f0f0f0] rounded-xl relative">
      <Image
        src={SearchIcon}
        width={20}
        height={20}
        alt="search"
        className="absolute left-4"
      />
      <input
        placeholder="Search for notes"
        className="w-full h-full bg-inherit rounded-[inherit] outline-none px-14 font-medium"
      />
    </div>
  );
}

export default Search;
