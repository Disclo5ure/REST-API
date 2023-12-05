const { RequestError } = require("../../helpers");
const User = require("../../models/users");

const updateSub = async (req, res) => {
  const { id } = req.user;
  if (req.body.subscription) {
    if (
      req.body.subscription === "starter" ||
      req.body.subscription === "pro" ||
      req.body.subscription === "business"
    ) {
      const result = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(201).json(result);
    } else throw RequestError(400);
  } else throw RequestError(400);
};

module.exports = updateSub;
