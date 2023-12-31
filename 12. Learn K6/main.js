import http from 'k6/http'
import { check, group } from 'k6'
import { Rate, Trend } from 'k6/metrics'
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

const completedRate = new Rate('todo_completed_rate')
const smartphonesRate = new Rate('smartphones_rate')
const productsAllDuration = new Trend('products_all_duration')
const productsDetailDuration = new Trend('products_detail_duration')
const todosAllDuration = new Trend('todos_all_duration')
const todosDetailDuration = new Trend('todos_detail_duration')
const gadgetinDuration = new Trend('gadgetin_duration')
const miawaugDuration = new Trend('miawaug_duration')

export const options = {
	thresholds: {
		http_req_duration: ['avg<3000', 'p(90)<2500'],
		http_req_failed: ['rate<0.1'],
		iterations: ['count>40'],
		gadgetin_duration: ['avg<3000'],
		miawaug_duration: ['avg<3000']
	},
	stages: [
		{ duration: '2s', target: 5 },
		{ duration: '2s', target: 10 },
		{ duration: '2s', target: 10 },
		{ duration: '2s', target: 0 },
	],
	// duration: '10s',
	// iterations: 1,
	// vus: 1,
}

export default function () {
	describe('Performance Testing Website Youtube', function () {
		group('Home Page', function () {
			const res = http.get('https://www.youtube.com/')
			check(res, {
				'Status = 200': (r) => r.status === 200,
				'Status Text = "200 OK"': (r) => r.status_text === "200 OK",
				'Request URL = "https://www.youtube.com/"': (r) => r.request.url === "https://www.youtube.com/",
			})
			expect(res.status, 'Status').to.equal(200)
			expect(res.status_text, 'Status Text').to.equal("200 OK")
			expect(res.url, 'URL').to.equal("https://www.youtube.com/")
		})
		group('Youtuber Tech GadgetIn', function () {
			const res = http.get('https://www.youtube.com/@GadgetIn', {
				tags: {
					genre: "Tech"
				}
			})
			gadgetinDuration.add(res.timings.duration)
			check(res, {
				'Status = 200': (r) => r.status === 200,
				'Status Text = "200 OK"': (r) => r.status_text === "200 OK",
				'Request URL = "https://www.youtube.com/@GadgetIn"': (r) => r.request.url === "https://www.youtube.com/@GadgetIn",
			}, {
				genre: "Tech"
			})
			expect(res.status, 'Status').to.equal(200)
			expect(res.status_text, 'Status Text').to.equal("200 OK")
			expect(res.url, 'URL').to.equal("https://www.youtube.com/@GadgetIn")
			// expect(res.genre, 'Genre').to.equal("Tech")
		})
		group('Youtuber Gaming Miawaug', function () {
			const res = http.get('https://www.youtube.com/@Miawaug', {
				tags: {
					genre: "Gaming"
				}
			})
			miawaugDuration.add(res.timings.duration)
			check(res, {
				'Status = 200': (r) => r.status === 200,
				'Status Text = "200 OK"': (r) => r.status_text === "200 OK",
				'Request URL = "https://www.youtube.com/@Miawaug"': (r) => r.request.url === "https://www.youtube.com/@Miawaug",
			}, {
				genre: "Gaming"
			})
			expect(res.status, 'Status').to.equal(200)
			expect(res.status_text, 'Status Text').to.equal("200 OK")
			expect(res.url, 'URL').to.equal("https://www.youtube.com/@Miawaug")
			// expect(res.genre, 'Genre').to.equal("Gaming")
		})
	})
	describe('Performance Testing Website dummyjson', function () {
		group('Test Rate dummyjson products', function () {
			for (let i = 1; i < 10; i++) {
				const res = http.get('https://dummyjson.com/products/' + i)
				smartphonesRate.add(res.json().category === "smartphones")
			}
		})
		group('Test Trend dummyjson todos', function () {
			const resProductsAll = http.get('https://dummyjson.com/products/')
			const resProductsDetail = http.get('https://dummyjson.com/products/1')

			productsAllDuration.add(resProductsAll.timings.duration)
			productsDetailDuration.add(resProductsDetail.timings.duration)
		})
		group('Test Rate dummyjson todos', function () {
			for (let i = 1; i < 10; i++) {
				const res = http.get('https://dummyjson.com/todos/' + i)
				completedRate.add(res.json().completed === true)
			}
		})
		group('Test Trend dummyjson todos', function () {
			const resAll = http.get('https://dummyjson.com/todos')
			const resDetail = http.get('https://dummyjson.com/todos/1')

			todosAllDuration.add(resAll.timings.duration)
			todosDetailDuration.add(resDetail.timings.duration)
		})
	})
}