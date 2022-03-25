import crypto from "crypto";

const md5 = (data) => crypto.createHash("md5").update(data).digest("hex");

const to = async (promis) => {
  try {
    const data = await promis;
    return [data, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

const objToString = (obj) => JSON.stringify(obj);

const getHashedURL = (baseURL) => {
  if (!baseURL) return "";

  const MARVEL_PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;
  const MARVEL_PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;

  const ts = new Date().getTime();
  const hash = md5(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);
  const apikey = MARVEL_PUBLIC_KEY;

  return getFormatedURL({ baseURL, ts, hash, apikey });
};

const getFormatedURL = (obj) => {
  if (!obj || !obj.baseURL) return "";

  let formatedURL = obj.baseURL;
  delete obj.baseURL;

  const paramerExiists = formatedURL.indexOf("?") !== -1;

  Object.entries(obj).forEach(([key, value], index) => {
    const seprator = paramerExiists ? "&" : index ? "&" : "?";
    formatedURL += `${seprator}${key}=${value}`;
  });
  return formatedURL;
};

export { to, md5, objToString, getFormatedURL, getHashedURL };
