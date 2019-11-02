const CryptoJS = require("crypto-js");
const env = require("../config/env");
var deviceMac = require("node-getmac");

const getToken = devicePassword => {
  let date = Date.now();
  let clearToken = deviceMac + "|" + devicePassword + "|" + date;
  return CryptoJS.AES.encrypt(clearToken, env.dashboard.api.key).toString();
};

const getTokenForDeviceCreation = () => {
  let date = Date.now();
  let clearToken = deviceMac + "|" + date;
  return CryptoJS.AES.encrypt(clearToken, env.dashboard.api.key).toString();
};

module.exports = { getToken, getTokenForDeviceCreation };
