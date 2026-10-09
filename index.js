import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

async function startServer() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    console.log('Connected to MongoDB');

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });

    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();