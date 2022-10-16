import React, {useContext} from 'react'
import { AuthContext } from '../App';
const SignOutButton = () => {
  const {setAuth} = useContext(AuthContext)
  const signOut = () => {
    localStorage.removeItem("user");
    setAuth(false)
  }
  return (<>
    <div>
      <button onClick={signOut}>sign out</button>
    </div>
    <style>{`
    
    `}</style>
  </>)
}

export default SignOutButton;