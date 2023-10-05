export default function getPayload() {
    return {
        body: JSON.stringify({
            todo: 'Use DummyJSON in the project',
            completed: false,
            userId: 5,
        })
    }
}