import axios from "axios";
import { BASE_URL } from "../api";

//adding interceptors for sending auth tokens before requesting of the API endpoint is private and needs tokens
const Axios = async (Method, URL, data = {}) => {
  let config = {
    method: Method,
    url: BASE_URL + URL,
    headers: {},
  };
  if (Method !== "GET") {
    Object.assign(config, { data: data });
  }
  return await axios(config);
};

export default Axios;
