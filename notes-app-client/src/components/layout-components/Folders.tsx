import { Children } from "react";
import { Link, useParams } from "react-router-dom";

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
  const { folder } = useParams();
  const Folder = ({ label }: FolderProps) => {
    const isSelected = folder ? label === folder : label === "all";
    return (
      <Link
        replace
        to={`/notes/folder/${label}`}
        className={cn(
          "cursor-pointer px-[12px] border border-[#e2e2e2] rounded-lg text-xs font-semibold capitalize snap-center h-7 grid place-items-center",
          isSelected && "bg-primary border-none text-white"
        )}
      >
        {label}
      </Link>
    );
  };

  return DUMMY_DATA.length ? (
    <div className="mt-6 flex gap-3 overflow-auto snap-mandatory snap-x no-scrollbar">
      {Children.toArray(DUMMY_DATA.map((folder) => <Folder label={folder} />))}
    </div>
  ) : null;
}

export default Folders;
