import { check } from "k6"

export default function getCheck(res) {
    check(res, {
        'Status = 200': (r) => r.status === 200,
    })
}