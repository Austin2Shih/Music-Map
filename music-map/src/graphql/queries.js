import { gql } from '@apollo/client';

const getUsers = gql`
    query {
        getUsers {
            id
            name
            location
        }
    }
`

const getClosestUsers = gql `
    query GetClosestUsers($city: String!) {
        getClosestUsers(city: $city) {
            id
            name
            city
            spotify_token
        }
    }
`

export { getClosestUsers, getUsers };