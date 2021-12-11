const { UserInputError } = require("apollo-server");

const { Post } = require("../../../models/Post");
const Comment = require("../../../models/Comment");
const checkAuth = require("../../../util/check-auth");

module.exports = {
  Mutation: {
    createComment: async (_, { post_id, body }, context) => {
      try {
        const post = await Post.findById(post_id, "posted_by");
        const { _id: current_user } = checkAuth(context);

        const comment = new Comment({
          body,
          created_at: new Date().toISOString(),
          commented_post: post_id,
          poster: post.posted_by,
          commented_by: current_user,
        });
        const res = await comment.save();
        return await res.populate(["commented_by", "poster", "commented_post"]);
      } catch (err) {
        throw new UserInputError("Not found", {
          errors: {
            notFound: "Post not found",
          },
        });
      }
    },

    deleteComment: async (_, { comment_id }) => {
      try {
        await Comment.deleteOne({ _id: comment_id });
        return "Your comment was successfully deleted.";
      } catch (err) {
        throw new UserInputError("Not found", {
          errors: {
            notFound: "Comment not found",
          },
        });
      }
    },
  },
};
