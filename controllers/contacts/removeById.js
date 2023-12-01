const { Contact } = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw RequestError(404);
  }
  res.json({ message: "Deleted successfully" });
};

module.exports = removeById;
