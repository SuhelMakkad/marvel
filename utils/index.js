import crypto from "crypto";

const md5 = (data) => crypto.createHash("md5").update(data).digest("hex");

const to = async (promise) => {
  try {
    const data = await promise;
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

const getMonthName = (date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[date.getMonth()];
  return monthName;
};

const filterDuplicates = (arr, filterBy) => {
  if (!arr || !arr.length || !filterBy) return [];

  return arr.reduce((previous, current) => {
    if (previous.filter((x) => x[filterBy] === current[filterBy])[0]) return previous;

    previous.push(current);
    return previous;
  }, []);
};

export { to, md5, objToString, getFormatedURL, getHashedURL, getMonthName, filterDuplicates };
