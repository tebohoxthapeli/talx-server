const { UserInputError } = require("apollo-server");

const { Post } = require("../../../models/Post");
const Like = require("../../../models/Like");
const checkAuth = require("../../../util/check-auth");

module.exports = {
  Mutation: {
    toggleLike: async (_, { post_id: liked_post }, context) => {
      const { _id: liked_by } = checkAuth(context);

      try {
        const foundLike = await Like.findOne({ liked_post, liked_by });
        if (foundLike) {
          await Like.deleteOne({ liked_post, liked_by });
          return [];
        } else {
          const post = await Post.findById(liked_post, "posted_by").populate(
            "posted_by"
          );

          const like = new Like({
            created_at: new Date().toISOString(),
            liked_post,
            poster: post.posted_by,
            liked_by,
          });
          const res = await like.save();
          return [await res.populate(["liked_by", "liked_post"])];
        }
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
