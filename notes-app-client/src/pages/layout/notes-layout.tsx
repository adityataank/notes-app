import { Outlet } from "react-router-dom";

function NotesLayout() {
  return (
    <div className="h-full">
      <div className="p-7 pt-20 pb-0 h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default NotesLayout;
