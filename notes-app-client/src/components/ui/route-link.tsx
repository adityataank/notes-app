import { Link } from "react-router-dom";
import { LinkProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Analytics } from "@/lib/analytics";

function RouteLink({ path, children, className, ...rest }: LinkProps) {
  const handleClick = () => {
    Analytics.track("link-click", {
      name: children,
      next_path: path,
    });
  };

  return (
    <Link
      to={path}
      onClick={handleClick}
      className={cn("text-black underline font-semibold text-xs", className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default RouteLink;
