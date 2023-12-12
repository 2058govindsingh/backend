const base64 = require("base-64");

function decodeCredentials(authHeader) {
  const encodedCredentials = authHeader.trim().replace(/Basic\s+/i, "");
  const decodeCredentials = base64.decode(encodedCredentials);
  console.log(decodeCredentials);
  return decodeCredentials.split(":");
}

module.exports = {
  decodeCredentials,
};
