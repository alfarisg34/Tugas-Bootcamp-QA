import http from "k6/http"
import { group } from "k6"

import getCheck from "../utils/getCheck.js"
import generateHeaders from '../utils/generateHeaders.js'

export default function products(token) {
    group('API Testing DummyJason products', function () {
        group('Get All products', function () {
            const res = http.get('https://dummyjson.com/auth/products', generateHeaders(token))
            getCheck(res)
        })
        group('Get a Single products', function () {
            const res = http.get('https://dummyjson.com/auth/products/1', generateHeaders(token))
            getCheck(res)
        })
        group('Search products', function () {
            const res = http.get('https://dummyjson.com/auth/products/search?q=phone', generateHeaders(token))
            getCheck(res)
        })
        group('Limit and skip products', function () {
            const res = http.get('https://dummyjson.com/auth/products?limit=10&skip=10&select=title,price', generateHeaders(token))
            getCheck(res)
        })
        group('Get all products categories', function () {
            const res = http.get('https://dummyjson.com/auth/products/categories', generateHeaders(token))
            getCheck(res)
        })
        group('Get products of a category', function () {
            const res = http.get('https://dummyjson.com/auth/products/category/smartphones', generateHeaders(token))
            getCheck(res)
        })
        group('Add a new product', function () {
            const payload = JSON.stringify({
                title: 'BMW Pencil',
            })
            const res = http.post('https://dummyjson.com/auth/products/add', payload, generateHeaders(token))
            getCheck(res)
        })
        group('Update a product', function () {
            const payload = JSON.stringify({
                title: 'iPhone Galaxy +1'
            })
            const res = http.put('https://dummyjson.com/auth/products/1', payload, generateHeaders(token))
            getCheck(res)
        })
        group('Delete a product', function () {
            const payload = JSON.stringify({})
            const res = http.del('https://dummyjson.com/auth/products/1', payload, generateHeaders(token))
            getCheck(res)
        })
    })
}