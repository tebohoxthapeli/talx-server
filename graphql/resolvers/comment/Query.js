const { UserInputError } = require("apollo-server");
const Comment = require("../../../models/Comment");

module.exports = {
  Query: {
    getPostComments: async (_, { post_id }) => {
      try {
        return await Comment.find({ commented_post: post_id })
          .sort({ created_at: -1 })
          .populate(["commented_by", "commented_post", "poster"]);
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
