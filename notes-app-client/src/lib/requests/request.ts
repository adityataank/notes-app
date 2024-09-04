import { API_KEY } from "../constants";
import { cookies } from "../cookies";

const headers = () => {
  const token = cookies.getCookie("userToken");
  const defaultHeaders = {
    "Content-Type": "application/json",
    "Api-Key": API_KEY,
  };
  return token
    ? { ...defaultHeaders, Authorization: `Bearer ${token}` }
    : defaultHeaders;
};

const handleResponse = async (res: Response) => {
  const data = await res.json();
  if (res.status === 401) {
    cookies.setCookie("userToken", "");
    return location.replace("/sign-in");
  }
  if (res.ok) {
    return data;
  }
  throw data;
};

const getRequestHandler = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: headers(),
  }).then(handleResponse);
  return response;
};

const postRequestHandler = async (url: string, payload: unknown) => {
  const response = await fetch(url, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload),
  }).then(handleResponse);
  return response;
};

export const REQUEST = {
  get: getRequestHandler,
  post: postRequestHandler,
};
