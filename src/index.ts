import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { createChatTopic } from './kafka/setup';
import { initProducer } from './kafka/producer';
import { consumeMessages } from './kafka/consumer';

// TODO