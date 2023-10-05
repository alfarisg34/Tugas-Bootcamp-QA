import http from "k6/http"
import { group } from "k6"

import getCheck from "../utils/getCheck.js"
import generateHeaders from '../utils/generateHeaders.js'

export default function todos(token) {
    group('API Testing DummyJason Todos', function () {
        group('Get All Todos', function () {
            const res = http.get('https://dummyjson.com/auth/todos', generateHeaders(token))
            getCheck(res)
        })
        group('Get a Single Todos', function () {
            const res = http.get('https://dummyjson.com/auth/todos/1', generateHeaders(token))
            getCheck(res)
        })
        group('Get a Random Todos', function () {
            const res = http.get('https://dummyjson.com/auth/todos/random', generateHeaders(token))
            getCheck(res)
        })
        group('Limit and skip todos', function () {
            const res = http.get('https://dummyjson.com/auth/todos?limit=3&skip=10', generateHeaders(token))
            getCheck(res)
        })
        group('Get all todos by user id', function () {
            const res = http.get('https://dummyjson.com/auth/todos/user/5', generateHeaders(token))
            getCheck(res)
        })
        group('Add a new todo', function () {
            const payload = JSON.stringify({
                todo: 'Use DummyJSON in the project',
                completed: false,
                userId: 5,
            })
            const res = http.post('https://dummyjson.com/auth/todos/add', payload, generateHeaders(token))
            getCheck(res)
        })
        group('Update a todo', function () {
            const payload = JSON.stringify({
                completed: false,
            })
            const res = http.put('https://dummyjson.com/auth/todos/1', payload, generateHeaders(token))
            getCheck(res)
        })
        group('Delete a todo', function () {
            const payload = JSON.stringify({})
            const res = http.del('https://dummyjson.com/auth/todos/1', payload, generateHeaders(token))
            getCheck(res)
        })
    })
}