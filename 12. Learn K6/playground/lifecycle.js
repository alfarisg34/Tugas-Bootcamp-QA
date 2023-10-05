//1. init code
import http from 'k6/http'

function generateHeader (token) {
    return {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
}

export function setup(){
    //2. setup code
    const url = 'https://dummyjson.com/auth/login'
    const payload = JSON.stringify({
        username: 'kminchelle',
		password: '0lelplR',
    })
    const headers = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const resLogin = http.post(url, payload, headers)
    return resLogin.json().token
}

export default function(token){
    //3. VU code
    http.get('https://dummyjson.com/auth/todos/1', generateHeader(token))
}

export function teardown(token){
    //4. teardown code
}
