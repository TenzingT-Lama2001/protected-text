import mongoose from 'mongoose';
import { config } from './config';

export default async () => {
  const connect = async () => {
    try {
      mongoose.set('strictQuery', false);
      mongoose.connection.on('disconnected', connect);
      await mongoose.connect(config.DATABASE_URL);
    } catch (error) {
      process.exit(1);
    }
  };
  const conn = await connect();
  return conn;
};
