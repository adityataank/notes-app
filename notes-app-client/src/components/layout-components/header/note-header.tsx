import Image from "@/components/ui/image";

import BackIcon from "@/assets/back-linear.svg";
import TickIcon from "@/assets/tick.svg";
import DeleteIcon from "@/assets/trash-bulk.svg";

import { HeaderProps } from "@/lib/types";

import { useGoBack } from "@/lib/hooks/useGoBack";
import SpinnerIcon from "@/components/icon/spinner";

function NoteHeader({
  onBack,
  showSave = false,
  showDelete = false,
  onSave = () => {},
  onDelete = () => {},
  title = "",
  showLoader = false,
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
      {showSave ? (
        showLoader ? (
          <SpinnerIcon color="#000000" size={24} />
        ) : (
          <Image
            src={TickIcon}
            width={24}
            height={24}
            alt="tick"
            onClick={onSave}
            className="cursor-pointer"
          />
        )
      ) : null}
    </>
  );
}

export default NoteHeader;
