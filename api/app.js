const express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");

const api = require("./src/api");
const env = require("./src/config/env");

const auth = require("./src/auth/auth");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(async function(req, res, next) {
  let authentication = await auth(req, env);
  if (!authentication.success) {
    res.status(401).send(authentication.reason);
    return;
  }
  next();
});
app.use("/api/v1", api());

app.listen(env.device.api.port, function() {
  console.log("Listening on port " + env.device.api.port);
});
