const { models, model, Schema } = require("mongoose");

const followSchema = new Schema({
  created_at: String,
  follow_to: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  follow_from: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = models.Follow || model("Follow", followSchema);
