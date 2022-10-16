import React, {useContext} from 'react'
import { BiExit } from 'react-icons/bi'
import { AuthContext } from '../App';
const SignOutButton = () => {
  const {setAuth} = useContext(AuthContext)
  const signOut = () => {
    localStorage.removeItem("user");
    setAuth(false)
  }
  return (<>
    <div>
      <button className='sign-out' onClick={signOut}><BiExit size={50} /></button>
    </div>
    <style>{`
      .sign-out {
        
      }
    `}</style>
  </>)
}

export default SignOutButton;