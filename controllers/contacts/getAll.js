const Contact = require("../../models/contacts");

const getAll = async (req, res) => {
  let result = await Contact.find();
  if (req.query) {
    if (req.query.favorite !== undefined) {
      result = result.filter(
        (elem) => elem.favorite.toString() === req.query.favorite
      );
    } else if (req.query.limit !== undefined) {
      const { page = 1, limit } = req.query;
      result = result.slice(
          (page - 1) * limit,
          (page - 1) * limit + limit
      );
    }
  }
  res.json(result);
};

module.exports = getAll;
