const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { RequestError } = require("../../helpers");
const User = require("../../models/users");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw RequestError(401, "Email or password wrong");

  const comparePass = bcrypt.compare(password, user.password);
  if (!comparePass) throw RequestError(401, "Email or password wrong");

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: "example@example.com",
      subscription: "starter",
    },
  });
};

module.exports = login;
