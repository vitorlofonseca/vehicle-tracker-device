const express = require("express");

const getDevice = require("../controllers/device/get");
const createDevice = require("../controllers/device/create");
const startStream = require("../controllers/metricService/startStream");
const stopStream = require("../controllers/metricService/stopStream");

const routersInit = () => {
  const router = express();
  router.get("/device/startStream", startStream());
  router.get("/device/stopStream", stopStream());
  router.post("/device", createDevice());
  router.get("/device/:macAddress", getDevice());
  return router;
};

module.exports = routersInit;
