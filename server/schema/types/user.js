export const User = `
  type User {
    id: String!
    name: String
    city: String
    access_token: String
    refresh_token: String
    current_song: String
    latitude: Float
    longitude: Float
  }

  type Query {
    findUser(id: String!): User
    getUsers: [User]
    getClosestUsers(id: String!): [User]
  }

  type Mutation {
    createUser(id: String!, name: String, city: String, latitude: Float, longitude: Float, access_token: String, refresh_token: String): User
    updateUser(id: String!, name: String, city: String, latitude: Float, longitude: Float, access_token: String, refresh_token: String): User
    deleteUser(id: String!): Boolean
  }
`;