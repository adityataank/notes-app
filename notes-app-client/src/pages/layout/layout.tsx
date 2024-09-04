import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { isProtectedRoute } from "@/lib/auth";
import { cookies } from "@/lib/cookies";

function Layout() {
  const [renderOutlet, setRenderOutlet] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (renderOutlet) {
      return;
    }
    const userToken = cookies.getCookie("userToken");
    if (isProtectedRoute(pathname)) {
      if (!userToken) {
        navigate("/sign-in");
      }
    } else {
      if (userToken) {
        navigate("/notes");
      }
    }
    setRenderOutlet(true);
  }, [pathname, navigate, renderOutlet]);

  return (
    <div className="h-dvh max-w-3xl mx-auto md:border md:border-x-primary/20">
      {renderOutlet && <Outlet />}
    </div>
  );
}

export default Layout;
