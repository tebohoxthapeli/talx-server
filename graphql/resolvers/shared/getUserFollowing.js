const Follow = require("../../../models/Follow");

module.exports = {
  _getUserFollowing: async (user_id) => {
    return await Follow.find({ follow_from: user_id });
  },
};
