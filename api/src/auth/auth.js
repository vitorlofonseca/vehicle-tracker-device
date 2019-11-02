const CryptoJS = require("crypto-js");
const FIELDS_IN_TOKEN = 2;
const TOKEN_SHELF_LIFE_MILISECONDS = 60000;
const env = require("../config/env");

function explodeToken(token) {
  let data = token.split("|");
  if (data.length != FIELDS_IN_TOKEN) {
    return {
      error:
        "The token must have the origin of request and a date, representing the moment of token's generation"
    };
  }
  return data;
}

function getOriginRequestByToken(token) {
  return explodeToken(token)[0];
}

function getDateByToken(token) {
  return explodeToken(token)[1];
}

function tokenTimeIsCurrent(generationDateToken) {
  let minimumDate = Date.now() - TOKEN_SHELF_LIFE_MILISECONDS;
  let maximumDate = Date.now();

  if (
    generationDateToken <= maximumDate &&
    generationDateToken >= minimumDate
  ) {
    return true;
  }
  return false;
}

function originIsAllowed(origin) {
  let allowedOrigins = env.device.allowedOrigins;
  if (allowedOrigins.indexOf(origin) > -1) {
    return true;
  }
  return false;
}

const auth = async (req, env) => {
  let turnoff_auth = env.device.api.turnoff_auth;
  let api_key = env.device.api.key;

  if (turnoff_auth) {
    return { success: true };
  }

  let cipherToken = req.headers.token;

  let tokenBytes = CryptoJS.AES.decrypt(cipherToken, api_key);
  let plainToken = tokenBytes.toString(CryptoJS.enc.Utf8);

  let whyTokenHasAWrongFormat = explodeToken(plainToken).error;

  if (whyTokenHasAWrongFormat) {
    return { success: false, reason: whyTokenHasAWrongFormat };
  }

  let originRequest = getOriginRequestByToken(plainToken);

  if (!originIsAllowed(originRequest)) {
    return { success: false, reason: "Origin is not allowed" };
  }

  let generationDateToken = getDateByToken(plainToken);

  if (!tokenTimeIsCurrent(generationDateToken)) {
    return {
      success: false,
      reason:
        "A token is valid through " +
        TOKEN_SHELF_LIFE_MILISECONDS / 1000 +
        " seconds. You must create another token"
    };
  }

  return { success: true };
};

module.exports = auth;
