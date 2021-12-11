const { UserInputError } = require("apollo-server");
const { User } = require("../../../models/User");

module.exports = {
  Query: {
    getUser: async (_, { user_id }) => {
      try {
        return await User.findById(user_id);
      } catch (err) {
        throw new UserInputError("Not found", {
          errors: {
            notFound: "User not found",
          },
        });
      }
    },

    searchUser: async (_, { username }) => {
      const user = await User.findOne({ username });

      if (user) {
        return user;
      }

      throw new UserInputError("Not found", {
        errors: {
          notFound: "User not found",
        },
      });
    },

    getAllUsers: async () => {
      return await User.find();
    },
  },
};
