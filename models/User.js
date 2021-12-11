const { models, model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  joined_on: String,
  website: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
});

const User = models.User || model("User", userSchema);

module.exports = {
  userSchema,
  User,
};
