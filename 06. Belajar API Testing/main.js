var request = require('supertest')('https://dummyjson.com')
const chai = require('chai')
const chaiJsonSchemaajv = require('chai-json-schema-ajv')
const schema1 = require('./schema1')
const schema2 = require('./schema2')

chai.use(chaiJsonSchemaajv)
const expect = chai.expect

it('Test JSON Get all todos', async function () {
	const res = await request.get('/todos')
	expect(res.body).have.jsonSchema(schema1)
})

it('Test JSON Get a single todo', async function () {
	const res = await request.get('/todos/1')
	expect(res.body).have.jsonSchema(schema2)
})

it('Test JSON Get a random todo', async function () {
	const res = await request.get('/todos/random')
	expect(res.body).have.jsonSchema(schema2)
})

it('Test JSON Limit and skip todos', async function () {
	const res = await request.get('/todos?limit=3&skip=10')
	expect(res.body).have.jsonSchema(schema1)
})

it('Test JSON Get all todos by user id', async function () {
	const res = await request.get('/todos/user/5')
	expect(res.body).have.jsonSchema(schema1)
})

it('Test JSON Add a new todo', async function () {
    const payload = {
        todo:"Hai", 
        completed:false,
        userId:5
    }
    const res = await request
    .post('/todos/add')
    .send(payload)

	expect(res.body).have.jsonSchema(schema2)
})

it('Test JSON Update a todo', async function () {
    const payload = {
        completed:false,
    }
    const res = await request
    .put('/todos/1')
    .send(payload)

	expect(res.body).have.jsonSchema(schema2)
})

it('Test JSON Delete a todo', async function () {
    const res = await request
    .delete('/todos/1')

	expect(res.body).have.jsonSchema(schema2)
})
    
// async function get(){
//     const result = await request
//     .get('/todos')
//     console.log(result._body)
// }

// async function post(){
//     const payload = {
//         todo:"Hai", 
//         completed:false,
//         userId:5
//     }
//     const result = await request
//     .post('/todos/add')
//     .send(payload)
//     .expect(200)
//     expect(result.body.userId).to.equal(5)
// }

// get()
// post()

