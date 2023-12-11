const User = require("../../models/users");
const { sendEmail } = require("../../helpers");

const resendEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) res.status(400).json({ message: "Missing required field email" });
  const user = await User.findOne({ email });
  if (!user.verify) await sendEmail(email, user.verificationToken);
  else
    res.status(400).json({ message: "Verification has already been passed" });
};

module.exports = resendEmail;
