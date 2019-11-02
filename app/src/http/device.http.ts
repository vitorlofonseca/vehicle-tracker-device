import axios from "axios";
import { getToken } from "../auth/auth";
import { env } from "../config/env";

const getHeaders = () => {
  return {
    headers: {
      token: getToken()
    }
  };
};

export const Create = (newDevice: any) => {
  let headers = getHeaders();
  return axios
    .post(env.device.api.url + "device", newDevice, headers)
    .then(res => {
      return res;
    });
};
