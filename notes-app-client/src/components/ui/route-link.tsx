import { LinkProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

function RouteLink({ path, children, className, ...rest }: LinkProps) {
  return (
    <Link
      to={path}
      className={cn("text-black underline font-semibold text-xs", className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default RouteLink;
