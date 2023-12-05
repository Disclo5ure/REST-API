const express = require("express");

const ctrl = require("../../controllers/contacts");

const validateBody = require("../../middlewares/validateBody");

const { contactsSchema } = require("../../validation");

const { ctrlWrapper } = require("../../helpers");

const auth = require("../../middlewares/auth");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:id", auth, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  auth,
  validateBody(contactsSchema.addSchema),
  ctrlWrapper(ctrl.add)
);

router.put(
  "/:id",
  auth,
  validateBody(contactsSchema.updateSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  auth,
  validateBody(contactsSchema.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:id", auth, ctrlWrapper(ctrl.removeById));

module.exports = router;
