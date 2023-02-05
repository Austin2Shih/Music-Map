import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// import schema from './types/schema';


import merge from 'lodash/merge.js'
// import { makeExecutableSchema } from '@graphql-tools/schema'
import { User, UserResolvers } from '../src/types/user.schema.js';

const typeDefs = [
    User,
]

const resolvers = merge(
    UserResolvers,
)

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
    listen: { port : 4000 },
});

console.log(`🚀  Server ready at: ${ url }`);