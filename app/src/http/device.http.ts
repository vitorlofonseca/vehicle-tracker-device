import axios from "axios";
import { getToken } from "../auth/auth";
import { env } from "../config/env";

const getHeaders = (devicePassword: any) => {
  return {
    headers: {
      token: getToken(devicePassword)
    }
  };
};

export const Save = (newDevice: any) => {
  let headers = getHeaders(null);
  return axios
    .post(env.device.api.url + "device", newDevice, headers)
    .then(res => {
      return res;
    });
};

export const GetDevice = (deviceMac: string, devicePassword: string) => {
  let headers = getHeaders(devicePassword);
  return axios
    .get(env.device.api.url + "device/" + deviceMac, headers)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      let error = err.response.data.data;
      if (error != "You passed a wrong MAC or password") {
        throw err;
      }
    });
};

export const StartStream = (devicePassword: string) => {
  let headers = getHeaders(devicePassword);
  return axios
    .get(env.device.api.url + "device/startStream", headers)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw err;
    });
};

export const StopStream = (devicePassword: string) => {
  let headers = getHeaders(devicePassword);
  return axios
    .get(env.device.api.url + "device/stopStream", headers)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw err;
    });
};
