const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { adminResolvers, adminTypeDefs } = require("./schema/adminSchema");
const { genreResolvers, genreTypeDefs } = require("./schema/genreSchema");
const { reportResolvers, reportTypeDefs } = require("./schema/reportSchema");

const server = new ApolloServer({
  resolvers: [adminResolvers, genreResolvers, reportResolvers],
  typeDefs: [adminTypeDefs, genreTypeDefs, reportTypeDefs],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
