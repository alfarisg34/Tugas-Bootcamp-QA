// const http = require('k6/http')
import http from 'k6/http' 

// module.exports = function () {}
export default function () {
	const res = http.get('https://dummyjson.com/todos/1')
	console.log(res)
}