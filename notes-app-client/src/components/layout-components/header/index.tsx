import React from "react";

import DefaultHeader from "./default-header";
import NewNoteHeader from "./new-note-header";

import { HeaderProps } from "@/lib/types";
import { cn } from "@/lib/utils";

type ChildComponentValueTypes = {
  component: React.ReactNode;
  className?: string;
};

type ChildComponentTypes = {
  [key: string]: ChildComponentValueTypes;
};

function Header(props: HeaderProps) {
  const { type = "default" } = props;
  const ChildComponent: ChildComponentTypes = {
    default: {
      component: <DefaultHeader />,
      className: "",
    },
    new: {
      component: <NewNoteHeader {...props} />,
      className: "justify-start gap-6",
    },
  };

  const { component, className } = ChildComponent[type] ?? {};

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 w-full h-16 flex justify-between items-center px-7 pb-0",
        className
      )}
    >
      {component ?? <DefaultHeader />}
    </div>
  );
}

export default Header;
