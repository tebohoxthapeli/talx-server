const { UserInputError } = require("apollo-server");

const { User } = require("../../../models/User");
const Follow = require("../../../models/Follow");
const checkAuth = require("../../../util/check-auth");

module.exports = {
    Mutation: {
        toggleFollow: async (_, { user_id: follow_to }, context) => {
            const { _id: follow_from } = checkAuth(context);

            const foundUser = await User.findById(follow_to);
            if (!foundUser) {
                throw new UserInputError("Not found", {
                    errors: {
                        notFound: "User not found",
                    },
                });
            }

            try {
                const foundFollow = await Follow.findOne({ follow_to, follow_from }).populate([
                    "follow_to",
                    "follow_from",
                ]);

                if (foundFollow) {
                    await Follow.deleteOne({ follow_to, follow_from });
                    return foundFollow;
                } else {
                    const follow = new Follow({
                        created_at: new Date().toISOString(),
                        follow_to,
                        follow_from,
                    });
                    const res = await follow.save();
                    return await res.populate(["follow_to", "follow_from"]);
                }
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};
