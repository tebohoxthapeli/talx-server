const { UserInputError } = require("apollo-server");
const Like = require("../../../models/Like");

module.exports = {
  Query: {
    getPostLikes: async (_, { post_id }) => {
      try {
        return await Like.find({ liked_post: post_id })
          .sort({ created_at: -1 })
          .populate(["liked_by", "liked_post", "poster"]);
      } catch (err) {
        throw new UserInputError("Not found", {
          errors: {
            notFound: "Post not found",
          },
        });
      }
    },
  },
};
