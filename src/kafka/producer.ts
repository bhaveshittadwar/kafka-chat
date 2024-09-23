import {Kafka, Producer} from 'kafkajs'

const kafka = new Kafka({
    clientId: 'kafka-chat',
    brokers: ['localhost:9092']
})

let producer: Producer

export const initProducer = async () => {
    producer = kafka.producer()
    await producer.connect()
}

export const sendMessage = async (message: string, room: string) => {
    await producer.send({
        topic: 'chat-messages',
        messages: [{value: JSON.stringify({message, room})}]
    })
}
