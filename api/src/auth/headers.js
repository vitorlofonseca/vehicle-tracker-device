const dashboardAuth = require("./dashboardAuth");

const getDashboardHeader = devicePassword => {
  let token = null;
  if (devicePassword) {
    token = dashboardAuth.getToken(devicePassword);
  } else {
    token = dashboardAuth.getTokenForDeviceCreation();
  }

  return {
    headers: {
      token
    }
  };
};

module.exports = getDashboardHeader;
