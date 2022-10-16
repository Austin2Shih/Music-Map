import React from 'react'
import Home from './home';
import Login from './login';
import { AuthContext } from '../App'

const LandingPage = () => {
  const { auth } = React.useContext(AuthContext)
  return (
    <>
      {(!auth) ? <Login></Login> : <Home></Home>}
    </>
  )
}

export default LandingPage;