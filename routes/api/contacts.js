const express = require("express");

const ctrl = require("../../controllers/contacts");

const validateBody = require("../../middlewares/validateBody");

const { schemas } = require("../../models/contacts");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));

router.put(
  "/:id",
  validateBody(schemas.updateSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
