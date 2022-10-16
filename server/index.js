const express = require('express');
const fetch = require('node-fetch');

const { ApolloServer, gql } = require('apollo-server-express');
const app = express();

const connection = require('./knexfile')['development'];
const db = require('knex')(connection);
require('dotenv').config();


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    id: String!
    name: String
    city: String
    location: String
    access_token: String
    refresh_token: String
    current_song: String
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

function refreshAccessToken(id, refresh_token) {
  var details = {
    'client_id' : process.env.CLIENT_ID,
    'client_secret' : process.env.CLIENT_SECRET,
    'refresh_token': refresh_token,
    'grant_type': 'refresh_token'
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  fetch("https://accounts.spotify.com/api/token", {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body : formBody
  }).then(async (res) => {
    const data = await res.json();
    await db('users').update({access_token: data.access_token}).where({id})
  })
}

async function getCurrentSong(id, access_token, refresh_token) {
  return await fetch("https://api.spotify.com/v1/me/player?market=US", {
      headers: {
        Authorization: "Bearer " + access_token,
      }
  }).then(async (res) => {
      console.log(res)
      if (res.status == 401) {
          // refresh_token
          if (refresh_token != null) {
            refreshAccessToken(id, refresh_token);
            return await getCurrentSong();
          } else {
            return null;
          }
      } else if (res.status == 204) {
          return null;
      } else {
          const data = await res.json();
          console.log(data.item);
          return data.item.name;
      }
  })
}
// Provide resolver functions for your schema fields
const resolvers = {
  User: {
    current_song: async (user) => {
      if (user.access_token === null) {
        const dummyName = `Song# ${Math.floor(Math.random() * 10000)}`;
        return dummyName;
      } else {
        const song = await getCurrentSong(user.id, user.access_token, user.refresh_token);
        return song;
      }
    }
  }, 
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