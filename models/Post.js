const { models, model, Schema } = require("mongoose");

const postSchema = new Schema(
  {
    body: String,
    created_at: String,
    posted_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", postSchema);

module.exports = {
  postSchema,
  Post,
};
