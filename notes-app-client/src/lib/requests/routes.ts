import { API_ROOT_URL } from "../constants";

export const API_ENDPOINTS = {
  login_user: () => `${API_ROOT_URL}/auth/sign-in`,
  create_user: () => `${API_ROOT_URL}/auth/sign-up`
};
