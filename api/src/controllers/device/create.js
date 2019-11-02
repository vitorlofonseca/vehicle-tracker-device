const macAddr = require("node-getmac");
const axios = require("axios");
const env = require("../../config/env");
const getDashboardHeader = require("../../auth/headers");

function validateNewDevice(newDevice) {
  if (!newDevice.password) {
    return "Invalid password";
  }

  if (!newDevice.inUse) {
    return "You must pass an 'inUse' password flag";
  }

  if (!newDevice.vehicle) {
    return "You must pass a vehicle associated to device";
  }

  if (!newDevice.vehicle.manufacturer) {
    return "The vehicle associated to device must have a manufacturer";
  }

  if (!newDevice.vehicle.model) {
    return "The vehicle associated to device must have a model";
  }

  if (!newDevice.vehicle.year) {
    return "The vehicle associated to device must have a year";
  }

  if (!newDevice.vehicle.plate) {
    return "The vehicle associated to device must have a plate";
  }
}

const save = () => async (req, res, nex) => {
  let newDevice = req.body.device;
  let whyNewDeviceIsInvalid = validateNewDevice(newDevice);

  if (whyNewDeviceIsInvalid) {
    res.status(400).send(whyNewDeviceIsInvalid);
  }

  newDevice.macAddress = macAddr;

  let headers = getDashboardHeader(null);

  axios
    .post(env.dashboard.api.url + "device", newDevice, headers)
    .then(dashboardRes => {
      res.status(200).send(newDevice);
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err.response));
    });
};

module.exports = save;
