const { UserInputError } = require("apollo-server");
const Follow = require("../../../models/Follow");

module.exports = {
  Query: {
    getUserFollowers: async (_, { user_id }) => {
      try {
        return await Follow.find({ follow_to: user_id })
          .sort({ created_at: -1 })
          .populate(["follow_from", "follow_to"]);
      } catch (err) {
        throw new UserInputError("Not found", {
          errors: {
            notFound: "User not found",
          },
        });
      }
    },

    getUserFollowing: async (_, { user_id }) => {
      try {
        return await Follow.find({ follow_from: user_id })
          .sort({ created_at: -1 })
          .populate(["follow_from", "follow_to"]);
      } catch (err) {
        throw new UserInputError("Not found", {
          errors: {
            notFound: "User not found",
          },
        });
      }
    },
  },
};
