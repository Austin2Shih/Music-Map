const callApi = function (access_token, method, url, body, callback) {
    let xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token)
    xhr.send(body)
    xhr.onload = callback
}

export default callApi