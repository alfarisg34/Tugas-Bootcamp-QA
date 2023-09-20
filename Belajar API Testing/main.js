var request = require('supertest')('https://dummyjson.com')
const chai = require('chai')
const chaiJsonSchemaajv = require('chai-json-schema-ajv')

chai.use(chaiJsonSchemaajv)
const expect = chai.expect

it('Test JSON Get all todos', async function () {
	const todosSchema = {
		type: 'object',
		properties: {
			todos: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						id: { type: 'number' },
						todo: { type: 'string' },
						userId: { type: 'number' },
						completed: { type: 'boolean' },
					},
					required: ['id']
				}
			}
		}
	}

	const res = await request.get('/todos')
	expect(res.body).have.jsonSchema(todosSchema)
})

it('Test JSON Get a single todo', async function () {
	const todoSchema = {
		type: 'object',
		properties: {
			id: { type: 'number' },
			todo: { type: 'string' },
			userId: { type: 'number' },
			completed: { type: 'boolean' },
		},
		required: ['id', 'todo', 'userId']
	}

	const res = await request.get('/todos/1')
	expect(res.body).have.jsonSchema(todoSchema)
})

it('Test JSON Get a random todo', async function () {
	const todoRandomSchema = {
		type: 'object',
		properties: {
			id: { type: 'number' },
			todo: { type: 'string' },
			userId: { type: 'number' },
			completed: { type: 'boolean' },
		},
		required: ['id', 'todo', 'userId']
	}

	const res = await request.get('/todos/random')
	expect(res.body).have.jsonSchema(todoRandomSchema)
})

it('Test JSON Limit and skip todos', async function () {
	const todosLimitSkipSchema = {
		type: 'object',
		properties: {
			todos: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						id: { type: 'number' },
						todo: { type: 'string' },
						userId: { type: 'number' },
						completed: { type: 'boolean' },
					},
					required: ['id']
				}
			}
		}
	}

	const res = await request.get('/todos?limit=3&skip=10')
	expect(res.body).have.jsonSchema(todosLimitSkipSchema)
})

it('Test JSON Get all todos by user id', async function () {
	const todosByUserIdSchema = {
		type: 'object',
		properties: {
			todos: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						id: { type: 'number' },
						todo: { type: 'string' },
						userId: { type: 'number' },
						completed: { type: 'boolean' },
					},
					required: ['id','todo','userId','completed']
				}
			}
		}
	}

	const res = await request.get('/todos/user/5')
	expect(res.body).have.jsonSchema(todosByUserIdSchema)
})

it('Test JSON Add a new todo', async function () {
	const addTodoSchema = {
		type: 'object',
		properties: {
			id: { type: 'number' },
			todo: { type: 'string' },
			userId: { type: 'number' },
			completed: { type: 'boolean' },

		},
		required: ['id','todo', 'userId','completed']
	}

    const payload = {
        todo:"Hai", 
        completed:false,
        userId:5
    }
    const res = await request
    .post('/todos/add')
    .send(payload)

	expect(res.body).have.jsonSchema(addTodoSchema)
})

it('Test JSON Update a todo', async function () {
	const updateTodoSchema = {
		type: 'object',
		properties: {
			id: { type: 'number' },
			todo: { type: 'string' },
			userId: { type: 'number' },
			completed: { type: 'boolean' },

		},
		required: ['id','todo', 'userId','completed']
	}

    const payload = {
        completed:false,
    }
    const res = await request
    .put('/todos/1')
    .send(payload)

	expect(res.body).have.jsonSchema(updateTodoSchema)
})

it('Test JSON Delete a todo', async function () {
	const deleteTodoSchema = {
		type: 'object',
		properties: {
			id: { type: 'number' },
			todo: { type: 'string' },
			userId: { type: 'number' },
			completed: { type: 'boolean' },

		},
		required: ['id','todo', 'userId','completed']
	}
    const res = await request
    .delete('/todos/1')

	expect(res.body).have.jsonSchema(deleteTodoSchema)
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

