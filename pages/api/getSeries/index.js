import { to, objToString, getFormatedURL, getHashedURL } from "../../../utils";
import axios from "axios";

export default async function handler(req, res) {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 20;

  const marvelApiStart = getHashedURL("https://gateway.marvel.com:443/v1/public/series");
  const requestUrl = getFormatedURL({ baseURL: marvelApiStart, offset, limit });

  const [response, error] = await to(axios.get(requestUrl));

  if (error) {
    const responseObj = { status: 500, message: "somthing wend wrong while getting the data" };
    const responseStr = objToString(responseObj);

    res.status(500).json(responseStr);
    return;
  }

  const data = response.data.data;

  res.status(200).json(data);
}
