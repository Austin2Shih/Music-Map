import React, { useState } from 'react';
import { useEffect } from 'react';
import { client_info } from './config';

import Login from './Login';
import Home from './Home';
import './App.css';

const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";
const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";
const DEVICES = "https://api.spotify.com/v1/me/player/devices";
const PLAY = "https://api.spotify.com/v1/me/player/play";
const PAUSE = "https://api.spotify.com/v1/me/player/pause";
const NEXT = "https://api.spotify.com/v1/me/player/next";
const PREVIOUS = "https://api.spotify.com/v1/me/player/previous";
const PLAYER = "https://api.spotify.com/v1/me/player";
const TRACKS = "https://api.spotify.com/v1/playlists/{{PlaylistId}}/tracks";
const CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const SHUFFLE = "https://api.spotify.com/v1/me/player/shuffle";

const client_id = client_info[0]
const client_secret = client_info[1]
const redirect_uri = "http://localhost:3000"

function DisplaySection({access_token}) {
    console.log(access_token)
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
        request.open("POST", "https://accounts.spotify.com/api/token", true)
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        // request.setRequestHeader('Authorization', 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')))
        // console.log(new Buffer(client_id + ':' + client_secret).toString('base64'))
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
            onPageLoad()
        } else {
            console.log(this.responseText)
            alert(this.responseText)
        }
    }

    function callApi(method, url, body, callback) {
        let xhr = new XMLHttpRequest()
        xhr.open(method, url, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token)
        xhr.send(body)
        xhr.onload = callback
    }

    function currentlyPlaying(){
        callApi( "GET", PLAYER + "?market=US", null, handleCurrentlyPlayingResponse);
    }

    function handleCurrentlyPlayingResponse(){
        if ( this.status == 200 ){
            var data = JSON.parse(this.responseText);
            console.log(data);
            if ( data.item != null ){
                console.log(data.item)
            }
        } else if ( this.status == 204 ){
            console.log("No song currently playing");
            alert("No song currently playing");
        } else if ( this.status == 401 ){
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
