import React, {useState, useEffect} from 'react'
import { client_info } from '../config'
import { AuthContext } from '../App'
import { useMutation } from '@apollo/client';
import { updateUser } from '../graphql/mutations'
import { SlSocialSpotify } from 'react-icons/sl'

const client_id = client_info[0]
const client_secret = client_info[1]
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

function LoginButton() {
    const [access_token, updateAccessToken] = useState()
    const [refresh_token, updateRefreshToken] = useState()
    const { auth, setAuth } = React.useContext(AuthContext)

    const [useUpdateUser, { data, loading, error }] = useMutation(updateUser);

    useEffect(() => {
        onPageLoad();
    }, []);

    function onPageLoad() {
        console.log("page load")
        //if authorization code in url
        if (window.location.search.length > 0) {
            handleRedirect();
        }
    }
    
    function handleRedirect() {
        let code = getCode()
        fetchAccessToken(code)
        window.history.pushState("", "", redirect_uri) // remove param from url
    }
    
    function getCode() {
        let code = null
        const queryString = window.location.search
        if (queryString.length > 0) {
            const urlParams = new URLSearchParams(queryString)
            code = urlParams.get('code')
        }
        console.log(code)
        return code;
    }
    
    function fetchAccessToken(code) {
        let body = "grant_type=authorization_code"
        body += "&code=" + code
        body += "&redirect_uri=" + encodeURI(redirect_uri)
        body += "&client_id=" + client_id
        body += "&client_secret=" + client_secret
        callAuthorizationApi(body)
    }
    
    function callAuthorizationApi(body) {
        let request = new XMLHttpRequest()
        request.open("POST", "https://accounts.spotify.com/api/token", true)
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.send(body)
        request.onload = handleAuthorizationResponse
    }
    
    function handleAuthorizationResponse() {
        if (this.status === 200) {
            var data = JSON.parse(this.responseText)
            console.log(data)
            console.log(data.access_token)
            if (data.access_token !== undefined) {
                updateAccessToken(data.access_token)
            }
            if (data.refresh_token !== undefined) {
                updateRefreshToken(data.refresh_token)
            }
            updateCurrentUser(data.access_token).then(() => {
                updateDatabase(data.access_token, data.refresh_token);
            });
            onPageLoad()
        } else {
            console.log(this.responseText)
            alert(this.responseText)
        }
    }

    async function updateCurrentUser(access_token) {
        return await fetch("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: "Bearer " + access_token,
            }
        }).then(async (res) => {
            const object = await res.json();
            localStorage.setItem('user', JSON.stringify(object));
            setAuth(true);
        })
    }

    function updateDatabase(access_token, refresh_token) {
        console.log(JSON.parse(localStorage['user']).id)
        useUpdateUser({ 
            variables: {
                id: JSON.parse(localStorage['user']).id,
                access_token,
                refresh_token
            }
        })
    
        if (loading) return 'Submitting...';
        if (error) return `Submission error! ${error.message}`;
        console.log(data);
    }

    return (<>
        <div>
            <button className="login-button" onClick={handleLogin}>
                <div className='button-aligner'>
                    <SlSocialSpotify style={{fontSize: '32px'}}></SlSocialSpotify>
                    <p>Login with spotify</p>
                </div>

            </button>
        </div>
        <style>{`
            .login-button {
                background-color: var(--loginButtonBackground);
                border: none;
                width: 300px;
                height: 60px;
                border-radius: var(--borderRadius);
                color: var(--text-secondary);
            }
            .login-button:hover {
                cursor: pointer;
            }
            .button-aligner {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                gap: 16px;
            }
            .button-aligner>p {
                font-size: var(--fontBigButton);
            }
        
        `}</style>
    </>

    );
}
  
export default LoginButton;