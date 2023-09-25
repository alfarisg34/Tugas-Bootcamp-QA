const schema2 = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        todo: { type: 'string' },
        userId: { type: 'number' },
        completed: { type: 'boolean' },
    },
    required: ['id', 'todo', 'userId', 'completed']
}

module.exports = schema2