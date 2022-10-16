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
    <div className='sign-out-wrapper'>
      <button className='sign-out' onClick={signOut}><BiExit size={40} /></button>
    </div>
    <style>{`
      .sign-out {
        right: 3rem;
        top: 3rem;
        background-color: var(--loginButtonBackground);
        border: none;
        border-radius: var(--borderRadius);
        color: var(--text-secondary);
      }
    `}</style>
  </>)
}

export default SignOutButton;