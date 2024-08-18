import { InputProps } from "@/lib/types";
import Image from "./image";

function Input(props: InputProps) {
  const { icon = "", ...rest } = props;
  return (
    <div className="flex items-center border border-black rounded-xl w-full h-14 overflow-hidden relative">
      {icon && (
        <Image
          src={icon}
          width={24}
          height={24}
          alt="user-icon"
          className="absolute left-4"
        />
      )}
      <input
        className="h-full w-full outline-none px-14 text-sm font-semibold rounded-xl"
        {...rest}
      />
    </div>
  );
}

export default Input;
