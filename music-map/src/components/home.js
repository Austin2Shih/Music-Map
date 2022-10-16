import React from "react";
import SignOutButton from './signOut';
import UserInfoForm from "./userInfoForm";

import useCurrentUser from "../hooks/getCurrentUser";

function Home() {
    const user = useCurrentUser();
    return (
        <div>
            <SignOutButton></SignOutButton>
            <div>this is home</div>
            <UserInfoForm />
            <div>{user && JSON.stringify(user)}</div>
        </div>
    );
}
  
export default Home;