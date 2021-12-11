const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
  validateEditUser,
} = require("../../../util/validators");

const { User } = require("../../../models/User");
const { deleteUser } = require("./deleteUser");
const { SECRET_KEY } = require("../../../config");
const checkAuth = require("../../../util/check-auth");

const generateToken = ({ _id, username, email }) => {
  return jwt.sign(
    {
      _id,
      username,
      email,
    },
    SECRET_KEY,
    { expiresIn: "12h" }
  );
};

module.exports = {
  Mutation: {
    deleteUser,
    register: async (_, { register_input }) => {
      let { username, email, password, confirm_password } = register_input;

      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirm_password
      );
      if (!valid) throw new UserInputError("Bad user input", { errors });

      const foundUsername = await User.find({ username }, "username");
      if (foundUsername.length > 0) {
        throw new UserInputError("Bad user input", {
          errors: { username: "This username has already been taken" },
        });
      }

      const foundEmail = await User.find({ email }, "email");
      if (foundEmail.length > 0) {
        throw new UserInputError("Bad user input", {
          errors: { email: "This email address has already been taken" },
        });
      }

      password = await bcrypt.hash(password, 12);

      const user = new User({
        username,
        email,
        password,
        joined_on: new Date().toISOString(),
      });

      const res = await user.save();
      const token = generateToken(res);

      return {
        ...res._doc,
        token,
      };
    },

    login: async (_, { username, password }) => {
      const { valid, errors } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Bad user input", { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        throw new UserInputError("User not found", {
          errors: { username: "User not found" },
        });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match)
        throw new UserInputError("Bad user input", {
          errors: { password: "Incorrect password entered" },
        });

      const token = generateToken(user);

      return {
        ...user._doc,
        token,
      };
    },

    editUser: async (_, { fields }, context) => {
      const {
        username: oldUsername,
        email: oldEmail,
        _id,
      } = checkAuth(context);

      const { username, email, about, location, website } = fields;
      const { valid, errors } = validateEditUser(username, email);

      if (!valid) throw new UserInputError("Bad user input", { errors });

      const duplicates = {};

      if (oldUsername !== username) {
        const found = await User.findOne({ username }, "username");
        if (found) duplicates.username = "This username has already been taken";
      }

      if (oldEmail !== email) {
        const found = await User.findOne({ email }, "email");
        if (found)
          duplicates.email = "This email address has already been taken";
      }

      if (Object.keys(duplicates).length > 0) {
        throw new UserInputError("Bad user input", {
          errors: {
            ...duplicates,
          },
        });
      }

      const user = await User.findById(_id);

      user.username = username;
      user.email = email;
      user.about = about;
      user.location = location;
      user.website = website;

      const res = await user.save();
      const token = generateToken(res);

      return {
        ...res._doc,
        token,
      };
    },
  },
};
