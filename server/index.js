const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const app = express();

const connection = require('./knexfile')['development'];
const db = require('knex')(connection);

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    uuid: ID
    name: String
    location: String
  }

  type Query {
    getUsers: [User]
  }

  type Mutation {
    createUser(id: String!, name: String, location: String): User
    deleteUser(name: String): Boolean
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    getUsers: async () => {
      res = await db('users');
      console.log(res)
      return res;
    },
  },
  Mutation: {
    createUser: async (_, { location, name }, { dataSources }) => {
      await db('users').insert({name, location})
      return await db('users').where({name: name}).first();
    },
    deleteUser: async (_, { name }, { dataSources }) => {
      return await db('users').where({name}).del();
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(res => {
  server.applyMiddleware({ app });
})

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})