const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");

const usersSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
  avatarURL: String,
});
const User = model("user", usersSchema);
usersSchema.post("save", handleSaveErrors);

module.exports = User;