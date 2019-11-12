/**
 * Called frequently by the service
 * It has no relationship with device API
 *
 */

const axios = require("axios");
const env = require("../../config/env");
const getDashboardHeader = require("../../auth/headers");
const macAddr = require("node-getmac");
const getMetrics = require("../../obd/reader");

const getBody = () => {
  return {
    macAddress: macAddr,
    metrics: getMetrics()
  };
};

let headers = getDashboardHeader(null);

axios
  .post(env.dashboard.api.url + "metric", getBody(), headers)
  .then(dashboardRes => {
    console.log("sent");
  })
  .catch(err => {
    throw err;
  });
