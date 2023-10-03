import http from 'k6/http'
import { check } from 'k6'

export const options = {
    thresholds: {
		http_req_duration: ['avg<300', 'p(90)<250'],
		http_req_failed: ['rate<0.5'],
		iterations: ['count>400']
	},
    stages: [
		{ duration: '10s', target: 10 },
		{ duration: '5s', target: 10 },
		{ duration: '2s', target: 15 },
		{ duration: '5s', target: 0 },
	]
}

export default function () {
	const res = http.get('https://dummyjson.com/products?limit=10&skip=10&select=title,price')
    console.log(res.body)

    check(res, {
		'responsenya harus 200': (r) => r.status === 200,
		'di dalamnya harus ada todo': (r) => 'products' in r.json()
	})
}