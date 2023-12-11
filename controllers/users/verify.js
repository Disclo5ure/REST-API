const { RequestError } = require("../../helpers");
const User = require("../../models/users");

const verify = async (req, res) => {
  const user = await User.findOne({ verificationToken: req.params });
  if (user) {
    await User.findOneAndUpdate(
      { verificationToken: req.params },
      { verificationToken: null, verify: true },
    );
    res.status(200).json({ message: "User successfully verified" });
  } else throw RequestError(404);
};

module.exports = verify;
