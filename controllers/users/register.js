const bcrypt = require("bcryptjs");
const { RequestError, sendEmail } = require("../../helpers");
const User = require("../../models/users");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw RequestError(409, "Email in use");

  const hashPass = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  await User.create({
    email,
    password: hashPass,
    avatar: gravatar.url(email),
    verificationToken,
  });

  await sendEmail(email, verificationToken);

  res.status(201).json({ email, subscription: "starter" });
};

module.exports = register;
