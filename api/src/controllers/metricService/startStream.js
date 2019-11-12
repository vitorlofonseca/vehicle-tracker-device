const { exec } = require("child_process");

const startStream = () => async (req, res, next) => {
  exec("sudo /bin/systemctl start vehicle-tracker.service", err => {
    console.log(err);
  });
  res.status(200).send("started");
};

module.exports = startStream;
