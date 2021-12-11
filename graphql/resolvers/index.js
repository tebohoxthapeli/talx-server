const qPost = require("./post/Query");
const mPost = require("./post/Mutation");

const qUser = require("./user/Query");
const mUser = require("./user/Mutation");

const qComment = require("./comment/Query");
const mComment = require("./comment/Mutation");

const qLike = require("./like/Query");
const mLike = require("./like/Mutation");

const qFollow = require("./follow/Query");
const mFollow = require("./follow/Mutation");

module.exports = {
  Query: {
    ...qUser.Query,
    ...qPost.Query,
    ...qLike.Query,
    ...qFollow.Query,
    ...qComment.Query,
  },

  Mutation: {
    ...mUser.Mutation,
    ...mPost.Mutation,
    ...mLike.Mutation,
    ...mFollow.Mutation,
    ...mComment.Mutation,
  },
};
