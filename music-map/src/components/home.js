import React from "react";
import SignOutButton from './signOut';

import useCurrentUser from "../hooks/getCurrentUser";

function Home() {
    const user = useCurrentUser();
    return (
        <div>
            <SignOutButton></SignOutButton>
            this is home
            {user && JSON.stringify(user)}
        </div>
    );
}
  
export default Home;