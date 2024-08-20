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
    if (isProtectedRoute(pathname)) {
      const authToken = cookies.getCookie("authToken");
      if (!authToken) {
        // navigate("/sign-in");
      }
      setRenderOutlet(true);
    } else {
      setRenderOutlet(true);
    }
  }, [pathname, navigate, renderOutlet]);

  return <div className="h-dvh">{renderOutlet && <Outlet />}</div>;
}

export default Layout;
