import { Outlet } from "react-router-dom"

function SecuredLayout() {
  return (
    <div className="h-dvh">
        <Outlet />
    </div>
  )
}

export default SecuredLayout