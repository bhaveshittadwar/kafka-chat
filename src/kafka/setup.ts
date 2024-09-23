// Create Kafka Topic
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'kafka-chat',
    brokers: ['localhost:9092']
})

export const createChatTopic = async () => {
    const admin = kafka.admin()
    await admin.connect()
    await admin.createTopics({
        topics: [{topic: 'chat-messages'}]
    })
    await admin.disconnect()
}
