import mongoose from 'mongoose';
import { config } from './config';
import logger from './logger';

export default async () => {
  const connect = async () => {
    try {
      mongoose.set('strictQuery', false);
      mongoose.connection.on('disconnected', connect);
      await mongoose.connect(config.DATABASE_URL);
      logger.info('Successfully connected to database');
    } catch (error) {
      logger.error('Error connecting to database', error);
      process.exit(1);
    }
  };
  const conn = await connect();
  return conn;
};
