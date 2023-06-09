import mongoose from 'mongoose';
import { config } from './config';
import logger from './logger/index';

const childLogger = logger.child({ filename: __filename });
export default async () => {
  const connect = async () => {
    try {
      mongoose.set('strictQuery', false);
      mongoose.connection.on('disconnected', connect);
      await mongoose.connect(config.databaseUrl);
      childLogger.info('Successfully connected to database');
    } catch (error) {
      childLogger.error('Error connecting to database', { error });
      process.exit(1);
    }
  };
  const conn = await connect();
  return conn;
};
