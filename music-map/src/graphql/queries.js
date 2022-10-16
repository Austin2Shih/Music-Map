import { gql } from '@apollo/client';

const findUsers = gql`
    query FindUser($id: String!) {
        findUser(id: $id) {
            id
            name
            city
            location
            access_token
            refresh_token
        }
    }
`
const getUsers = gql`
    query {
        getUsers {
            id
            name
            city
            location
            access_token
            refresh_token
        }
    }
`

const getClosestUsers = gql `
    query GetClosestUsers($city: String!) {
        getClosestUsers(city: $city) {
            id
            name
            city
            location
            access_token
            refresh_token
        }
    }
`

export { findUsers, getClosestUsers, getUsers };