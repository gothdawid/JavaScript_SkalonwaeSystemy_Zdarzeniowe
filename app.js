const { ApolloServer, gql } = require("apollo-server");
const { readFileSync } = require("fs");
const { resolvers } = require("./resolvers");

const server = new ApolloServer({
  typeDefs: gql`
    ${readFileSync(__dirname.concat("/schema.graphql"), "utf8")}
  `,
  resolvers,
  playground: true,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
