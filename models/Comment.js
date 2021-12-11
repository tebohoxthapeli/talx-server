const { models, model, Schema } = require("mongoose");

const commentSchema = new Schema({
  body: String,
  created_at: String,
  commented_post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  poster: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  commented_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = models.Comment || model("Comment", commentSchema);
