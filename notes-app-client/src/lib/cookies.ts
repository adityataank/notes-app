const getCookie = (cookie: string) => {
  const cookies = document.cookie;
  const cookiesObj: { [key: string]: string } = {};
  cookies.split(";").map((item) => {
    const [key, value]: string[] = item.split("=");
    cookiesObj[key] = value;
  });
  return cookiesObj[cookie];
};

const setCookie = (cookie: string, value: string) => {
    document.cookie = `${cookie}=${value}`
};

export const cookies = {
  getCookie,
  setCookie,
};
