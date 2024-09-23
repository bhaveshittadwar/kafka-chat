import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId: 'kafka-chat',
    brokers: ['localhost:9092']
})

export const consumeMessages = async (callback: (message: string, room: string) => void) => {
    const consumer = kafka.consumer({groupId: 'chat-group'})
    await consumer.connect()
    await consumer.subscribe({
        topic: 'kafka-chat',
        fromBeginning: true
    })

    await consumer.run({
        eachMessage: async ({message}) => {
            const {message: text, room} = JSON.parse(message.value!.toString())
            callback(text, room)
        }
    })
}