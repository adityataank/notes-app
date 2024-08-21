import Image from "@/components/ui/image";

import BackIcon from "@/assets/back-linear.svg";
import TickIcon from "@/assets/tick.svg";

import { HeaderProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useGoBack } from "@/lib/hooks/useGoBack";

function NoteHeader({
  onBack,
  showSave = false,
  onSave = () => {},
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
      <h2 className="text-black text-base font-semibold">{title}</h2>
      <Image
        src={TickIcon}
        width={24}
        height={24}
        alt="tick"
        onClick={onSave}
        className={cn(
          "opacity-0 invisible ml-auto cursor-pointer transition-[all] duration-400",
          showSave && "opacity-100 visible"
        )}
      />
    </>
  );
}

export default NoteHeader;
