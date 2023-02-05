import React from "react";
import UserInfoForm from "./userInfoForm";
import SideBar from "./sidebar";
import useUserLocation from "../hooks/useUserLocation";

function Home() {
    const { position, error } = useUserLocation();

    return (<>
        <div className='home-page'>
            <SideBar></SideBar>
            <div className='home-container'>
                {error &&
                    {error}
                }
                {position &&
                    <p>{JSON.stringify(position)}</p>
                }
                <h2>Check out what people are listening to!</h2>
                <UserInfoForm />
            </div>
        </div>
        <style>{`
            .home-page {
                width: 100vw;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .home-container {
                width: 100vw;
                height: 80vh;
                max-width: var(--maxWidth);
                background-color: var(--background-secondary);
                border-radius: var(--borderRadius);
                box-shadow: var(--box-shadow);
                display: flex;
                flex-direction: column;
                text-align: center;
                justify-content: center;
                gap: var(--smallSpacer);
                padding: var(--largeSpacer);
            }
        
        `}</style>
    </>

    );
}
  
export default Home;