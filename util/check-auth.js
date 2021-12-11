const { AuthenticationError } = require("apollo-server");
const { verify } = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;
console.log("SECRET KEY" + SECRET_KEY);

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];

    if (token) {
      try {
        return verify(token, SECRET_KEY); // returns the current user
      } catch (err) {
        throw new AuthenticationError("Invalid/expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]'");
  }
  throw new Error("Authorization header must be provided");
};
