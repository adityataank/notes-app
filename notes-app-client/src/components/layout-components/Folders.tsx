import { Children } from "react";

import { FolderProps } from "@/lib/types";
import { cn } from "@/lib/utils";

const DUMMY_DATA: string[] = [
  "all",
  "pinned",
  "school",
  "project",
  "trip",
  "engineering",
  "recipes",
];

function Folders() {
  const Folder = ({ label }: FolderProps) => {
    const isSelected = label === "all";
    return (
      <div
        className={cn(
          "cursor-pointer px-[12px] border border-[#e2e2e2] rounded-lg text-xs font-semibold capitalize snap-center h-7 grid place-items-center",
          isSelected && "bg-[#2c2c2c] border-none text-white"
        )}
      >
        {label}
      </div>
    );
  };

  return (
    <div className="mt-6 flex gap-3 overflow-auto snap-mandatory snap-x no-scrollbar">
      {Children.toArray(DUMMY_DATA.map((folder) => <Folder label={folder} />))}
    </div>
  );
}

export default Folders;
