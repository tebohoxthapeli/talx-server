const bcrypt = require("bcryptjs");

const { User } = require("../../../models/User");
const { Post } = require("../../../models/Post");
const Follow = require("../../../models/Follow");
const Like = require("../../../models/Like");
const Comment = require("../../../models/Comment");

const checkAuth = require("../../../util/check-auth");

let _id;

const delete_likes = async () => {
  try {
    const condition = [{ liked_by: _id }, { poster: _id }];

    condition.forEach(async (c) => {
      const hasLikes = await Like.findOne(c);

      if (hasLikes) {
        await Like.deleteMany(c);
      }
    });
  } catch (err) {
    throw new Error(err);
  }
};

const delete_comments = async () => {
  try {
    const condition = [{ commented_by: _id }, { poster: _id }];

    condition.forEach(async (c) => {
      const hasComments = await Comment.findOne(c);

      if (hasComments) {
        await Comment.deleteMany(c);
      }
    });
  } catch (err) {
    throw new Error(err);
  }
};

const delete_follows = async () => {
  try {
    const condition = [{ follow_from: _id }, { follow_to: _id }];

    condition.forEach(async (c) => {
      const hasFollows = await Follow.findOne(c);
      if (hasFollows) {
        await Follow.deleteMany(c);
      }
    });
  } catch (err) {
    throw new Error(err);
  }
};

const delete_posts = async () => {
  try {
    const condition = { posted_by: _id };
    const hasPosts = await Post.findOne(condition);

    if (hasPosts) {
      await Post.deleteMany(condition);
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  deleteUser: async (_, { password }, context) => {
    if (!password) {
      throw new UserInputError("Bad user input", {
        errors: {
          password: "Enter a password",
        },
      });
    }

    _id = checkAuth(context)._id;
    const user = await User.findById(_id);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UserInputError("Bad user input", {
        errors: { password: "Incorrect password entered" },
      });
    }

    await delete_likes();
    await delete_comments();
    await delete_follows();
    await delete_posts();
    await User.deleteOne({ _id });
    return "User account deleted successfully.";
  },
};
