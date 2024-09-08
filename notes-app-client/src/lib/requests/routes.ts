import { API_ROOT_URL } from "../constants";

export const API_ENDPOINTS = {
  login_user: () => `${API_ROOT_URL}/auth/sign-in`,
  create_user: () => `${API_ROOT_URL}/auth/sign-up`,
  notes: () => `${API_ROOT_URL}/notes`,
  note: (id: string) => `${API_ROOT_URL}/notes/${id}`,
  search_notes: (q: string) => `${API_ROOT_URL}/notes/search?q=${q}`,
};
