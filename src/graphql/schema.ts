import {gql} from 'apollo-server-express'

export const typeDefs = gql`
    type Message {
        text: String!
        room: String!
    }

    type Query {
        messages(room: String!): [Message!]!
    }

    type Mutation {
        sendMessage(text: String!, room: String!): Message!
    }

    type Subscription {
        messageAdded(room: String!): Message!
    }
`

import {PubSub} from 'graphql-subscriptions'
import { sendMessage } from '../kafka/producer'

const pubsub = new PubSub()

export const resolvers = {
    Query: {
        messages: () => [],
    },
    Mutation: {
        sendMessage: async (_: any, {text, room}: {text: string, room: string}) => {
            await sendMessage(text, room)
            const message = {text, room}
            pubsub.publish('MESSAGE_ADDED', {messageAdded: message})
            return message
        }
    },
    Subscription: {
        messageAdded: {
            subscribe: (_: any, {room}: {room: string}) => pubsub.asyncIterator(['MESSAGE_ADDED'])
        }
    }
}
