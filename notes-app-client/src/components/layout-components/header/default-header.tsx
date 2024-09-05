import Image from "@/components/ui/image";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { cookies } from "@/lib/cookies";
import { useNoteStore } from "@/store/note-store";

import LogoutIcon from "@/assets/logout-bulk.svg";

function DefaultHeader() {
  const navigate = useNavigate();
  const { resetNotes } = useNoteStore();
  const handleLogout = () => {
    cookies.setCookie("userToken", "");
    toast.success("Logged out successfully!");
    resetNotes();
    navigate("/sign-in");
  };

  return (
    <>
      <h2 className="text-black text-2xl font-semibold">notable.</h2>
      <Image
        src={LogoutIcon}
        width={24}
        height={24}
        alt="logout"
        className="cursor-pointer transition-transform hover:translate-x-1"
        onClick={handleLogout}
      />
    </>
  );
}

export default DefaultHeader;
