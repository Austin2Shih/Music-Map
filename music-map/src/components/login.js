import React from 'react'
import LoginButton from './loginButton';
const Login = () => {
  return (<>
    <div className='login-page'>
      <div className='login-container'>
        <h2>Welcome to Musicmaps</h2>
        <LoginButton></LoginButton>
      </div>
    </div>

    <style>{`
      .login-page {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .login-container {
        width: 100vw;
        height: 100vh;
        max-width: var(--maxWidth);
        max-height: var(--maxHeight);
        background-color: var(--background-secondary);
        border-radius: var(--borderRadius);
        box-shadow: var(--box-shadow);
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        gap: var(--largeSpacer);
      }
    `}</style>
  </>)
}

export default Login;