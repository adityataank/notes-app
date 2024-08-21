import Image from "@/components/ui/image";

import LogoutIcon from "@/assets/logout-bulk.svg";

function DefaultHeader() {
  return (
    <>
      <h2 className="text-black text-2xl font-semibold">notable.</h2>
      <Image
        src={LogoutIcon}
        width={24}
        height={24}
        alt="logout"
        className="cursor-pointer transition-transform hover:translate-x-1"
      />
    </>
  );
}

export default DefaultHeader;
