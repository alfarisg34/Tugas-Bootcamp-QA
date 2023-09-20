const schema1 = {
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
                required: ['id', 'todo', 'userId', 'completed']
            }
        }
    }
}

module.exports = schema1