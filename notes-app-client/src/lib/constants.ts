export const FREE_ROUTES = ["/sign-in", "/sign-up", "/reset-password"];

export const API_ROOT_URL =
  import.meta.env.VITE_MODE === "production"
    ? "https://notes-app-r64d.onrender.com/api/v1"
    : "http://localhost:8000/api/v1";

export const API_KEY = import.meta.env.VITE_API_KEY;