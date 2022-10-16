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
            current_song
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
            current_song
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
            current_song
        }
    }
`

export { findUsers, getClosestUsers, getUsers };