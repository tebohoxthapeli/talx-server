const { UserInputError } = require("apollo-server");

const { Post } = require("../../../models/Post");
const Like = require("../../../models/Like");
const checkAuth = require("../../../util/check-auth");

module.exports = {
    Mutation: {
        toggleLike: async (_, { post_id: liked_post }, context) => {
            const { _id: liked_by } = checkAuth(context);

            try {
                const foundLike = await Like.findOne({ liked_post, liked_by }).populate([
                    "liked_post",
                    "liked_by",
                    "poster",
                ]);

                if (foundLike) {
                    await Like.deleteOne({ liked_post, liked_by });
                    return foundLike;
                } else {
                    const post = await Post.findById(liked_post, "posted_by").populate("posted_by");

                    const like = new Like({
                        created_at: new Date().toISOString(),
                        liked_post,
                        poster: post.posted_by,
                        liked_by,
                    });
                    const res = await like.save();
                    return await res.populate(["liked_by", "liked_post", "poster"]);
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
