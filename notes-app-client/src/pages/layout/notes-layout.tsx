import Header from "@/components/layout-components/header";
import { Outlet } from "react-router-dom";

function NotesLayout() {
  return (
    <div>
      <Header />
      <div className="p-7 pt-20 pb-0">
        <Outlet />
      </div>
    </div>
  );
}

export default NotesLayout;
