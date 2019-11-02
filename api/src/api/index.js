const express = require("express");

const getDevice = require("../controllers/device/get");
const createDevice = require("../controllers/device/create");

const routersInit = () => {
  const router = express();
  router.post("/device", createDevice());
  return router;
};

module.exports = routersInit;
