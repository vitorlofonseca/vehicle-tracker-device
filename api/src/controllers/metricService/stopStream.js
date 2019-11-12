const { exec } = require("child_process");

const stopStream = () => async (req, res, next) => {
  exec("sudo /bin/systemctl stop vehicle-tracker.service", err => {
    console.log(err);
  });
  res.status(200).send("stopped");
};

module.exports = stopStream;
