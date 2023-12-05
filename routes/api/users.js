const express = require("express");

const router = express.Router();

const validateBody = require("../../middlewares/validateBody");

const { usersSchema } = require("../../validation");

const { ctrlWrapper } = require("../../helpers");

const ctrl = require("../../controllers/users");

const auth = require("../../middlewares/auth");

router.post(
  "/register",
  validateBody(usersSchema.addSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(usersSchema.addSchema),
  ctrlWrapper(ctrl.login)
);

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.current));

router.patch("/", auth, ctrlWrapper(ctrl.updateSub));

module.exports = router;
