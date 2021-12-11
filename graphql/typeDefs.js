const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    _id: ID!
    token: String
    username: String!
    email: String!
    joined_on: String!
    website: String!
    location: String!
    about: String!
  }

  type Post {
    _id: ID!
    body: String!
    created_at: String!
    posted_by: User!
  }

  type Comment {
    _id: ID!
    body: String!
    created_at: String!
    commented_post: Post!
    poster: User!
    commented_by: User!
  }

  type Like {
    _id: ID!
    created_at: String!
    liked_post: Post!
    poster: User!
    liked_by: User!
  }

  type Follow {
    _id: ID!
    created_at: String!
    follow_to: User!
    follow_from: User!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirm_password: String!
  }

  input Fields {
    username: String!
    email: String!
    about: String!
    location: String!
    website: String!
  }

  type Query {
    # --USER--

    getUser(user_id: ID!): User!
    searchUser(username: String!): User!
    getAllUsers: [User]!
    # --POST--

    getPost(post_id: ID!): Post! # consider removing this
    getAllPosts: [Post]!
    getUserPosts(user_id: ID!): [Post]!
    # --FOLLOW--

    getUserFollowers(user_id: ID!): [Follow]!
    getUserFollowing(user_id: ID!): [Follow]!
    # --LIKE--

    getPostLikes(post_id: ID!): [Like]!
    # --COMMENT--

    getPostComments(post_id: ID!): [Comment]!
  }

  type Mutation {
    # --USER--

    register(register_input: RegisterInput!): User!
    login(username: String!, password: String!): User!
    editUser(fields: Fields!): User!
    deleteUser(password: String!): String!
    # --POST--

    createPost(body: String!): Post!
    deletePost(post_id: ID!): String!
    # --LIKE--

    toggleLike(post_id: ID!): [Like]!
    # --FOLLOW--

    toggleFollow(user_id: ID!): [Follow]!
    # --COMMENT--

    createComment(post_id: ID!, body: String!): Comment!
    deleteComment(comment_id: ID!): String!
  }
`;
