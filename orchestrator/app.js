const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { adminResolvers, adminTypeDefs } = require("./schema/adminSchema");
const { bidsResolvers, bidsTypeDefs } = require("./schema/bidSchema");
const { booksResolvers, booksTypeDefs } = require("./schema/bookSchema");
const { usersResolvers, usersTypeDefs } = require("./schema/userSchema");

const server = new ApolloServer({
  resolvers: [adminResolvers, usersResolvers, booksResolvers, bidsResolvers],
  typeDefs: [adminTypeDefs, usersTypeDefs, booksTypeDefs, bidsTypeDefs],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
  context: async ({ req, res }) => {
    const { access_token } = req.headers;
    // console.log(access_token);
    return { access_token };
  },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
