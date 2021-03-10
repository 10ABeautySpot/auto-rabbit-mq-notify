const fetch = require("node-fetch");

const headers = {'Content-Type': 'application/json'}
const get = async (url, customerHeaders = null) => {
    return await fetch(url, {
        headers: customerHeaders || headers,
        method: 'GET'
    }).then(response => {
        return response.json()
    })
}


const post = async (url, body, customerHeaders = null) => {
    return await fetch(url, {
        headers: customerHeaders || headers,
        method: 'POST',
        body
    }).then(response => response.json())
}


module.exports = {get, post}
