const getCode = function () {
    let code = null
    const queryString = window.location.search
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString)
        code = urlParams.get('code')
    }
    console.log(code)
    return code;
}

export default getCode