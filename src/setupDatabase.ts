import mongoose from 'mongoose';
import config from 'config';
import { IDbConfig } from '@interface/config.interface';
import parentLogger from './logger';

const dbConfig = config.get('db') as IDbConfig;
const logger = parentLogger.child({ filename: __filename });
export default async () => {
  const connect = async () => {
    try {
      mongoose.set('strictQuery', false);
      mongoose.connection.on('disconnected', connect);
      await mongoose.connect(dbConfig.databaseUrl);
      logger.info('Successfully connected to database');
    } catch (error) {
      logger.error('Error connecting to database', { error });
      process.exit(1);
    }
  };
  const conn = await connect();
  return conn;
};
