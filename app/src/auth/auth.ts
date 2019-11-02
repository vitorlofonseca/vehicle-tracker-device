import * as CryptoJS from "crypto-js";
import { env } from "../config/env";

const getUrl = () => {
  return window.location.href.slice(0, window.location.href.lastIndexOf("/"));
};

export const getToken = () => {
  let url = getUrl();
  let date = Date.now();
  console.log(url);
  let clearToken = url + "|" + date;
  return CryptoJS.AES.encrypt(clearToken, env.dashboard.api.key).toString();
};
