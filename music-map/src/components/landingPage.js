import React, {useContext} from 'react'
import Home from './home';
import LoginButton from './loginButton';
import { AuthContext } from '../App'

const LandingPage = () => {
  const { auth } = React.useContext(AuthContext)
  return (
    <>
      {(!auth) ? <LoginButton></LoginButton> : <Home></Home>}
    </>
  )
}

export default LandingPage;