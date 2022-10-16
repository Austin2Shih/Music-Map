import { gql } from '@apollo/client';

const createUser = gql`
    mutation CreateUser($id: String!, $name: String, $city: String, $access_token: String, $refresh_token: String) {
        createUser(id: $id, name: $name, city: $city, access_token: $access_token, refresh_token: $refresh_token) {
            id
            name
            city
            location
            access_token
            refresh_token
        }
    }
`

const updateUser = gql`
    mutation UpdateUser($id: String!, $name: String, $city: String, $access_token: String, $refresh_token: String) {
        updateUser(id: $id, name: $name, city: $city, access_token: $access_token, refresh_token: $refresh_token) {
            id
            name
            city
            location
            access_token
            refresh_token
        }
    }
`

const deleteUser = gql`
    mutation DeleteUser($id: String) {
        deleteUser(name: $id)
    }
`

const getClosestUsers = gql `
    mutation GetClosestUsers($city: String!) {
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

export {getClosestUsers, createUser, updateUser, deleteUser};
