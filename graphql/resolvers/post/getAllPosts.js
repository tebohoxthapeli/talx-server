const { Post } = require("../../../models/Post");
const Follow = require("../../../models/Follow");
const checkAuth = require("../../../util/check-auth");

const getFollowingPosts = (userFollowing) => {
  return new Promise(async (resolve, reject) => {
    const followingPosts = [];

    for (let following of userFollowing) {
      const posts = await Post.find({
        posted_by: following.follow_to,
      }).populate("posted_by");

      followingPosts.push(...posts);
    }

    resolve(followingPosts);
    reject(new Error("something went wrong in getFollowingPosts"));
  });
};

const sortPosts = (allPosts) => {
  return allPosts.sort(
    (post1, post2) => new Date(post2.createdAt) - new Date(post1.createdAt)
  );
};

const _getAllPosts = async (context) => {
  let allPosts = [];
  const { _id: current_user } = checkAuth(context);

  try {
    const currentUserPosts = await Post.find({ posted_by: current_user }).populate("posted_by");
    allPosts.push(...currentUserPosts);

    const userFollowing = await Follow.find({ follow_from: current_user }, "follow_to");
    const followingPosts = await getFollowingPosts(userFollowing);
    allPosts.push(...followingPosts);
    return sortPosts(allPosts);
  }
  catch (err) {
    throw new Error(err);
  }
};

module.exports = _getAllPosts;
