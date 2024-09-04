import Image from "@/components/ui/image";

import BackIcon from "@/assets/back-linear.svg";
import TickIcon from "@/assets/tick.svg";
import DeleteIcon from "@/assets/trash-bulk.svg";

import { HeaderProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useGoBack } from "@/lib/hooks/useGoBack";

function NoteHeader({
  onBack,
  showSave = false,
  showDelete = false,
  onSave = () => {},
  onDelete = () => {},
  title = "",
}: HeaderProps) {
  const back = useGoBack();

  const goBack = () => (onBack ? onBack() : back());

  return (
    <>
      <Image
        src={BackIcon}
        width={24}
        height={24}
        alt="logout"
        className="cursor-pointer"
        onClick={goBack}
      />
      <h2 className="text-black text-base font-semibold mr-auto">{title}</h2>
      {showDelete && (
        <Image
          src={DeleteIcon}
          width={24}
          height={24}
          alt="tick"
          onClick={onDelete}
          className="ml-auto cursor-pointer"
        />
      )}
      <Image
        src={TickIcon}
        width={24}
        height={24}
        alt="tick"
        onClick={onSave}
        className={cn(
          "opacity-0 invisible cursor-pointer transition-[all] translate-y-2 duration-400 hidden",
          showSave && "opacity-100 visible translate-y-0 block"
        )}
      />
    </>
  );
}

export default NoteHeader;
