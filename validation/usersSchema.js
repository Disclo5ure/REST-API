const Joi = require("joi");

const addSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const schemas = { addSchema };

module.exports = schemas;
