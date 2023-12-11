const express = require("express");

const router = express.Router();

const validateBody = require("../../middlewares/validateBody");

const { usersSchema } = require("../../validation");

const { ctrlWrapper } = require("../../helpers");

const ctrl = require("../../controllers/users");

const auth = require("../../middlewares/auth");

const multer = require("multer");

const tempDir = "C:\\Users\\46845\\Documents\\REST-API\\temp";

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

router.post(
  "/register",
  validateBody(usersSchema.addSchema),
  ctrlWrapper(ctrl.register),
);

router.post(
  "/login",
  validateBody(usersSchema.addSchema),
  ctrlWrapper(ctrl.login),
);

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

router.post("/verify", ctrlWrapper(ctrl.resendEmail()));

router.get("/current", auth, ctrlWrapper(ctrl.current));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

router.patch("/", auth, ctrlWrapper(ctrl.updateSub));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar),
);

module.exports = router;
