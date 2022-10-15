import React from 'react'
import { client_info } from './config'

const client_id = client_info[0]
const redirect_uri = "http://localhost:3000"

function handleLogin() {
    let url = "https://accounts.spotify.com/authorize"
    url += "?client_id=" + client_id
    url += "&response_type=code"
    url += "&redirect_uri=" + encodeURI(redirect_uri)
    url += "&show_dialog=true"
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private"
    window.location.href = url
}

function Login() {
    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            <div className='tokenSection'></div>
        </div>
    );
}
  
export default Login;