import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Image from "../ui/image";
import LogoutIcon from "@/assets/logout-bulk.svg";
import BackIcon from "@/assets/back-linear.svg";

import { cn } from "@/lib/utils";

type ChildComponentValueTypes = {
  component: React.ReactNode;
  className?: string;
};

type ChildComponentTypes = {
  [key: string]: ChildComponentValueTypes;
};

function Header() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const ChildComponent: ChildComponentTypes = {
    notes: {
      component: (
        <>
          <h2 className="text-black text-2xl font-semibold">notable.</h2>
          <Image
            src={LogoutIcon}
            width={24}
            height={24}
            alt="logout"
            className="cursor-pointer"
          />
        </>
      ),
      className: "",
    },
    new: {
      component: (
        <>
          <Image
            src={BackIcon}
            width={20}
            height={20}
            alt="logout"
            className="cursor-pointer"
            onClick={goBack}
          />
          <h2 className="text-black text-base font-semibold">Add a new note</h2>
        </>
      ),
      className: "justify-start gap-6",
    },
  };

  const { pathname } = useLocation();
  const pathKey = pathname.split("/").at(-1) ?? "notes";

  const { component, className } = ChildComponent[pathKey];
  return (
    <div
      className={cn(
        "fixed top-0 w-full h-16 flex justify-between items-center px-7 pb-0",
        className
      )}
    >
      {component}
    </div>
  );
}

export default Header;
