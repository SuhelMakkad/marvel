import { to, objToString, getFormatedURL, getHashedURL } from "../../utils";
import axios from "axios";

export default async function handler(req, res) {
  const offset = req.query.offset || 10;
  const limit = req.query.limit || 10;

  const marvelApiStart = getHashedURL("https://gateway.marvel.com:443/v1/public/characters");
  const requestUrl = getFormatedURL({ baseURL: marvelApiStart, offset, limit });
  const [response, error] = await to(axios.get(requestUrl));

  if (error) {
    const responseObj = { status: 500, message: "somthing wend wrong while getting the data" };
    res.status(400).json(objToString(responseObj));
    return;
  }

  const data = response.data.data;

  res.status(200).json(objToString(data));
}
