import { FREE_ROUTES } from "./constants";

export const isProtectedRoute = (route: string = ""): boolean => {
  return !FREE_ROUTES.includes(route);
};
