const { UserInputError } = require("apollo-server");

const { Post } = require("../../../models/Post");
const Comment = require("../../../models/Comment");
const Like = require("../../../models/Like");
const checkAuth = require("../../../util/check-auth");

module.exports = {
  Mutation: {
    createPost: async (_, { body }, context) => {
      if (body.trim() === "") {
        throw new UserInputError("Bad user input", {
          errors: { post: "Post body must not be empty" },
        });
      }

      const { _id } = checkAuth(context);

      const post = new Post({
        body,
        created_at: new Date().toISOString(),
        posted_by: _id,
      });

      try {
        const res = await post.save();
        return await res.populate("posted_by");
      } catch (err) {
        throw new Error(err);
      }
    },

    deletePost: async (_, { post_id }) => {
      try {
        await Post.deleteOne({ _id: post_id });

        const condition = [
          { commented_post: post_id },
          { liked_post: post_id },
        ];

        const hasComments = await Comment.findOne(condition[0]);
        if (hasComments) {
          await Comment.deleteMany(condition[0]);
        }

        const hasLikes = await Like.findOne(condition[1]);
        if (hasLikes) {
          await Like.deleteMany(condition[1]);
        }
        return "Post deleted successfully.";
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
