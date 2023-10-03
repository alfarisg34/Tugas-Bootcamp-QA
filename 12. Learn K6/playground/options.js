import http from 'k6/http'

export const options = {
    duration: '5s',
    iterations: 50,
	vus: 1,
}

export default function () {
	const res = http.get('https://dummyjson.com/todos/1')
}