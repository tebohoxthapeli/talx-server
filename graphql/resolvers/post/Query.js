const { UserInputError } = require("apollo-server");

const { Post } = require("../../../models/Post");
const _getAllPosts = require("./getAllPosts");

module.exports = {
  Query: {
    getPost: async (_, { post_id }) => {
      try {
        return await Post.findById(post_id).populate("posted_by");
      } catch (err) {
        throw new UserInputError("Not found", {
          errors: {
            notFound: "Post not found",
          },
        });
      }
    },

    getAllPosts: async (_, __, context) => {
      return await _getAllPosts(context);
    },

    getUserPosts: async (_, { user_id }) => {
      try {
        return await Post.find({ posted_by: user_id }).populate("posted_by");
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
