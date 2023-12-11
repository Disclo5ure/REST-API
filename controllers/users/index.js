const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const updateSub = require("./updateSub");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const resendEmail = require("./resendEmail");

module.exports = {
  register,
  login,
  logout,
  current,
  updateSub,
  updateAvatar,
  verify,
  resendEmail,
};
