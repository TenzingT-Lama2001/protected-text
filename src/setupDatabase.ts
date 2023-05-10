import mongoose from 'mongoose';
import logger from './utils/logger';

export default () => {
  const connect = () => {
    mongoose.set('strictQuery', false);
    mongoose
      .connect('mongodb://localhost:27017/protected-text')
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
