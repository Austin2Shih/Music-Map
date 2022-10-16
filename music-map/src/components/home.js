import React from "react";
import SignOutButton from './signOut';
import UserInfoForm from "./userInfoForm";

import useCurrentUser from "../hooks/getCurrentUser";

function Home() {
    const user = useCurrentUser();

    return (
        <div>
            <SignOutButton />
            <UserInfoForm />
        </div>
    );
}
  
export default Home;