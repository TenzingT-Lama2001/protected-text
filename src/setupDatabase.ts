import mongoose from 'mongoose';
import { config } from './config';
import logger from './logger';

export default () => {
  const connect = () => {
    mongoose.set('strictQuery', false);
    logger.info(`${config.DATABASE_URL}`);
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        logger.info('Successfully connected to database');
      })
      .catch((error) => {
        logger.error('Error connecting to database', error);
        return process.exit(1);
      });
  };
  connect();
  mongoose.connection.on('disconnected', connect);
};
