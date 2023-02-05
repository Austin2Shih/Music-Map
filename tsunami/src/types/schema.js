import merge from 'lodash/merge.js'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { User, UserResolvers } from 'user.schema.js';

const typeDefs = [
    User,
]

const resolvers = merge(
    UserResolvers,
)

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema