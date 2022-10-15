import { gql } from '@apollo/client';

const createUser = gql`
    mutation CreateUser($name: String, $city: String) {
        createUser(id: "fake-uuid-ree", name: $name, city: $city) {
            id
            name
            city
        }
    }
`

const deleteUser = gql`
    mutation DeleteUser($id: String) {
        deleteUser(name: $id)
    }
`

export {createUser, deleteUser};
