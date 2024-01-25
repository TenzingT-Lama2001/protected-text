import mongoose from 'mongoose';
import config from 'config';
import ptLogger from '@logger/logger';
import { IDbConfig } from '@interface/config/config.interface';

const dbConfig = config.get('db') as IDbConfig;
const logger = ptLogger.child({
  file: __filename,
});

export default async () => {
  const connectDb = async () => {
    try {
      mongoose.set('strictQuery', false);
      mongoose.connection.on('disconnected', connectDb);
      await mongoose.connect(dbConfig.databaseUrl);
      logger.info('Successfully connected to database');
    } catch (error) {
      logger.error('Error connecting to database', { error });
      process.exit(1);
    }
  };
  const conn = await connectDb();
  return conn;
};
