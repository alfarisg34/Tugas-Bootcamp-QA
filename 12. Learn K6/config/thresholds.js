const thresholds = {
	http_req_duration: ['avg<400', 'p(90)<500'],
	http_req_failed: ['rate<0.5'],
	iterations: ['count>10']
}

export default thresholds