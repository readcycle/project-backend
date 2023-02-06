const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { adminResolvers, adminTypeDefs } = require("./schema/adminSchema");

const server = new ApolloServer({
  resolvers: [adminResolvers],
  typeDefs: [adminTypeDefs],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
