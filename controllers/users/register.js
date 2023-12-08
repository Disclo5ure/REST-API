const bcrypt = require("bcryptjs");
const { RequestError } = require("../../helpers");
const User = require("../../models/users");
const gravatar = require('gravatar');

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw RequestError(409, "Email in use");

  const hashPass = await bcrypt.hash(password, 10);

  await User.create({ email, password: hashPass, avatar: gravatar.url(email) });
  res.status(201).json({ email, subscription: "starter" });
};

module.exports = register;
