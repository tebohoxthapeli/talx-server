const { gql } = require("apollo-server");

module.exports = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        joined_on: String!
        website: String!
        location: String!
        about: String!
        token: String
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
        # user
        getUser(user_id: ID!): User!
        searchUser(username: String!): User!
        getAllUsers: [User]!
        # post
        getPost(post_id: ID!): Post! # consider removing this
        getAllPosts: [Post]!
        getUserPosts(user_id: ID!): [Post]!
        # follow
        getUserFollowers(user_id: ID!): [Follow]!
        getUserFollowing(user_id: ID!): [Follow]!
        # like
        getPostLikes(post_id: ID!): [Like]!
        # comment
        getPostComments(post_id: ID!): [Comment]!
    }

    type Mutation {
        # user
        register(register_input: RegisterInput!): User!
        login(username: String!, password: String!): User!
        editUser(fields: Fields!): User!
        deleteUser(password: String!): String!
        # post
        createPost(body: String!): Post!
        deletePost(post_id: ID!): String!
        # like
        toggleLike(post_id: ID!): Like!
        # follow
        toggleFollow(user_id: ID!): Follow!
        # comment
        createComment(post_id: ID!, body: String!): Comment!
        deleteComment(comment_id: ID!): String!
    }
`;
