const { ApolloServer } = require("apollo-server");
const { connect } = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  let env = dotenv.config({});
  if (env.error) throw env.error;
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

(async () => {
  try {
    await connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Connected to MongoDB.");

    const serverConnection = await server.listen({ port: PORT });
    console.log(`Server running at ${serverConnection.url}`);
  } catch (err) {
    console.error(err.message);
  }
})();
