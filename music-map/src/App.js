import React, { useState } from 'react';
import { useEffect } from 'react';
import { client_info } from './config';
import callApi from './token/callApi';

import Login from './Login';
import Home from './Home';
import './App.css';


const TOKEN = "https://accounts.spotify.com/api/token";
const PLAYER = "https://api.spotify.com/v1/me/player";

const client_id = client_info[0]
const client_secret = client_info[1]
const redirect_uri = "http://localhost:3000"

function DisplaySection({access_token}) {
    if (access_token == null) {
        return (
            <div><Login /></div>
        )
    } else {
        return (
            <div><Home /></div>
        )
    }
}

function App() {
    const [access_token, updateAccessToken] = useState()
    const [refresh_token, updateRefreshToken] = useState()

    useEffect(() => {
        onPageLoad();
    }, []);

    function onPageLoad() {
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
    
    function refreshAccessToken() {
        let body = "grant_type=refresh_token"
        body += "&refresh_token=" + refresh_token
        body += "&client_id=" + client_id
        callAuthorizationApi(body)
    }
    
    function callAuthorizationApi(body) {
        let request = new XMLHttpRequest()
        request.open("POST", TOKEN, true)
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.send(body)
        request.onload = handleAuthorizationResponse
    }
    
    function handleAuthorizationResponse() {
        if (this.status === 200) {
            var data = JSON.parse(this.responseText)
            if (data.access_token !== undefined) {
                updateAccessToken(data.access_token)
            }
            if (data.refresh_token !== undefined) {
                updateRefreshToken(data.refresh_token)
            }
            onPageLoad()
        } else {
            console.log(this.responseText)
            alert(this.responseText)
        }
    }

    function currentlyPlaying() {
        callApi(access_token, "GET", PLAYER + "?market=US", null, handleCurrentlyPlayingResponse);
    }

    function handleCurrentlyPlayingResponse() {
        if (this.status === 200) {
            var data = JSON.parse(this.responseText);
            if (data.item != null) {
                console.log(data.item)
            }
        } else if (this.status === 204) {
            console.log("No song currently playing");
            alert("No song currently playing");
        } else if (this.status === 401) {
            refreshAccessToken()
        } else {
            console.log(this.responseText);
            alert(this.responseText);
        }
    }

    return (
        <div className="App">
            <DisplaySection access_token={access_token} />
            <button onClick={currentlyPlaying}>click</button>
        </div>
    );
}

export default App;
