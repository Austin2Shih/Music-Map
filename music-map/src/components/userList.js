import React from "react"

const users = ["Brandon", "Austin", "Danny"]

const ItemList = ({data}) => {
    return(
        <ul>
            {data.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    )
}

const UserList = () => {
    return (
        <div>
            <ItemList data={users} />
        </div>
    )
}

export default UserList