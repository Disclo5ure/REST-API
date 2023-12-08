const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");
const User = require("../../models/users");
const { RequestError } = require("../../helpers");

const avatarsDir = "C:\\Users\\46845\\Documents\\REST-API\\public\\avatars";

const updateAvatar = async (req, res) => {
  if (req.file) {
    const { path: tempUpload, originalname } = req.file;
    const { id } = req.user;
    const resultUpload = path.join(avatarsDir, originalname);
    await fs.rename(tempUpload, resultUpload);
    Jimp.read(originalname, (err, avatar) => {
      if (err) throw err;
      avatar.resize(250, 250);
    });
    const avatar = path.join("avatars", originalname);
    await User.findByIdAndUpdate(id, { avatarURL: avatar });
    res.status(201).json({ avatarURL: avatar });
  } else throw RequestError(400);
};

module.exports = updateAvatar;
