const { models, model, Schema } = require("mongoose");

const likeSchema = new Schema({
  created_at: String,
  liked_post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  poster: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  liked_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = models.Like || model("Like", likeSchema);
