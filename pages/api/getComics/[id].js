import { to, objToString, getHashedURL } from "../../../utils";
import axios from "axios";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ message: "Charater Id not found" });
    return;
  }

  const marvelApiStart = getHashedURL(`https://gateway.marvel.com:443/v1/public/comics/${id}`);
  const requestUrl = marvelApiStart;
  const [response, error] = await to(axios.get(requestUrl));

  if (error) {
    const responseObj = { status: 500, message: "somthing wend wrong while getting the data" };
    const responseStr = objToString(responseObj);

    res.status(500).json(responseStr);
    return;
  }

  const responseObj = response.data.data;
  const responseStr = objToString(responseObj);

  res.status(200).json(responseStr);
}
