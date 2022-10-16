const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const app = express();

const connection = require('./knexfile')['development'];
const db = require('knex')(connection);

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    id: String!
    name: String
    city: String
    location: String
    access_token: String
    refresh_token: String
  }

  type Query {
    findUser(id: String!): User
    getUsers: [User]
    getClosestUsers(city: String!): [User]
  }

  type Mutation {
    createUser(id: String!, name: String, city: String, location: String, access_token: String, refresh_token: String): User
    updateUser(id: String!, name: String, city: String, location: String, access_token: String, refresh_token: String): User
    deleteUser(id: String!): Boolean
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    findUser: async (_, { id }, { dataSources }) => {
      const user = await db('users').where({id}).first();
      return user? user: null;
    },
    getUsers: async () => {
      res = await db('users');
      console.log(res)
      return res;
    },
    getClosestUsers: async (_, { city }, { dataSources }) => {
      return await db('users').where({city}).limit(10);
    }
  },
  Mutation: {
    updateUser: async (_, { id, name, city, location, access_token, refresh_token }, { dataSources }) => {
      const user =  await db('users').where({id}).first();
      console.log(user)
      if (user) {
        await db('users').update({id, name, city, location, access_token, refresh_token}).where({id})
      } else {
        await db('users').insert({id, name, city, location, access_token, refresh_token})
      }
      return await db('users').where({id}).first();

    },
    createUser: async (_, { id, name, city, location, access_token, refresh_token }, { dataSources }) => {
      await db('users').insert({id, name, city, location, access_token, refresh_token})
      return await db('users').where({ id }).first();
    },
    deleteUser: async (_, { id }, { dataSources }) => {
      return await db('users').where({ id }).del();
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