export const FREE_ROUTES = ["/sign-in", "/sign-up", "/reset-password"];

export const API_ROOT_URL =
  import.meta.env.VITE_MODE === "production"
    ? import.meta.env.VITE_PRODUCTION_API_ROOT_URL
    : "http://localhost:8000/api/v1";

export const API_KEY = import.meta.env.VITE_API_KEY;