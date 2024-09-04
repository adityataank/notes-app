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

const getRequestHandler = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: headers(),
  }).then(async (res) => {
    const data = await res.json();
    if (res.ok) {
      return data;
    }
    throw data;
  });
  return response;
};

const postRequestHandler = async (url: string, payload: unknown) => {
    const response = await fetch(url, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(payload),
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        return data;
      }
      throw data;
    });
    return response;
};

export const REQUEST = {
  get: getRequestHandler,
  post: postRequestHandler,
};
