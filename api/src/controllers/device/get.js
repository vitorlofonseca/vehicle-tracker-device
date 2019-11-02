const macAddr = require("node-getmac");
const axios = require("axios");
const env = require("../../config/env");
const getDashboardHeader = require("../../auth/headers");
const JSON = require("circular-json");

const get = () => async (req, res, nex) => {
  let devicePassword = req.body.devicePassword;
  let deviceMac = req.params.macAddress;

  if (deviceMac != macAddr) {
    res.status(400).send("MAC Address passed is different of catched");
    return;
  }

  let headers = getDashboardHeader(devicePassword);

  await axios
    .get(env.dashboard.api.url + "device/" + deviceMac, headers)
    .then(dashboardRes => {
      res.status(200).send(dashboardRes.data);
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err.response));
    });
};

module.exports = get;
