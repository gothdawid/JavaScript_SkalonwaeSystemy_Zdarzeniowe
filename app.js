const { ApolloServer, gql } = require("apollo-server");
const { readFileSync } = require("fs");
const { resolvers } = require("./resolvers");

const cors = require('cors')
const { json }  = require('body-parser')
const express  = require('express')

const app = express();

const server = new ApolloServer({
  typeDefs: gql`
    ${readFileSync(__dirname.concat("/schema.graphql"), "utf8")}
  `,
  resolvers,
  playground: false,
});

server.start();

app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(server));

/*
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

*/