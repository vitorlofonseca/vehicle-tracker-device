import * as CryptoJS from "crypto-js";
import { env } from "../config/env";

const getUrl = () => {
  return window.location.href.slice(0, window.location.href.lastIndexOf("/"));
};

export const getToken = (devicePassword: any) => {
  let url = getUrl();
  let date = Date.now();
  let clearToken = url + "|" + date;
  if (devicePassword) {
    clearToken += "|" + devicePassword;
  }
  return CryptoJS.AES.encrypt(clearToken, env.dashboard.api.key).toString();
};
